import type { JSX } from "react";
import { getAccessToken } from "../utils/tokenStorage";
import { Navigate } from "react-router-dom";

interface RoleGuardProps {
  children: JSX.Element;
  rolerequiredRole?: string;
}

const RoleGuard = ({ children }: RoleGuardProps) => {
  const token = getAccessToken();
  if (!token) {
    return <Navigate to="/SignIn" replace />;
  }
  return children;
};

export default RoleGuard;
