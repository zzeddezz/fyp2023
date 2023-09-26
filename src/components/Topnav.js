import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { menuItems } from "./list/menuList";
import { useAuth } from "../utils/authContext";
import { userOption } from "./list/menuList";

function Topnav() {
  const location = useLocation();
  const currentPath = location.pathname;

  const [submenuOpen, setSubmenuOpen] = useState(false);
  const submenuRef = useRef(null);

  const { user } = useAuth();

  const token = localStorage.getItem("token");

  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    // Check if the click is outside the submenu
    if (submenuRef.current && !submenuRef.current.contains(event.target)) {
      setSubmenuOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("WselectedTab");
    localStorage.removeItem("BselectedTab");
    setSubmenuOpen(false);
    window.location.reload();
  };

  return (
    <nav className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="/">
                <img
                  className="w-16 rounded-lg"
                  src="assets/img/logo.jpeg"
                  alt=""
                />
              </a>
            </div>
          </div>

          <div className=" md:block">
            <div className="ml-auto flex md:flex-row justify-center items-center space-x-4 relative">
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
              {token !== null ? (
                <img
                  className="w-12 cursor-pointer rounded-full"
                  src="/assets/img/user.png"
                  alt=""
                  onClick={() => {
                    setSubmenuOpen(!submenuOpen);
                  }}
                />
              ) : (
                <a
                  href="/login"
                  className="text-primary text-sm font-semibold px-3 py-2 border rounded-md bg-secondary hover:bg-primary hover:text-secondary"
                >
                  Sign In
                </a>
              )}
              {submenuOpen ? (
                <ul
                  ref={submenuRef}
                  className="absolute right-0 top-16 w-40 bg-white border-2 rounded-md border-primary shadow-md"
                >
                  {userOption.map((submenuItem) => (
                    <li key={submenuItem.id}>
                      {submenuItem.label === "Logout" ? (
                        <a
                          className="block px-4 py-2 hover:bg-secondary hover:rounded-md hover:text-primary text-sm font-medium"
                          href="#"
                          onClick={handleLogout}
                        >
                          Logout
                        </a>
                      ) : (
                        <a
                          className="block px-4 py-2 hover:bg-secondary hover:rounded-md hover:text-primary text-sm font-medium"
                          href={submenuItem.path}
                        >
                          {submenuItem.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Topnav;
