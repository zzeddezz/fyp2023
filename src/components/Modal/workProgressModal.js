import React, { useState } from "react";
import Box from "@mui/material/Box";
import dateFormat from "dateformat";
import Modal from "@mui/material/Modal";
import axios from "axios";
import jwt from "jwt-decode";

// icons
import CloseIcon from "@mui/icons-material/Close";

function WorkProgressModal(props) {
  const [formData, setFormData] = useState(new FormData());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [newBookingDate, setNewBookingDate] = useState(props.bookingDate);
  const token = localStorage.getItem("token");
  const decodedUser = jwt(token);

  const handleSubmit = async (id) => {
    try {
      formData.set("workStatus", "Done");
      const obj = Object.fromEntries(formData.entries());

      const res = await axios.put(`${process.env.REACT_APP_API_URL}/work/${id}`, obj);

      if (res) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Box className="flex w-full justify-center items-center h-full">
        <div className=" w-2/5 bg-background rounded flex justify-start items-start relative">
          {/* close button */}
          <button className="absolute top-5 right-5" onClick={props.clickClose}>
            <CloseIcon fontSize="small" className="text-red-danger" />
          </button>
          <div className="p-10 w-full h-full flex flex-col">
            <h1 className="font-semibold text-lg text-primary">
              Booking Details
            </h1>

            <div className="mt-5 text-primary font-semibold text-lg">
              {props.product}
            </div>

            <form className="mt-5 text-sm" action="">
              <div className="flex">
                <div className="flex flex-col w-1/2 pr-4">
                  <label className="text-text text-sm font-medium" htmlFor="">
                    Name:
                  </label>
                  <p>{props.name}</p>
                </div>
                <div className="flex flex-col w-1/2 pl-4">
                  <label className="text-text text-sm font-medium" htmlFor="">
                    Email:
                  </label>
                  <p>{props.email}</p>
                </div>
              </div>

              <div className="flex mt-4">
                <div className="flex flex-col w-1/2 pr-4">
                  <label className="text-text text-sm font-medium" htmlFor="">
                    Phone:
                  </label>
                  <p>{props.phone}</p>
                </div>
                <div className="flex flex-col w-1/2 pl-4">
                  <label className="text-text text-sm font-medium" htmlFor="">
                    Status
                  </label>
                  <p
                    className={`${
                      props.status === "In Progress"
                        ? "text-yellow-inprogress font-semibold"
                        : props.status === "Done"
                        ? "text-green-success font-semibold"
                        : null
                    }`}
                  >
                    {props.status}
                  </p>
                </div>
              </div>

              <div className="flex mt-4">
                <div className="flex flex-col w-1/2 pr-4">
                  <label className="text-text text-sm font-medium" htmlFor="">
                    Address:
                  </label>
                  <p>{props.address}</p>
                </div>
                <div className="flex flex-col w-1/2 pl-4">
                  <label className="text-text text-sm font-medium" htmlFor="">
                    Booking Key:
                  </label>
                  <p>{props.bookingKey}</p>
                </div>
              </div>

              <div className="flex mt-4">
                <div className="flex flex-col w-1/2 pr-4">
                  <label className="text-text text-sm font-medium" htmlFor="">
                    Date Submit:
                  </label>
                  <p>{dateFormat(props.date, "mmmm dS, yyyy")}</p>
                </div>
                <div className="flex flex-col w-1/2 pl-4">
                  <label className="text-text text-sm font-medium" htmlFor="">
                    Date Booking:
                  </label>
                  <p>{dateFormat(props.bookingDate, "mmmm dS, yyyy")}</p>
                </div>
              </div>

              {/* button section */}
              <div className="flex justify-end mt-5">
                <div className="flex justify-end mt-5">
                  {!isModalOpen &&
                  decodedUser.email === "admin@gmail.com" &&
                  props.status === "In Progress" ? (
                    <>
                      <button
                        type="button"
                        className="px-3 py-2 mr-2 border rounded shadow-md bg hover:bg-red-danger text-primary font-medium hover:shadow hover:bg-primary hover:text-background  transition-all"
                        onClick={props.clickClose}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="px-3 py-2 ml-2 border rounded shadow-md bg-primary text-secondary font-medium hover:shadow hover:bg-secondary hover:text-primary transition-all"
                        onClick={() => setIsConfirm(true)}
                      >
                        Done
                      </button>
                    </>
                  ) : null}

                  {/* confirmation modal */}

                  {isConfirm && (
                    <Modal open={props.open} onClose={props.onClose}>
                      <Box className="flex w-full justify-center items-center h-full">
                        <div className="bg-background rounded flex flex-col justify-center items-center relative p-10">
                          <button
                            className="absolute top-5 right-5"
                            onClick={props.clickClose}
                          >
                            <CloseIcon
                              fontSize="small"
                              className="text-red-danger"
                            />
                          </button>
                          <p className="mb-5 font-medium">Are you sure ?</p>
                          <div className="flex flex-row">
                            <button
                              onClick={() => setIsConfirm(false)}
                              className="px-3 py-2 mr-2 border rounded shadow-md bg hover:bg-red-danger hover:shadow hover:bg-primary hover:text-background  transition-all"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSubmit(props.workId)}
                              className="px-3 py-2 ml-2 border rounded shadow-md text-secondary font-medium bg-primary hover:shadow hover:bg-secondary hover:text-primary  transition-all"
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      </Box>
                    </Modal>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default WorkProgressModal;
