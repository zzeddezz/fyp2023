import React from "react";

// router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import {
  Homepage,
  Login,
  Product,
  ProductDetails,
  Register,
  StatusPage,
  Dashboard,
  AddProduct,
  Booking,
  Profile,
  WorkProgress,
  Testing,
} from "./pages";

// protected
import ProtectedUser from "./utils/ProtectedUser";

// context
import { SideNavProvider } from "./utils/resizeContext";
import { AuthProvider } from "./utils/authContext";

function App() {
  return (
    <AuthProvider>
      <SideNavProvider>
        <BrowserRouter>
          <Routes>
            {/* non-dashboard view */}
            <Route path="/" element={<Homepage />} />
            <Route path="products" element={<Product />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="status" element={<StatusPage />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />

            {/* dashboard view */}

            <Route element={<ProtectedUser />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/profile" element={<Profile />} />
              <Route path="/dashboard/booking" element={<Booking />} />
              <Route
                path="/dashboard/work-progress"
                element={<WorkProgress />}
              />
              <Route path="/dashboard/add-product" element={<AddProduct />} />
              <Route path="/dashboard/testing" element={<Testing />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SideNavProvider>
    </AuthProvider>
  );
}

export default App;
