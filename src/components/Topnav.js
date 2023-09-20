import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Topnav() {
  const location = useLocation();
  const currentPath = location.pathname;

  console.log(currentPath);

  const menuItems = [
    { id: "home", label: "Home", path: "/" },
    { id: "products", label: "Products", path: "/products" },
    { id: "bookingstatus", label: "Booking Status", path: "/status" },
    // { id: "login", label: "Login", path: "/login" },
    // Add more menu items here
  ];

  return (
    <nav className="bg-background drop-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="/">
                <span className="text-white">Logo</span>
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-auto flex items-baseline space-x-4 relative">
              {menuItems.map((item) => (
                <a
                  key={item.id}
                  href={item.path}
                  className={`${
                    currentPath == item.path ? "bg-primary text-background" : ""
                  } text-gray-300 hover:bg-secondary hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Topnav;
