import React from "react";
import Sidenav from "../../components/Sidenav";

function Profile() {
  return (
    <div className="w-full h-rm-nav flex justify-center items-center">
      <div className="w-48 flex flex-col">
        <Sidenav />
      </div>
      <div className="flex-1 justify-center items-center">
        <h1 className="font-medium text-xl">Profile</h1>
      </div>
    </div>
  );
}

export default Profile;
