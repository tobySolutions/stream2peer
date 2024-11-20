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
import { BroadcastWithControls } from "./stream/broadcast";

export default function Routes() {

  return (
    <BaseRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard">
        <Route index element={<DashboardHome />} />
        <Route path="projects" element={<Projects />} />
        <Route path="destination" element={<Destination />} />
      </Route>
      <Route path="/livestream" element={<DemoPlayer />} />
      <Route element={<ProjectPage />} path="/dashboard/projects/:id" />
      <Route element={<JoinProject />} path="/projects/join/:id" />
      <Route path="/stream/:id" element={<Stream />} />
      <Route path="/broadcast/:id" element={<BroadcastWithControls />} />
      <Route
        element={<LivestreamPage />}
        path="/dashboard/projects/livestream/:id"
      />
    </BaseRoutes>
  );
}
