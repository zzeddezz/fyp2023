import React, { useState, useEffect, useMemo } from "react";
import Sidenav from "../../components/Sidenav";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import DataTable from "react-data-table-component";
import { columns } from "../../components/Datatable/workColumn";
import axios from "axios";

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
  const [value, setValue] = useState("1");
  const [loading, setLoading] = useState(false);
  const [dataProgress, setDataProgress] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getBooking();
  }, []);

  const getBooking = async () => {
    try {
      const response = await axios.get("https://us-central1-booking-system-fyp.cloudfunctions.net/server/work/all");
      setDataProgress(
        response.data.filter(
          (item) =>
            item.workStatus === "In Progress" ||
            item.workStatus === "in progress"
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
  };

  const filterItems = (data, filterText) =>
    data.filter(
      (item) =>
        item.workStatus &&
        item.workStatus.toLowerCase().includes(filterText.toLowerCase())
    );

  const filteredItemsProgress = filterItems(dataProgress, filterText);

  return (
    <div className="w-full flex min-h-screen justify-center">
      <div className="w-48 flex flex-col">
        <Sidenav />
      </div>
      <div className="flex-1 justify-center items-center">
        <div className="px-20 py-12">
          <h1 className="font-medium text-2xl text-primary">Work Progress</h1>

          {dataProgress.length > 0 ? (
            <Box sx={{ width: "100%" }} className="mt-10">
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList onChange={handleChange}>
                    <Tab label="In Progress" value="1" />
                    <Tab label="Done" value="2" />
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
                </TabPanel>

                {/* Done section */}
                <TabPanel value="2">
                  <div className="overflow-x-auto"></div>
                </TabPanel>
              </TabContext>
            </Box>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default WorkProgress;
