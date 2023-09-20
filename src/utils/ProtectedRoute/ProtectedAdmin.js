import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Sidenav from "../../components/Sidenav";

const ProtectedAdmin = () => {
  const isAuthorized = localStorage.getItem("token");

  return isAuthorized !== null ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedAdmin;
