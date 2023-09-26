import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedUser() {
  const isAuthorized = localStorage.getItem("token");

  return isAuthorized !== null ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedUser;
