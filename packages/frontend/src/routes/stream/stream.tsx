import * as Player from "@livepeer/react/player";
import { PauseIcon, PlayIcon } from "@livepeer/react/assets";
import { Src } from "@livepeer/react";
import { useContext, useEffect, useState } from "react";
import { getSrc } from "@livepeer/react/external";
import { Livepeer } from "livepeer";
import { StateContext } from "../../context";

export const Stream = () => {
  const [streamSource, setStreamSource] = useState<Src[] | null>(null);

  const { currentStream } = useContext(StateContext);

  const livepeer = new Livepeer({
    apiKey: import.meta.env.VITE_LIVEPEER_API_KEY,
  });

  const getPlaybackSource = async () => {
    const playbackInfo = await livepeer.playback.get("c6e2jusy55anjf6y");
  
    const src = getSrc(playbackInfo.playbackInfo);
    setStreamSource(src);
    return src;
  };

  useEffect(() => {
    getPlaybackSource();
  }, []);

  console.log(streamSource);

  return (
    <div className="p-4">
      {streamSource ? (
        <Player.Root src={streamSource}>
          <Player.Container>
            <Player.Video title="Live stream" />
            <Player.Controls className="flex items-center justify-center">
              <Player.PlayPauseTrigger className="w-10 h-10">
                <Player.PlayingIndicator asChild matcher={false}>
                  <PlayIcon />
                </Player.PlayingIndicator>
                <Player.PlayingIndicator asChild>
                  <PauseIcon />
                </Player.PlayingIndicator>
              </Player.PlayPauseTrigger>
            </Player.Controls>
          </Player.Container>
        </Player.Root>
      ) : (
        <div>
          <p>Loading....</p>
        </div>
      )}

      {/* <iframe
        src="https://lvpr.tv?v=da8eteqf2utkawj2"
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
      ></iframe> */}
    </div>
  );
};
