import * as Player from "@livepeer/react/player";
import { PauseIcon, PlayIcon } from "@livepeer/react/assets";
import Layout from "../layout";

export const DemoPlayer = () => {
  return (
    <Layout>
      <div className="p-4 bg-white">
        <Player.Root src={null}>
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
    </Layout>
  );
};
