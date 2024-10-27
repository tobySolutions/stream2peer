import { Route, Routes as BaseRoutes } from "react-router-dom";
import Home from "./home";
import Login from "./login";
import DashboardHome from "./dashboard/home";
import Projects from "./dashboard/projects";
import SignUp from "./signup";
import ProjectPage from "./dashboard/projects/[id]";
import LivestreamPage from "./dashboard/projects/[id]/livestream/[livestremId]";
import { DemoPlayer } from "./dashboard/livestream";
import { getSrc } from "@livepeer/react/external";
import { Livepeer } from "livepeer";

export default function Routes() {
  const playbackId = import.meta.env.VITE_PLAYBACK_URL;

  const livepeer = new Livepeer({
    apiKey: import.meta.env.VITE_LIVEPEER_API_KEY,
  });

  const getPlaybackSource = async () => {
    const playbackInfo = await livepeer.playback.get(playbackId);

    const src = getSrc(playbackInfo.playbackInfo);

    return src;
  };

  // const src = await getPlaybackSource();

  return (
    <BaseRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard">
        <Route index element={<DashboardHome />} />
        <Route path="projects" element={<Projects />} />
        {/* <Route path=":productId" element={<Product />} /> */}
      </Route>
      <Route path="/livestream" element={<DemoPlayer />} />
      <Route element={<ProjectPage />} path="/dashboard/projects/:id" />
      <Route
        element={<LivestreamPage />}
        path="/dashboard/projects/livestream/:id"
      />
    </BaseRoutes>
  );
}
