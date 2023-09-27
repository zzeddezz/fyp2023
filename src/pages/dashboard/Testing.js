import React, { useState } from "react";

// components
import Sidenav from "../../components/Sidenav";
import Footer from "../../components/Footer";

// context
import { useSideNav } from "../../utils/resizeContext";

function Testing() {
  const { isOpen, toggleIsOpen } = useSideNav();

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
          <section className="flex flex-1 py-5 px-10 text-primary">
            <h1 className="font-medium text-2xl mt-10">Testing</h1>
          </section>
          <div className="w-full">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testing;
