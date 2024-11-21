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
import { Destination } from "./dashboard/destination";
import { JoinProject } from "./dashboard/projects/join-project";
import { Stream } from "./stream/stream";
import PrivateRoute from "../lib/PrivateRoute";

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

  return (
    <BaseRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardHome />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/projects"
        element={
          <PrivateRoute>
            <Projects />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/destination"
        element={
          <PrivateRoute>
            <Destination />
          </PrivateRoute>
        }
      />
      <Route
        path="/livestream"
        element={
          <PrivateRoute>
            <DemoPlayer />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/projects/:id"
        element={
          <PrivateRoute>
            <ProjectPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/projects/join/:id"
        element={
          <PrivateRoute>
            <JoinProject />
          </PrivateRoute>
        }
      />
      <Route
        path="/stream"
        element={
          <PrivateRoute>
            <Stream />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/projects/livestream/:id"
        element={
          <PrivateRoute>
            <LivestreamPage />
          </PrivateRoute>
        }
      />
    </BaseRoutes>
  );
}
