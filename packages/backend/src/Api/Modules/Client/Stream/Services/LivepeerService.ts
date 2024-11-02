import { Livepeer } from "livepeer";
import { LivepeerCreateStreamDto, LivepeerUpdateStreamDto, MultistreamTarget } from "../TypeChecking/createStreamDto";
import { streamConfig } from "Config/streamConfig";
import { StreamProfile } from "../TypeChecking/StreamData";

class LivePeerService {
  private livepeerClient;

  constructor() {
    this.livepeerClient = new Livepeer({ apiKey: streamConfig.livepeerApiClient });
  }

  /**
   * Creates a new stream in Livepeer.
   */
  public async createStream(streamData: LivepeerCreateStreamDto) {
    try {
      const createdStream = await this.livepeerClient.stream.create({
        name: streamData.title,
        profiles: streamData.profiles,
        playbackPolicy: streamData.playbackPolicy
      });
      return createdStream.stream;
    } catch (createStreamError) {
      console.error("🚀 ~ LivePeerService.createStream createStreamError ->", createStreamError);
      throw new Error("Failed to create stream.");
    }
  }

   /**
   * Attaches a multistream target to an existing stream.
   */
   public async attachMultistreamTarget(streamId: string, target: MultistreamTarget): Promise<boolean> {
    try {
      await this.livepeerClient.stream.update(streamId, {
        multistream: { targets: [target] }
      });
      return true;
    } catch (attachMultistreamError) {
      console.error("🚀 ~ LivePeerService.attachMultistreamTarget attachMultistreamError ->", attachMultistreamError);
      throw new Error("Failed to attach multistream target.");
    }
  }

  /**
   * Updates the profiles for an existing stream.
   */
  public async updateStreamProfiles(streamId: string, profiles: StreamProfile[]): Promise<boolean> {
    try {
      await this.livepeerClient.stream.update(streamId, { profiles });
      return true;
    } catch (updateProfilesError) {
      console.error("🚀 ~ LivePeerService.updateStreamProfiles updateProfilesError ->", updateProfilesError);
      throw new Error("Failed to update stream profiles.");
    }
  }

  /**
   * Update for stream properties.
   */
  public async updateStream(streamId: string, updateData: Partial<LivepeerUpdateStreamDto>): Promise<boolean> {
    try {
      await this.livepeerClient.stream.update(streamId, updateData);
      return true;
    } catch (updateStreamError) {
      console.error("🚀 ~ LivePeerService.updateStreamProperties updateStreamError ->", updateStreamError);
      throw new Error("Failed to update stream properties.");
    }
  }

  /**
   * Terminates a stream in Livepeer.
   */
  public async terminateStream(streamId: string): Promise<boolean> {
    try {
      await this.livepeerClient.stream.terminate(streamId);
      return true;
    } catch (terminateStreamError) {
      console.error("🚀 ~ LivePeerService.terminateStream terminateStreamError ->", terminateStreamError);
      throw new Error("Failed to terminate stream.");
    }
  }

  /**
   * Deletes a stream in Livepeer.
   */
  public async deleteStream(streamId: string): Promise<boolean> {
    try {
      await this.livepeerClient.stream.delete(streamId);
      return true;
    } catch (deleteStreamError) {
      console.error("🚀 ~ LivePeerService.deleteStream deleteStreamError ->", deleteStreamError);
      throw new Error("Failed to delete stream.");
    }
  }

  /**
   * Suspends a stream in Livepeer.(webhook event)
   */
  public async suspendStream(streamId: string): Promise<boolean> {
    try {
      await this.livepeerClient.stream.update(streamId,{
        suspended:true
      });
      return true;
    } catch (suspendStreamError) {
      console.error("🚀 ~ LivePeerService.suspendStream suspendStreamError ->", suspendStreamError);
      throw new Error("Failed to suspend stream.");
    }
  }

  /**
   * Activates a stream in Livepeer.(webhook event)
   */
  public async activateStream(streamId: string): Promise<boolean> {
    try {
      await this.livepeerClient.stream.update(streamId,{
        suspended:false,
      });
      return true;
    } catch (activateStreamError) {
      console.error("🚀 ~ LivePeerService.activateStream activateStreamError ->", activateStreamError);
      throw new Error("Failed to activate stream.");
    }
  }

  /**
   * Fetches stream details from Livepeer.
   */
  public async getStreamDetails(streamId: string) {
    try {
      const stream = await this.livepeerClient.stream.get(streamId);
      return stream;
    } catch (getStreamDetailsError) {
      console.error("🚀 ~ LivePeerService.getStreamDetails getStreamDetailsError ->", getStreamDetailsError);
      throw new Error("Failed to fetch stream details.");
    }
  }

}

export default new LivePeerService();