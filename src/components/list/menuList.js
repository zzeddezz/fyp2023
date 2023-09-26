import React, { useEffect } from "react";
import jwt from "jwt-decode";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import InventoryIcon from "@mui/icons-material/Inventory";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ArticleIcon from "@mui/icons-material/Article";
import BugReportIcon from "@mui/icons-material/BugReport";

export const SideNavMenu = () => {
  const token = localStorage.getItem("token");
  const decodedUser = jwt(token);

  const sideMenuAdmin = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <SpaceDashboardIcon fontSize="small" />,
    },
    {
      title: "Profile",
      path: "/dashboard/profile",
      icon: <AccountBoxIcon fontSize="small" />,
    },
    {
      title: "Booking",
      path: "/dashboard/booking",
      icon: <InventoryIcon fontSize="small" />,
    },
    {
      title: "Work Progress",
      path: "/dashboard/work-progress",
      icon: <EventNoteIcon fontSize="small" />,
    },
    {
      title: "Add Product",
      path: "/dashboard/add-product",
      icon: <ArticleIcon fontSize="small" />,
    },
    // {
    //   title: "Testing",
    //   path: "/dashboard/testing",
    //   icon: <BugReportIcon fontSize="small" />,
    // },
  ];

  const sideMenuUser = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <SpaceDashboardIcon fontSize="small" />,
    },
    {
      title: "Profile",
      path: "/dashboard/profile",
      icon: <AccountBoxIcon fontSize="small" />,
    },
    {
      title: "Booking",
      path: "/dashboard/booking",
      icon: <InventoryIcon fontSize="small" />,
    },
    {
      title: "Work Progress",
      path: "/dashboard/work-progress",
      icon: <EventNoteIcon fontSize="small" />,
    },
  ];

  if (decodedUser.email == "admin@gmail.com") {
    return sideMenuAdmin;
  }

  return sideMenuUser;
};

export const menuItems = [
  { id: "home", label: "Home", path: "/" },
  { id: "products", label: "Products", path: "/products" },
  { id: "bookingstatus", label: "Booking Status", path: "/status" },
  // { id: "login", label: "Login", path: "/login" },
  // Add more menu items here
];

export const userOption = [
  {
    id: 1,
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    id: 2,
    label: "Logout",
  },
];
