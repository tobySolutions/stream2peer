import { autoInjectable } from 'tsyringe';
import { DbContext } from 'Lib/Infra/Internal/DBContext';
import { Stream } from 'Api/Modules/Client/Stream/Entities/Stream';
import { Project } from 'Api/Modules/Client/Project/Entities/Project';
import { Repository, QueryRunner } from 'typeorm';
import { NULL_OBJECT } from 'Api/Modules/Common/Helpers/Messages/SystemMessages';
import { createStreamDto, MultistreamTarget } from '../TypeChecking/createStreamDto';
import {
  defaultPlaybackPolicy,
  PlaybackPolicy,
} from '../TypeChecking/StreamData';
import { defaultProfiles } from '../Config/LivePeerProfiles';
import { StreamStatus } from '../TypeChecking/StreamStatus';
import LivepeerService from './LivepeerService';
import { MultiStreamToken, Platform } from '../TypeChecking/MultiStreamUserDestination';
import { transformPlatform } from '../Utils/StreamHelper';
import TwitchService from './MultiMediaServices/TwitchService';

@autoInjectable()
class StreamService {
  private streamRepository: Repository<Stream>;
  private projectRepository: Repository<Project>;

  constructor(private dbContext?: DbContext) {
    this.streamRepository = dbContext?.getEntityRepository(
      Stream,
    ) as Repository<Stream>;
    this.projectRepository = dbContext?.getEntityRepository(
      Project,
    ) as Repository<Project>;
  }

  /**
   * Creates a new stream record.
   */
  public async createStream(
    streamData: createStreamDto,
    queryRunner: QueryRunner,
  ): Promise<Stream | null> {
    const { projectId, title, description, profiles, scheduleDate, platforms } =
      streamData;

    const project = await this.projectRepository.findOne({
      where: { identifier: projectId },
    });
    if (!project) return NULL_OBJECT;

    const stream = new Stream();
    const playBackPolicy: PlaybackPolicy = {
      ...defaultPlaybackPolicy,
      webhookContext: { projectId },
    };

    const streamProfiles = profiles || defaultProfiles;
    
    Object.assign(stream, {
      title,
      description,
      project,
      profiles: JSON.stringify(streamProfiles),
      playBackPolicy: JSON.stringify(playBackPolicy),
      schedule: scheduleDate,
      status: scheduleDate ? StreamStatus.SCHEDULED : StreamStatus.IDLE,
      destinations: platforms,
    });

    try {
      const streamTokens = project.owner.stream_tokens;
      const multistreamTargets = await this.generateMultistreamTargets(platforms, title, streamTokens);

      await LivepeerService.createStream(
        stream,
        streamProfiles,
        playBackPolicy,
        multistreamTargets
      );
      await queryRunner.manager.save(stream);
      return stream;
    } catch (error) {
      console.error('Error creating stream:', error);
      return null;
    }
  }

  /**
   * Terminates a stream by setting its status to "ENDED" and updating its `endedAt` timestamp.
   */
  public async terminateStream(
    streamId: string,
    queryRunner: QueryRunner,
  ): Promise<Stream | null> {
    const stream = await this.streamRepository.findOne({
      where: { identifier: streamId },
    });
    if (!stream) return NULL_OBJECT;

    try {
      await LivepeerService.terminateStream(streamId);
      stream.status = StreamStatus.ENDED;
      stream.endedAt = new Date();
      await queryRunner.manager.save(stream);
      return stream;
    } catch (error) {
      console.error('Error terminating stream:', error);
      return null;
    }
  }

  /**
   * Deletes a stream by its ID.
   */
  public async deleteStream(
    streamId: string,
    queryRunner: QueryRunner,
  ): Promise<Stream | null> {
    const stream = await this.streamRepository.findOne({
      where: { identifier: streamId },
    });
    if (!stream) return NULL_OBJECT;

    try {
      await LivepeerService.deleteStream(stream.livepeerStreamId);
      await queryRunner.manager.remove(stream);
      return stream;
    } catch (error) {
      console.error('Error deleting stream:', error);
      return null;
    }
  }

  /**
   * Checks if the user is a peer of the specified project.
   */
  public async viewStream(userId: string, projectId: string): Promise<boolean> {
    try {
      const project = await this.projectRepository.findOne({
        where: { identifier: projectId, peers_roles: { userId } },
      });

      return project ? true : false;
    } catch (error) {
      console.error('🚀 ~ LivePeerService.viewStream error ->', error);
      throw new Error('Failed to check stream access.');
    }
  }

