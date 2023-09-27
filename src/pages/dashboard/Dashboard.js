import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jwt-decode";

// components
import Sidenav from "../../components/Sidenav";
import Footer from "../../components/Footer";

// context
import { useSideNav } from "../../utils/resizeContext";

function Dashboard() {
  const { isOpen, toggleIsOpen } = useSideNav();
  const [totalData, setTotalData] = useState([]);
  const [totalUserData, setTotalUserData] = useState([]);
  const token = localStorage.getItem("token");
  const decodedUser = jwt(token);

  const serverUrl = `${process.env.REACT_APP_API_URL}`;

  useEffect(() => {
    getAllData();
    getUserData();
  }, []);

  const getAllData = () => {
    try {
      axios.get(`${serverUrl}/dashboard/all`).then((response) => {
        setTotalData(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = () => {
    try {
      axios
        .get(`${serverUrl}/dashboard/${decodedUser.email}`)
        .then((response) => {
          setTotalUserData(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

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
          <section className="flex flex-1 flex-col py-5 px-10 text-primary">
            <h1 className="font-medium text-2xl mt-10">Dashboard</h1>

            <div className="w-full flex md:flex-row flex-wrap justify-center items-center mt-10 gap-10">
              <div
                className={`border-2 rounded-lg md:w-60 w-36 md:h-40 h-24 md:p-5 p-2 ${
                  decodedUser.email !== "admin@gmail.com" ? "hidden" : ""
                }`}
              >
                <p className="font-semibold text-sm md:text-md">
                  Total Product
                </p>
                <h1 className="text-center md:text-6xl text-3xl font-bold text-text md:pt-4 pt-2">
                  {decodedUser.email == "admin@gmail.com"
                    ? totalData.product
                    : ""}
                </h1>
              </div>
              <div className="border-2 rounded-lg md:w-60 w-36 md:h-40 h-24 md:p-5 p-2">
                <p className="font-semibold text-sm md:text-md">
                  Total Booking
                </p>
                <h1 className="text-center md:text-6xl text-3xl font-bold text-text md:pt-4 pt-2">
                  {decodedUser.email == "admin@gmail.com"
                    ? totalData.booking
                    : totalUserData.totalBooking}
                </h1>
              </div>
              <div className="border-2 rounded-lg md:w-60 w-36 md:h-40 h-24 md:p-5 p-2">
                <p className="font-semibold text-sm md:text-md">
                  Total In Progress
                </p>
                <h1 className="text-center md:text-6xl text-3xl font-bold text-text md:pt-4 pt-2">
                  {decodedUser.email == "admin@gmail.com"
                    ? totalData.workProgress
                    : totalUserData.workInProgress}
                </h1>
              </div>
              <div className="border-2 rounded-lg md:w-60 w-36 md:h-40 h-24 md:p-5 p-2">
                <p className="font-semibold text-sm md:text-md">Total Done</p>
                <h1 className="text-center md:text-6xl text-3xl font-bold text-text md:pt-4 pt-2">
                  {decodedUser.email == "admin@gmail.com"
                    ? totalData.workDone
                    : totalUserData.workDone}
                </h1>
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

export default Dashboard;
