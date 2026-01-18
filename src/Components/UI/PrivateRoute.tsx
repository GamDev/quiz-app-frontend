import type { JSX } from "react";
import { getAccessToken } from "../../utils/tokenStorage";
import { Navigate } from "react-router-dom";

interface ChildrenProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: ChildrenProps) => {
  const token = getAccessToken();
  if (!token) {
    return <Navigate to="/SignIn" replace />;
  }
  return children;
};

export default PrivateRoute;
