import React, { useState } from "react";
import jwt from "jwt-decode";
import dateFormat from "dateformat";

// components
import Sidenav from "../../components/Sidenav";
import Footer from "../../components/Footer";

// context
import { useSideNav } from "../../utils/resizeContext";

function Profile() {
  const { isOpen, toggleIsOpen } = useSideNav();
  const token = localStorage.getItem("token");
  const decodedUser = jwt(token);

  console.log(decodedUser);

  return (
    <div className="w-full min-h-screen flex flex-row">
      <div className="fixed">
        <Sidenav />
      </div>
      <div
        className={`w-full duration-300 min-h-screen ${
          isOpen === true ? "ml-20" : "ml-60"
        }`}
      >
        <div className="w-full min-h-screen flex flex-col">
          <section className="flex flex-col flex-1 py-5 px-10 text-primary">
            <h1 className="font-medium text-2xl mt-10">Profile</h1>
            <div className="border-4 flex flex-row flex-wrap gap-10 md:w-6/12 mt-10 border-gray-1 rounded-md shadow-lg p-10">
              <div className="w-72">
                <label className="block font-semibold text-sm text-primary">
                  Name
                </label>
                <p className="text-text">{decodedUser.name}</p>
              </div>
              <div className="w-72">
                <label className="block font-semibold text-sm text-primary">
                  Email
                </label>
                <p className="text-text">{decodedUser.email}</p>
              </div>
              <div className="w-72">
                <label className="block font-semibold text-sm text-primary">
                  Phone
                </label>
                <p className="text-text">{decodedUser.phone}</p>
              </div>
              <div className="w-72">
                <label className="block font-semibold text-sm text-primary">
                  Joined
                </label>
                <p className="text-text">
                  {dateFormat(decodedUser.dateCreated, "mmmm dS, yyyy")}
                </p>
              </div>
            </div>
          </section>
          <div className="w-full">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