  /**
   * Fetches a stream by its Identifier.
   */
  public async getStreamByIdentifier(streamId: string): Promise<Stream | null> {
    const stream = await this.streamRepository.findOne({
      where: {
        identifier: streamId,
      },
    });
    return stream || NULL_OBJECT;
  }

  /**
   * Lists all streams.
   */
  public async getAllStreams(projectId: string): Promise<Stream[]> {
    return await this.streamRepository.find({
      where: { project: { identifier: projectId } },
    });
  }

  /**
   * Updates a stream record.
   */
  public async updateStream(
    streamId: string,
    updateData: Partial<Stream>,
    queryRunner: QueryRunner,
  ): Promise<Stream | null> {
    const stream = await this.streamRepository.findOne({
      where: { identifier: streamId },
    });
    if (!stream) return NULL_OBJECT;

    Object.assign(stream, updateData);
    //LAST SEEN
    //STARTED AT
    //ENDED AT
    //VIEWERS
    //DESTINATIONS
    //ENCRYPTED STREAM DATA
    await queryRunner.manager.save(stream);
    return stream;
  }

  /**
   * Suspends a stream.
   */
  public async suspendStream(
    streamId: string,
    queryRunner: QueryRunner,
  ): Promise<Stream | null> {
    const stream = await this.streamRepository.findOne({
      where: { identifier: streamId },
    });
    if (!stream) return NULL_OBJECT;

    await LivepeerService.suspendStream(stream.livepeerStreamId);
    stream.status = StreamStatus.SUSPENDED;
    await queryRunner.manager.save(stream);
    return stream;
  }

  /**
   * Activates a stream.
   */
  public async activateStream(  
    streamId: string,
    queryRunner: QueryRunner,
  ): Promise<Stream | null> {
    const stream = await this.streamRepository.findOne({
      where: { identifier: streamId },
    });
    if (!stream) return NULL_OBJECT;

    await LivepeerService.activateStream(stream.livepeerStreamId);
    stream.status = StreamStatus.LIVE;
    await queryRunner.manager.save(stream);
    return stream;
  }

  /**
   * Updates a stream status(Webhook event).
   */
  public async updateStreamStatus(
    streamId: string,
    eventType: StreamStatus,
    queryRunner: QueryRunner,
  ): Promise<Stream | null> {
    const stream = await this.streamRepository.findOne({
      where: { livepeerStreamId: streamId },
    });
    if (!stream) return NULL_OBJECT;

    switch (eventType) {
      case StreamStatus.LIVE:
          await LivepeerService.activateStream(streamId);
        break;
      case StreamStatus.SUSPENDED:
          await LivepeerService.suspendStream(streamId);
        break;
      default:
          throw new Error("Invalid Event Type");
    }
    stream.status = eventType;
    await queryRunner.manager.save(stream);
    return stream;
  }

  private async generateMultistreamTargets(
    platforms: Set<Platform> | undefined,
    title: string,
    streamTokens: MultiStreamToken[],
  ): Promise<MultistreamTarget[]>{
    if (!platforms) return [];
  
    const multistreamTargets: MultistreamTarget[] = [];
  
    for (const platform of platforms) {
      try {
        const platformToken = streamTokens.find((tokenObj) => tokenObj.type === platform);
        if (!platformToken || !platformToken.token.refreshToken) {
          console.warn(`No refresh token found for platform: ${platform}`);
          continue;
        }
        
        const refreshToken = platformToken.token.refreshToken;
        const token = await this.getPlatformStreamKey(platform, refreshToken);
        if(!token){
          console.log(`No token found for platform: ${platform}`);
          continue;
        }
        const target = transformPlatform(platform, token, title);
        multistreamTargets.push(target);
      } catch (error) {
        console.error(`Error generating multistream target for ${platform}:`, error);
      }
    }
    return multistreamTargets;
  }

  private async getPlatformStreamKey(platform: Platform, refreshToken: string): Promise<string|null> {
    switch (platform) {
      case Platform.Youtube:
        return '';
      case Platform.Twitch:
        return await TwitchService.getStreamKey(refreshToken);
      case Platform.Facebook:
        return '';
      case Platform.Linkedin:
        return '';        
      default:
        console.warn(`Unsupported platform: ${platform}`);
        return '';
    }
  }
}

export default new StreamService();
