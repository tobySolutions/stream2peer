import * as Player from "@livepeer/react/player";
import { OfflineErrorIcon, PauseIcon, PlayIcon } from "@livepeer/react/assets";
import { Src } from "@livepeer/react";
import { useEffect, useState } from "react";
import { getSrc } from "@livepeer/react/external";
import { Livepeer } from "livepeer";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { VscMute as MuteIcon } from "react-icons/vsc";
import { GoUnmute as UnmuteIcon } from "react-icons/go";
import {
  RateSelectItem,
  Seek,
  VideoQualitySelectItem,
} from "@livepeer/react/player";
import { IoMdSettings as Settings } from "react-icons/io";
import { getDataInCookie } from "../../utils/utils";

export const Stream = () => {
  const { id: playbackId } = useParams();
  console.log(playbackId);
  let navigate = useNavigate();
  const [streamSource, setStreamSource] = useState<Src[] | null>(null);
  const [toggleError, setToggelError] = useState(false);
  const [errorType, setErrorType] = useState<
    | "offline"
    | "access-control"
    | "fallback"
    | "permissions"
    | "unknown"
    | undefined
  >(undefined);

  const accessKey = JSON.parse(getDataInCookie("stream-access-token"));
  // console.log(accessKey)

  const livepeer = new Livepeer({
    apiKey: import.meta.env.VITE_LIVEPEER_API_KEY,
  });

  const getPlaybackSource = async () => {
    try {
      const playbackInfo = await livepeer.playback?.get(playbackId!);
      console.log(playbackInfo);
      const src = getSrc(playbackInfo.playbackInfo);
      console.log(src);
      setStreamSource(src);
      return src;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPlaybackSource();
  }, []);

  console.log(streamSource);

  return (
    <div className="p-4">
      {streamSource ? (
        toggleError ? (
          <div className="grid place-content-center w-full h-screen">
            {errorType === "offline" ? (
              <div>
                <OfflineErrorIcon className="h-[120px] w-full sm:flex hidden text-primary-white" />
                <p>This livestream is currently offline now</p>
              </div>
            ) : errorType === "access-control" ? (
              "Sorry you do not have access to view this livestream"
            ) : (
              "An error occured while fetching livestream, please try again later"
            )}
          </div>
        ) : (
          <Player.Root
            src={streamSource}
            accessKey={accessKey}
            autoPlay={true}
            videoQuality="1080p"
            onError={(error) => {
              console.log(error);
              setErrorType(error?.type);
              setToggelError(true);
            }}
            // streamOfflineErrorComponent={() => (
            //   <div>
            //     Stream is offline. Playback will start automatically once the
            //     stream has started.
            //   </div>
            // )}
          >
            <Player.Container
              style={{
                height: "100%",
                width: "100%",
                overflow: "hidden",
                backgroundColor: "black",
              }}
            >
              {/* <Player.LoadingIndicator asChild>
                <Loading />
              </Player.LoadingIndicator> */}
              <Player.Video
                title="Agent 327"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "contain",
                }}
              />

              <Player.Controls
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6))",
                  padding: "0.5rem 1rem",
                  display: "flex",
                  flexDirection: "column-reverse",
                  gap: 5,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "between",
                    gap: 20,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Player.PlayPauseTrigger
                      style={{
                        width: 25,
                        height: 25,
                      }}
                    >
                      <Player.PlayingIndicator asChild matcher={false}>
                        <PlayIcon />
                      </Player.PlayingIndicator>
                      <Player.PlayingIndicator asChild>
                        <PauseIcon />
                      </Player.PlayingIndicator>
                    </Player.PlayPauseTrigger>

                    <Player.LiveIndicator
                      style={{ display: "flex", alignItems: "center", gap: 5 }}
                    >
                      <div
                        style={{
                          backgroundColor: "#ef4444",
                          height: 8,
                          width: 8,
                          borderRadius: 9999,
                        }}
                      />
                      <span style={{ fontSize: 12, userSelect: "none" }}>
                        LIVE
                      </span>
                    </Player.LiveIndicator>

                    <Player.MuteTrigger
                      style={{
                        width: 25,
                        height: 25,
                      }}
                    >
                      <Player.VolumeIndicator asChild matcher={false}>
                        <MuteIcon />
                      </Player.VolumeIndicator>
                      <Player.VolumeIndicator asChild matcher={true}>
                        <UnmuteIcon />
                      </Player.VolumeIndicator>
                    </Player.MuteTrigger>
                    <Player.Volume
                      style={{
                        position: "relative",
                        display: "flex",
                        flexGrow: 1,
                        height: 25,
                        alignItems: "center",
                        maxWidth: 120,
                        touchAction: "none",
                        userSelect: "none",
                      }}
                    >
                      <Player.Track
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.7)",
                          position: "relative",
                          flexGrow: 1,
                          borderRadius: 9999,
                          height: "2px",
                        }}
                      >
                        <Player.Range
                          style={{
                            position: "absolute",
                            backgroundColor: "white",
                            borderRadius: 9999,
                            height: "100%",
                          }}
                        />
                      </Player.Track>
                      <Player.Thumb
                        style={{
                          display: "block",
                          width: 12,
                          height: 12,
                          backgroundColor: "white",
                          borderRadius: 9999,
                        }}
                      />
                    </Player.Volume>
                  </div>
                  <Settings />
                </div>
                <Seek
                  style={{
                    position: "relative",
                    height: 20,
                    display: "flex",
                    alignItems: "center",
                    userSelect: "none",
                    touchAction: "none",
                  }}
                />
              </Player.Controls>
            </Player.Container>
          </Player.Root>
        )
      ) : (
        <div className="grid place-content-center w-full h-screen">
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

// const Settings = React.forwardRef(
//   (
//     { style }: { style?: CSSProperties },
//     ref: React.Ref<HTMLButtonElement> | undefined
//   ) => {
//     return (
//       <Popover.Root>
//         <Popover.Trigger ref={ref} asChild>
//           <button
//             type="button"
//             style={style}
//             aria-label="Playback settings"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <SettingsIcon
//               style={{
//                 width: 25,
//                 height: 25,
//               }}
//             />
//           </button>
//         </Popover.Trigger>
//         <Popover.Portal>
//           <Popover.Content
//             style={{
//               width: 250,
//               borderRadius: 5,
//               backgroundColor: "rgba(0, 0, 0, 0.5)",
//               border: "1px solid rgba(255, 255, 255, 0.5)",
//               backdropFilter: "blur(12px)",
//               padding: 10,
//             }}
//             side="top"
//             alignOffset={-70}
//             align="end"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: 8,
//               }}
//             >
//               <p
//                 style={{
//                   fontSize: 14,
//                 }}
//               >
//                 Settings
//               </p>
//               <Player.LiveIndicator
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 8,
//                 }}
//                 matcher={false}
//               >
//                 <label
//                   style={{
//                     fontSize: 12,
//                   }}
//                   htmlFor="qualitySelect"
//                 >
//                   Quality
//                 </label>
//                 <Player.RateSelect name="rateSelect">
//                   <Player.SelectTrigger
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                       height: 30,
//                       minWidth: 120,
//                       fontSize: 12,
//                       gap: 5,
//                       padding: 10,
//                       borderRadius: 5,
//                       outline: "white solid 1px",
//                     }}
//                     aria-label="Playback speed"
//                   >
//                     <Player.SelectValue placeholder="Select a speed..." />
//                     <Player.SelectIcon>
//                       <ChevronDownIcon style={{ width: 14, height: 14 }} />
//                     </Player.SelectIcon>
//                   </Player.SelectTrigger>
//                   <Player.SelectPortal>
//                     <Player.SelectContent
//                       style={{
//                         borderRadius: 5,
//                         backgroundColor: "black",
//                       }}
//                     >
//                       <Player.SelectViewport style={{ padding: 5 }}>
//                         <Player.SelectGroup>
//                           <RateSelectItem value={0.5}>0.5x</RateSelectItem>
//                           <RateSelectItem value={1}>1x</RateSelectItem>
//                         </Player.SelectGroup>
//                       </Player.SelectViewport>
//                     </Player.SelectContent>
//                   </Player.SelectPortal>
//                 </Player.RateSelect>
//               </Player.LiveIndicator>
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: 8,
//                 }}
//               >
//                 <label
//                   style={{
//                     fontSize: 12,
//                   }}
//                   htmlFor="qualitySelect"
//                 >
//                   Quality
//                 </label>
//                 <Player.VideoQualitySelect name="qualitySelect">
//                   <Player.SelectTrigger
//                     style={{
//                       minWidth: 120,
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "space-between",
//                       height: 30,
//                       fontSize: 12,
//                       gap: 5,
//                       padding: 10,
//                       borderRadius: 5,
//                       outline: "white solid 1px",
//                     }}
//                     aria-label="Playback quality"
//                   >
//                     <Player.SelectValue placeholder="Select a quality..." />
//                     <Player.SelectIcon>
//                       <ChevronDownIcon style={{ width: 14, height: 14 }} />
//                     </Player.SelectIcon>
//                   </Player.SelectTrigger>
//                   <Player.SelectPortal>
//                     <Player.SelectContent
//                       style={{
//                         borderRadius: 5,
//                         backgroundColor: "black",
//                       }}
//                     >
//                       <Player.SelectViewport style={{ padding: 5 }}>
//                         <Player.SelectGroup>
//                           <VideoQualitySelectItem value="auto">
//                             Auto (HD+)
//                           </VideoQualitySelectItem>
//                           <VideoQualitySelectItem value="1080p">
//                             1080p (HD)
//                           </VideoQualitySelectItem>
//                           <VideoQualitySelectItem value="360p">
//                             360p
//                           </VideoQualitySelectItem>
//                         </Player.SelectGroup>
//                       </Player.SelectViewport>
//                     </Player.SelectContent>
//                   </Player.SelectPortal>
//                 </Player.VideoQualitySelect>
//               </div>
//             </div>
//             <Popover.Close
//               style={{
//                 borderRadius: 9999,
//                 height: 20,
//                 width: 20,
//                 display: "inline-flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 position: "absolute",
//                 top: 5,
//                 right: 5,
//               }}
//               aria-label="Close"
//             >
//               <XIcon />
//             </Popover.Close>
//             <Popover.Arrow
//               style={{
//                 fill: "white",
//               }}
//             />
//           </Popover.Content>
//         </Popover.Portal>
//       </Popover.Root>
//     );
//   }
// );
