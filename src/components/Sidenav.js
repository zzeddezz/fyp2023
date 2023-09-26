import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// icons
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

// list menu
import { SideNavMenu } from "./list/menuList";

// context
import { useSideNav } from "../utils/resizeContext";

function Sidenav() {
  const { isOpen, toggleIsOpen } = useSideNav();
  const navigate = useNavigate();

  const location = useLocation();
  const currentPath = location.pathname;

  const sideMenu = SideNavMenu();

  useEffect(() => {}, [isOpen]);

  const handleNavigate = () => {
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("BselectedTab");
    localStorage.removeItem("WselectedTab");
    navigate("/");
  };

  return (
    <nav
      className={`${
        isOpen ? "w-20" : "w-60"
      } min-h-screen bg-primary shadow-md relative p-5 pt-8 duration-500`}
    >
      <NavigateBeforeIcon
        className={`${
          isOpen && "rotate-180"
        } absolute text-white bg-primary -right-2 top-5 p-px rounded-full border-2 cursor-pointer shadow text-background`}
        onClick={toggleIsOpen}
        fontSize="small"
      />

      <div className="flex gap-4 items-center">
        <img
          onClick={handleNavigate}
          className={`cursor-pointer duration-500 w-16 rounded-lg ${
            isOpen && "rotate-[360deg]"
          } `}
          src="/assets/img/logo.jpeg"
          alt=""
        />
        <h1
          className={`${
            isOpen && "scale-0"
          } text-background origin-left font-medium text-md duration-300`}
        >
          Booking System
        </h1>
      </div>
      <ul className="pt-6">
        {sideMenu.map((item, index) => (
          <a
            key={index}
            className={`text-background text-sm font-medium flex gap-4 mt-2 items-center cursor-pointer p-2 hover:bg-secondary hover:text-primary hover:rounded-md ${
              currentPath === item.path ? "bg-secondary-100 rounded-md" : ""
            }`}
            href={item.path}
          >
            {item.icon}
            <li className="">
              <span
                className={`${isOpen && "hidden"} origin-left duration-200`}
              >
                {item.title}
              </span>
            </li>
          </a>
        ))}
        <div className="w-full flex justify-center items-center p-2">
          <button
            className={`text-xs absolute bottom-5  flex gap-2 justify-center items-center ${
              isOpen ? "w-4/5" : "w-3/5"
            }`}
          ></button>
          <button
            type="submit"
            onClick={handleLogout}
            className={`px-5 py-2 w-10/12 rounded-md text-sm text-primary font-medium absolute bottom-5 flex gap-2 justify-center items-center bg-secondary ${
              isOpen ? "w-4/5" : "w-3/5"
            }`}
          >
            <ExitToAppIcon fontSize="small" />
            {isOpen ? "" : "Logout"}
          </button>
        </div>
      </ul>
    </nav>
  );
}

export default Sidenav;
