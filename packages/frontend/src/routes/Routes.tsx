import { Route, Routes as BaseRoutes, Navigate } from "react-router-dom";
import SignIn from "./signIn";
import DashboardHome from "./dashboard/home/index";
import Projects from "./dashboard/projects";
import ProjectPage from "./dashboard/projects/[id]";
import LivestreamPage from "./dashboard/projects/[id]/livestream/[livestremId]";
import { DemoPlayer } from "./dashboard/livestream";
import { Destination } from "./dashboard/destination";
import { JoinProject } from "./dashboard/projects/join-project";
import { Stream } from "./stream/stream";
import PrivateRoute from "../lib/PrivateRoute";
import { BroadcastWithControls } from "./stream/broadcast";
import Otp from "./otp";
import NotFound from "./NotFound";
import Home from "./home";
import PrivacyPolicy from "./privacy-policy";
import TermsOfService from "./terms-of-service";

export default function Routes() {
  return (
    <BaseRoutes>
      <Route path="/" element={<Home />} />

      <Route path="/signIn/" element={<SignIn />} />
      <Route path="/otp/" element={<Otp />} />
      <Route path="/privacy-policy/" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service/" element={<TermsOfService />} />

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

      <Route path="*" element={<NotFound />} />
    </BaseRoutes>
  );
}
