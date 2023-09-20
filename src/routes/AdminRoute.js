import React from "react";
import { Routes, Route } from "react-router-dom";

import Profile from "../pages/dashboard/Profile";
import Booking from "../pages/dashboard/Booking";
import WorkProgress from "../pages/dashboard/WorkProgress";
import Testing from "../pages/dashboard/Testing";
import AddProduct from "../pages/dashboard/AddProduct";

import ProtectedAdmin from "../utils/ProtectedRoute/ProtectedAdmin";
import Sidenav from "../components/Sidenav";

function AdminRoute() {
  return (
    <div className="w-full">
      <Routes>
        {/* non-dashboard view */}
        <Route element={<ProtectedAdmin />}>
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/booking" element={<Booking />} />
          <Route path="/dashboard/work-progress" element={<WorkProgress />} />
          <Route path="/dashboard/add-product" element={<AddProduct />} />
          <Route path="/dashboard/testing" element={<Testing />} />
        </Route>
      </Routes>
    </div>
  );
}

export default AdminRoute;
