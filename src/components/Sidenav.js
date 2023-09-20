import React from "react";
import { useLocation } from "react-router-dom";

function Sidenav() {
  const location = useLocation();
  const currentPath = location.pathname;
  const pathName = currentPath.split("/").pop();

  const menuItems = [
    { id: "home", label: "Home", path: "/" },
    { id: "booking", label: "Booking", path: "booking" },
    { id: "workprogress", label: "Work Progress", path: "work-progress" },
    { id: "addproduct", label: "Add Product", path: "add-product" },
    { id: "testing", label: "Testing", path: "testing" },
    // Add more menu items here
  ];

  return (
    <div className="fixed top-0 left-0 bottom-0 pt-20 bg-secondary w-52 overflow-y-auto shadow-md">
      <ul className="list-none p-0 ml-3 mr-3">
        {menuItems.map((item) => (
          <a key={item.id} href={item.path}>
            <li
              className={`${
                pathName == item.path
                  ? "font-medium text-secondary bg-primary shadow rounded transition-all hover:text-secondary"
                  : ""
              } py-2 px-4 cursor-pointer text-sm hover:text-primary font-medium`}
            >
              {item.label}
            </li>
          </a>
        ))}
      </ul>
    </div>
  );
}

export default Sidenav;
