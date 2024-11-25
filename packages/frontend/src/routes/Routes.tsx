import { Route, Routes as BaseRoutes } from "react-router-dom";
import Login from "./login";
import DashboardHome from "./dashboard/home";
import Projects from "./dashboard/projects";
import SignUp from "./signup";
import ProjectPage from "./dashboard/projects/[id]";
import LivestreamPage from "./dashboard/projects/[id]/livestream/[livestremId]";
import { DemoPlayer } from "./dashboard/livestream";
import { Destination } from "./dashboard/destination";
import { JoinProject } from "./dashboard/projects/join-project";
import { Stream } from "./stream/stream";
import PrivateRoute from "../lib/PrivateRoute";
import { BroadcastWithControls } from "./stream/broadcast";
import Otp from "./otp";

export default function Routes() {
  return (
    <BaseRoutes>
      <Route path="/login/" element={<Login />} />
      <Route path="/signup/" element={<SignUp />} />
      <Route path="/otp/" element={<Otp />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard/"
        element={
          <PrivateRoute>
            <DashboardHome />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/projects/"
        element={
          <PrivateRoute>
            <Projects />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard/destination/"
        element={
          <PrivateRoute>
            <Destination />
          </PrivateRoute>
        }
      />
      <Route
        path="/livestream/"
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
        path="destination/"
        element={
          <PrivateRoute>
            <Destination />
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
        path="/stream/"
        element={
          <PrivateRoute>
            <Stream />
          </PrivateRoute>
        }
      />
      <Route
        path="/stream/:id"
        element={
          <PrivateRoute>
            <Stream />
          </PrivateRoute>
        }
      />
      <Route
        path="/broadcast/:id"
        element={
          <PrivateRoute>
            <BroadcastWithControls />
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
