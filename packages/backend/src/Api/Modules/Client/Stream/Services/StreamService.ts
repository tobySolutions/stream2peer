import { autoInjectable } from 'tsyringe';
import { DbContext } from 'Lib/Infra/Internal/DBContext';
import { Stream } from 'Api/Modules/Client/Stream/Entities/Stream';
import { Project } from 'Api/Modules/Client/Project/Entities/Project';
import { Repository, QueryRunner } from 'typeorm';
import { NULL_OBJECT } from 'Api/Modules/Common/Helpers/Messages/SystemMessages';
import {
  createStreamDto,
  DestinationPlatform,
} from '../TypeChecking/createStreamDto';
import {
  defaultPlaybackPolicy,
  defaultPublicPlaybackPolicy,
  PlaybackPolicy,
} from '../TypeChecking/StreamData';
import { defaultProfiles } from '../Config/LivePeerProfiles';
import { StreamStatus } from '../TypeChecking/StreamStatus';
import LivepeerService from './LivepeerService';
import {
  MultiStreamToken,
  Platform,
  StreamPlatform,
} from '../TypeChecking/MultiStreamUserDestination';
import { transformPlatform } from '../Utils/StreamHelper';
import TwitchService from './MultiMediaServices/TwitchService';
import YoutubeService from './MultiMediaServices/YoutubeService';

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
    const { projectId, title, description, profiles, scheduleDate, platforms, visibility } =
      streamData;

    const project = await this.projectRepository.findOne({
      where: { identifier: projectId },
      relations: ['owner'],
    });
    if (!project) return NULL_OBJECT;

    const stream = new Stream();
    const playBackPolicy: PlaybackPolicy = visibility ? defaultPublicPlaybackPolicy 
    : { ...defaultPlaybackPolicy, webhookContext: { projectId } };
    const streamProfiles = profiles || defaultProfiles;

    Object.assign(stream, {
      title,
      description,
      project,
      profiles: JSON.stringify(streamProfiles),
      playBackPolicy: JSON.stringify(playBackPolicy),
      schedule: scheduleDate,
      status: scheduleDate ? StreamStatus.SCHEDULED : StreamStatus.IDLE,
    });

    try {
      const streamTokens = project.owner?.stream_tokens;
      let multistreamTargets;
      if (streamTokens) {
        multistreamTargets = await this.generateMultistreamTargets(
          platforms,
          streamTokens,
          title,
          scheduleDate?.toString().slice(0,16),
        );
      }
      await LivepeerService.createStream(
        stream,
        streamProfiles,
        playBackPolicy,
        multistreamTargets?.map((stream)=>stream.target),
      );
      stream.destinations = multistreamTargets?.map((destination) => destination.destinations) || [];
      await queryRunner.manager.save(stream);
      return stream;
    } catch (error) {
      console.error('Error creating stream:', error);
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
      where: { livepeerStreamId: streamId },
      relations: ['project', 'project.owner'],
    });
    if (!stream) return NULL_OBJECT;
    if(stream?.destinations){
      const streamTokens = stream.project.owner.stream_tokens;
      stream.destinations.forEach(async (platform)=>{
        const streamingPlatform = streamTokens.filter((token) => token.type == platform.platform)[0];
          return this.activatePlatform(platform, streamingPlatform);
      });
    }

    await LivepeerService.activateStream(stream.livepeerStreamId);
    stream.status = StreamStatus.LIVE;
    await queryRunner.manager.save(stream);
    return stream;
  }

  /**
   * Activates the stream for a specific platform.
   */
  private async activatePlatform(destination: StreamPlatform, streamingPlatform:MultiStreamToken): Promise<void> {
    const { platform, broadcastId } = destination;
    try{
      switch (platform) {
        case Platform.Youtube:
          await YoutubeService.activateStream(broadcastId,await YoutubeService.refreshAccessToken(streamingPlatform.token.refreshToken));
        break;
        //other platform cases to be added here
        default:
          console.warn(`Activation for platform ${platform} is not implemented.`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }} catch(activatePlatformError:any){
        console.error( 'activatePlatformError:', activatePlatformError);
    }
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
        await this.activateStream(streamId,queryRunner);
        break;
      case StreamStatus.SUSPENDED:
        await this.suspendStream(streamId,queryRunner);
        break;
      case StreamStatus.ENDED:
        await this.terminateStream(streamId,queryRunner);
        break;
      default:
        throw new Error('Invalid Event Type');
    }
    return stream;
  }

  private async generateMultistreamTargets(
    platforms: Set<Platform> | undefined,
    streamTokens: MultiStreamToken[],
    title: string,
    scheduleDate: string = new Date().toISOString().slice(0, 16),
  ): Promise<DestinationPlatform[]> {
    if (!platforms) return [];
    const multistreamTargets: DestinationPlatform[] = [];

    for (const platform of platforms) {
      try {
        const platformToken = streamTokens.find(
          (tokenObj) => tokenObj.type === platform,
        );
        if (!platformToken || !platformToken.token.refreshToken) {
          console.warn(`No refresh token found for platform: ${platform}`);
          continue;
        }

        const refreshToken = platformToken.token.refreshToken;
        const platformData = await this.getPlatformStreamKey(platform, refreshToken, title, scheduleDate);
        if (!platformData?.token) {
          console.log(`No token found for platform: ${platform}`);
          continue;
        }
        const target = transformPlatform(platform, platformData?.token, title);
        multistreamTargets.push({target,destinations:{broadcastId: platformData.broadcastId, platform}});
      } catch (generateMultistreamTargetsError) {
        console.error(`Error generating multistream target for ${platform}:`, generateMultistreamTargetsError);
      }
    }
    return multistreamTargets;
  }

  private async getPlatformStreamKey(
    platform: Platform,
    refreshToken: string,
    title: string,
    scheduleDate: string,
  ): Promise<{token: string, broadcastId: string} | null> {
    switch (platform) {
      case Platform.Youtube:
        return YoutubeService.getStreamKey(refreshToken,title,scheduleDate);
      case Platform.Twitch:
        return await TwitchService.getStreamKey(refreshToken,title,scheduleDate);
      case Platform.Facebook:
        return null;
      case Platform.Linkedin:
        return null;
      default:
        console.warn(`Unsupported platform: ${platform}`);
        return null;
    }
  }
}

export default new StreamService();
