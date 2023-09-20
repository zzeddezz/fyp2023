import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import StatusPage from "../pages/StatusPage";
import Register from "../pages/Register";
import Login from "../pages/Login";

import Topnav from "../components/Topnav";

function UserRoute() {
  return (
    <div className="w-full">
      <div className="w-full">
        <Topnav />
      </div>
      <Routes>
        {/* non-dashboard view */}
        <Route path="/" element={<Homepage />} />
        <Route path="products" element={<Products />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="status" element={<StatusPage />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default UserRoute;
