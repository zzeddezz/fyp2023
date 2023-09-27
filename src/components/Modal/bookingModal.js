import React, { useState } from "react";
import Box from "@mui/material/Box";
import dateFormat from "dateformat";
import Modal from "@mui/material/Modal";
import axios from "axios";
import jwt from "jwt-decode";

// icons
import CloseIcon from "@mui/icons-material/Close";

function BookingModal(props) {
  const [formData, setFormData] = useState(new FormData());
  const [reason, setReason] = useState("");
  const [isReject, setIsReject] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBookingDate, setNewBookingDate] = useState(props.bookingDate);
  const [isEdit, setIsEdit] = useState(false);
  const token = localStorage.getItem("token");
  const decodedUser = jwt(token);

  const handleSubmit = async (id, bookingDate) => {
    try {
      // console.log(id);

      if (isReject) {
        formData.set("reason", reason);
      }

      if (!isReject && props.status === "Pending") {
        formData.set("bookingDate", bookingDate);
        setIsModalOpen(false);
      }

      if (isEdit && props.status === "Reject") {
        console.log(id);
        formData.set("bookingDate", bookingDate);
        formData.set("status", "Accept");
      }

      const formDataObject = Object.fromEntries(formData.entries());
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/booking/${id}`,
        formDataObject
      );

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

            <form className="mt-10 text-sm" action="">
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
                      props.status === "Pending"
                        ? "text-yellow-inprogress font-semibold"
                        : props.status === "Reject"
                        ? "text-red-danger font-semibold"
                        : props.status === "Accept"
                        ? "text-green-success font-semibold"
                        : ""
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
                  {isEdit === false ? (
                    <p>{dateFormat(props.bookingDate, "mmmm dS, yyyy")}</p>
                  ) : (
                    <input
                      className="p-2 focus:outline-1 border rounded"
                      type="date"
                      name="newBookingDate"
                      value={dateFormat(newBookingDate, "yyyy-mm-dd")}
                      onChange={(e) => setNewBookingDate(e.target.value)}
                    />
                  )}
                </div>
              </div>

              {isReject ? (
                <div className="flex mt-4">
                  <div className="flex flex-col w-full">
                    <label className="text-text text-sm font-medium" htmlFor="">
                      Reason
                    </label>
                    <input
                      className="p-2 focus:outline-1 border rounded"
                      type="text"
                      name="reason"
                      value={reason}
                      onChange={(e) => {
                        setReason(e.target.value);
                      }}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}

              {/* button section */}
              <div className="flex justify-end mt-5">
                <div className="flex justify-end mt-5">
                  {!isReject &&
                  decodedUser.email === "admin@gmail.com" &&
                  props.status === "Pending" ? (
                    <>
                      <button
                        type="button"
                        className="px-3 py-2 mr-2 border rounded shadow-md bg hover:bg-red-danger text-primary font-medium hover:shadow hover:bg-primary hover:text-background  transition-all"
                        onClick={() => setIsReject(true)}
                      >
                        Reject
                      </button>
                      <button
                        type="button"
                        className="px-3 py-2 ml-2 border rounded shadow-md bg-primary text-secondary font-medium hover:shadow hover:bg-secondary hover:text-primary transition-all"
                        onClick={() =>
                          handleSubmit(props.bookingId, props.bookingDate)
                        }
                      >
                        Accept
                      </button>
                    </>
                  ) : isReject &&
                    decodedUser.email === "admin@gmail.com" &&
                    props.status === "Pending" ? (
                    <>
                      <button
                        type="button"
                        className="px-3 py-2 mr-2 border rounded shadow-md font-medium hover:bg-red-danger hover:shadow hover:bg-primary hover:text-background  transition-all"
                        onClick={props.clickClose}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="px-3 py-2 ml-2 border rounded shadow-md text-secondary font-medium bg-primary hover:shadow hover:bg-secondary hover:text-primary  transition-all"
                        onClick={() => handleSubmit(props.bookingId)}
                      >
                        Submit
                      </button>
                    </>
                  ) : !isEdit &&
                    decodedUser.email === "admin@gmail.com" &&
                    props.status === "Reject" ? (
                    <button
                      type="button"
                      className="px-3 py-2 ml-2 border rounded shadow-md bg-primary  text-secondary font-medium hover:shadow hover:bg-secondary hover:text-primary transition-all"
                      onClick={() => setIsEdit(true)}
                    >
                      Edit
                    </button>
                  ) : isEdit &&
                    decodedUser.email === "admin@gmail.com" &&
                    props.status === "Reject" ? (
                    <>
                      <button
                        type="button"
                        className="px-3 py-2 mr-2 border rounded shadow-md bg hover:bg-red-danger hover:shadow hover:bg-primary hover:text-background  transition-all"
                        onClick={props.clickClose}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="px-3 py-2 ml-2 border rounded shadow-md bg-secondary hover:shadow hover:bg-primary hover:text-background  transition-all"
                        onClick={() =>
                          handleSubmit(props.bookingId, newBookingDate)
                        }
                      >
                        Submit
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            </form>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default BookingModal;
