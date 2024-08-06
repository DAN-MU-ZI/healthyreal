import React from "react";
import {Navigate} from "react-router-dom";
import {useAuth} from "./AuthContext";

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({element}) => {
  const {isAuthenticated} = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectedRoute;
