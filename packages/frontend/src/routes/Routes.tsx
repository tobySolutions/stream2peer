import { Route, Routes as BaseRoutes } from "react-router-dom";
import Home from "./home";
import Login from "./login";
import DashboardHome from "./dashboard/home";
import Projects from "./dashboard/projects";

export default function Routes() {
  return (
    <BaseRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard">
        <Route index element={<DashboardHome />} />
        <Route path="projects" element={<Projects />} />
        {/* <Route path=":productId" element={<Product />} /> */}
      </Route>
    </BaseRoutes>
  );
}
