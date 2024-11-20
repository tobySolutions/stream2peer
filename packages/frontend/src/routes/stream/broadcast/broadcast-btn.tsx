import { useState, useCallback } from "react";
import { Livepeer } from "livepeer";
import { getIngest } from "@livepeer/react/external";
import * as Broadcast from "@livepeer/react/broadcast";

const LivestreamComponent = () => {
  const [streamKey, setStreamKey] = useState<any>(null);
  const [ingestUrl, setIngestUrl] = useState<any>(null);

  const livepeer = new Livepeer({
    apiKey: import.meta.env.VITE_LIVEPEER_API_KEY,
  });

  const createStream = useCallback(async () => {
    try {
      
      setIngestUrl("rtmp://rtmp.livepeer.com/live");
    } catch (error) {
      console.error("Error creating stream:", error);
    }
  }, []);

  return (
    <div>
      <button onClick={createStream}>Start Broadcast</button>
      {streamKey && ingestUrl && (
        <Broadcast.Root ingestUrl={ingestUrl}>
          <Broadcast.Container>
            <Broadcast.Video />
            <Broadcast.Controls />
          </Broadcast.Container>
        </Broadcast.Root>
      )}
    </div>
  );
};

export default LivestreamComponent;
