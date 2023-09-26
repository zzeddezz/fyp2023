import React, { useState, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import DataTable from "react-data-table-component";
import { columns } from "../../components/Datatable/workColumn";
import axios from "axios";

// components
import Sidenav from "../../components/Sidenav";
import Footer from "../../components/Footer";
import WorkProgressModal from "../../components/Modal/workProgressModal";

// context
import { useSideNav } from "../../utils/resizeContext";

// search box
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

function WorkProgress() {
  const { isOpen, toggleIsOpen } = useSideNav();

  const [value, setValue] = useState(
    localStorage.getItem("WselectedTab") || "1"
  );
  const [loading, setLoading] = useState(false);
  const [dataProgress, setDataProgress] = useState([]);
  const [dataDone, setDataDone] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("WselectedTab", value);
    getBooking();
  }, [value]);

  const getBooking = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/work/all`);
      setDataProgress(
        response.data.filter(
          (item) =>
            item.workStatus === "In Progress" ||
            item.workStatus === "in progress"
        )
      );

      setDataDone(
        response.data.filter(
          (item) => item.workStatus === "Done" || item.workStatus === "done"
        )
      );
      console.log(response.data);
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
    console.log(newValue);
  };

  const filterItems = (data, filterText) =>
    data.filter(
      (item) =>
        item.booking.name &&
        item.booking.name.toLowerCase().includes(filterText.toLowerCase())
    );

  const filteredItemsProgress = filterItems(dataProgress, filterText);
  const filteredItemsDone = filterItems(dataDone, filterText);
  console.log(dataProgress);

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
            <h1 className="font-medium text-2xl mt-10">Work Progress</h1>

            <Box sx={{ width: "100%" }} className="mt-10">
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList onChange={handleChange} textColor="#745bb9">
                    <Tab
                      label="In Progress"
                      value="1"
                      sx={{
                        fontWeight: 600,
                        fontSize: 13,
                        fontFamily: "Poppins",
                      }}
                    />
                    <Tab
                      label="Done"
                      value="2"
                      sx={{
                        fontWeight: 600,
                        fontSize: 13,
                        fontFamily: "Poppins",
                      }}
                    />
                  </TabList>
                </Box>
                {/* In Progress section */}
                <TabPanel value="1">
                  <div className="overflow-x-auto">
                    <DataTable
                      className="min-w-full"
                      columns={columns}
                      data={filteredItemsProgress}
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
                    <WorkProgressModal
                      open={isModalOpen}
                      onClose={closeModal}
                      clickClose={closeModal}
                      product={selectedRow.booking.productName}
                      name={selectedRow.booking.name}
                      email={selectedRow.booking.email}
                      phone={selectedRow.booking.phone}
                      status={selectedRow.workStatus}
                      address={selectedRow.booking.address}
                      bookingKey={selectedRow.booking.bookingKey}
                      date={selectedRow.date}
                      bookingDate={selectedRow.bookingDate}
                      workId={selectedRow._id}
                    />
                  )}
                </TabPanel>

                {/* Done section */}
                <TabPanel value="2">
                  <div className="overflow-x-auto">
                    <DataTable
                      className="min-w-full"
                      columns={columns}
                      data={filteredItemsDone}
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
                    <WorkProgressModal
                      open={isModalOpen}
                      onClose={closeModal}
                      clickClose={closeModal}
                      product={selectedRow.booking.productName}
                      name={selectedRow.booking.name}
                      email={selectedRow.booking.email}
                      phone={selectedRow.booking.phone}
                      status={selectedRow.workStatus}
                      address={selectedRow.booking.address}
                      bookingKey={selectedRow.booking.bookingKey}
                      date={selectedRow.date}
                      bookingDate={selectedRow.bookingDate}
                      workId={selectedRow._id}
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

export default WorkProgress;
