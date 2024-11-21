import React from "react";
import { Navigate } from "react-router-dom";
import { getDataInCookie } from "../utils/utils";

type PrivateRouteProps = {
  children: React.ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const userToken = getDataInCookie("userToken");

  if (!userToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
