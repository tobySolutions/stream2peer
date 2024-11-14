import * as Player from "@livepeer/react/player";
import { PauseIcon, PlayIcon } from "@livepeer/react/assets";
import { Src } from "@livepeer/react";
import { useContext } from "react";
import { StateContext } from "../../context";

export const Stream = () => {

  
  const { currentStream } = useContext(StateContext);

  console.log(currentStream);

  return (
    <div className="p-4 bg-white">
      <Player.Root src={currentStream?.playbackId}>
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
    </div>
  );
};
