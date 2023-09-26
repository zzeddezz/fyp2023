import React, { useState, useEffect, useMemo } from "react";
import DataTable from "react-data-table-component";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import axios from "axios";
import jwt from "jwt-decode";

// components
import Sidenav from "../../components/Sidenav";
import Footer from "../../components/Footer";
import { columns } from "../../components/Datatable/bookingColumns";
import BookingModal from "../../components/Modal/bookingModal";

// context
import { useSideNav } from "../../utils/resizeContext";

const FilterComponent = ({ filterText, onFilter }) => (
  <>
    <input
      className="border p-2 placeholder:text-sm rounded outline-0"
      id="search"
      type="search"
      placeholder="Filter By Name"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
  </>
);

function Booking() {
  const [value, setValue] = useState(
    localStorage.getItem("BselectedTab") || "1"
  );
  const [dataPending, setDataPending] = useState([]);
  const [dataReject, setDataReject] = useState([]);
  const [dataAccept, setDataAccept] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isOpen, toggleIsOpen } = useSideNav();
  const token = localStorage.getItem("token");
  const decodedUser = jwt(token);

  const serverURL = `${process.env.REACT_APP_API_URL}`;

  console.log(decodedUser);

  useEffect(() => {
    localStorage.setItem("BselectedTab", value);
    if (decodedUser.email == "admin@gmail.com") {
      getBooking();
    } else {
      getUserBooking();
    }
    setLoading(false);
  }, [value]);

  const getBooking = async () => {
    try {
      const response = await axios.get(`${serverURL}/booking/all`);
      console.log(response);
      setDataPending(
        response.data.filter(
          (item) => item.status === "Pending" || item.status === "pending"
        )
      );

      setDataReject(
        response.data.filter(
          (item) => item.status === "Reject" || item.status === "reject"
        )
      );

      setDataAccept(
        response.data.filter(
          (item) => item.status === "Accept" || item.status === "accept"
        )
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getUserBooking = async () => {
    try {
      const response = await axios.get(
        `${serverURL}/booking/user/${decodedUser.email}`
      );
      setDataPending(
        response.data.filter(
          (item) => item.status === "Pending" || item.status === "pending"
        )
      );

      setDataReject(
        response.data.filter(
          (item) => item.status === "Reject" || item.status === "reject"
        )
      );

      setDataAccept(
        response.data.filter(
          (item) => item.status === "Accept" || item.status === "accept"
        )
      );
    } catch (error) {}
  };

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filterItems = (data, filterText) =>
    data.filter(
      (item) =>
        item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
    );

  const filteredItemsPending = filterItems(dataPending, filterText);
  const filteredItemsReject = filterItems(dataReject, filterText);
  const filteredItemsAccept = filterItems(dataAccept, filterText);

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
            <h1 className="font-medium text-2xl mt-10">Booking</h1>
            <Box sx={{ width: "100%" }} className="mt-10">
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab
                      label="Pending"
                      value="1"
                      sx={{
                        fontWeight: 600,
                        fontSize: 13,
                        fontFamily: "Poppins",
                      }}
                    />
                    <Tab
                      label="Reject"
                      value="2"
                      sx={{
                        fontWeight: 600,
                        fontSize: 13,
                        fontFamily: "Poppins",
                      }}
                    />
                    <Tab
                      label="Accept"
                      value="3"
                      sx={{
                        fontWeight: 600,
                        fontSize: 13,
                        fontFamily: "Poppins",
                      }}
                    />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <div className="overflow-x-auto">
                    <DataTable
                      className="min-w-full"
                      columns={columns}
                      data={filteredItemsPending}
                      progressPending={loading}
                      pagination
                      paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                      subHeader
                      subHeaderComponent={subHeaderComponentMemo}
                      persistTableHead
                      pointerOnHover
                      onRowClicked={handleRowClick}
                      highlightOnHover
                    />
                  </div>
                  {isModalOpen && selectedRow && (
                    <BookingModal
                      open={isModalOpen}
                      onClose={closeModal}
                      clickClose={closeModal}
                      name={selectedRow.name}
                      email={selectedRow.email}
                      phone={selectedRow.phone}
                      status={selectedRow.status}
                      address={selectedRow.address}
                      bookingKey={selectedRow.bookingKey}
                      date={selectedRow.date}
                      bookingDate={selectedRow.bookingDate}
                      bookingId={selectedRow._id}
                    />
                  )}
                </TabPanel>

                {/* In Progress section */}
                <TabPanel value="2">
                  <div className="overflow-x-auto">
                    <DataTable
                      className="min-w-full"
                      columns={columns}
                      data={filteredItemsReject}
                      progressPending={loading}
                      pagination
                      paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                      subHeader
                      subHeaderComponent={subHeaderComponentMemo}
                      persistTableHead
                      pointerOnHover
                      onRowClicked={handleRowClick}
                      highlightOnHover
                    />
                  </div>
                  {isModalOpen && selectedRow && (
                    <BookingModal
                      open={isModalOpen}
                      onClose={closeModal}
                      clickClose={closeModal}
                      name={selectedRow.name}
                      email={selectedRow.email}
                      phone={selectedRow.phone}
                      status={selectedRow.status}
                      address={selectedRow.address}
                      bookingKey={selectedRow.bookingKey}
                      date={selectedRow.date}
                      bookingDate={selectedRow.bookingDate}
                      bookingId={selectedRow._id}
                    />
                  )}
                </TabPanel>

                {/* Accept section */}
                <TabPanel value="3">
                  <div className="overflow-x-auto">
                    <DataTable
                      className="min-w-full"
                      columns={columns}
                      data={filteredItemsAccept}
                      progressPending={loading}
                      pagination
                      paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                      subHeader
                      subHeaderComponent={subHeaderComponentMemo}
                      persistTableHead
                      pointerOnHover
                      onRowClicked={handleRowClick}
                      highlightOnHover
                    />
                  </div>
                  {isModalOpen && selectedRow && (
                    <BookingModal
                      open={isModalOpen}
                      onClose={closeModal}
                      clickClose={closeModal}
                      name={selectedRow.name}
                      email={selectedRow.email}
                      phone={selectedRow.phone}
                      status={selectedRow.status}
                      address={selectedRow.address}
                      bookingKey={selectedRow.bookingKey}
                      date={selectedRow.date}
                      bookingDate={selectedRow.bookingDate}
                      bookingId={selectedRow._id}
                    />
                  )}
                </TabPanel>
              </TabContext>
            </Box>
          </section>
          <div className="w-full">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
