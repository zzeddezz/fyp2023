import React, { useState, useEffect, useMemo } from "react";
import Sidenav from "../../components/Sidenav";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import axios from "axios";
import DataTable from "react-data-table-component";
import BookingModal from "../../components/Modal/bookingModal";
import { columns } from "../../components/Datatable/bookingColumns";

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
  const [value, setValue] = useState("1");
  const [dataPending, setDataPending] = useState([]);
  const [dataReject, setDataReject] = useState([]);
  const [dataAccept, setDataAccept] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getBooking();
    setLoading(false);
  }, []);

  const getBooking = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/booking/all`);
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
    <div className="w-full flex min-h-screen justify-center">
      <div className="w-48 flex flex-col">
        <Sidenav />
      </div>
      <div className="flex-1 justify-center items-center">
        <div className="px-20 py-12">
          <h1 className="font-medium text-2xl text-primary">Booking</h1>

          <Box sx={{ width: "100%" }} className="mt-10">
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Pending" value="1" />
                  <Tab label="Reject" value="2" />
                  <Tab label="Accept" value="3" />
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

              {/* Done section */}
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
        </div>
      </div>
    </div>
  );
}

export default Booking;
