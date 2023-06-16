import { useState, useEffect, useMemo } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBase/MDBox";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "components/MDComponents/LayoutContainers/DashboardLayout";
import DashboardNavbar from "components/MDComponents/Navbars/DashboardNavbar";
import Footer from "components/MDComponents/Footer";
import EventCalendar from "components/MDComponents/Calendar";

// Calendar application components
import Header from "layouts/applications/calendar/components/Header";
import NextEvents from "layouts/applications/calendar/components/NextEvents";
import ProductivityChart from "layouts/applications/calendar/components/ProductivityChart";

// Data
// import calendarEventsData from "layouts/applications/calendar/data/calendarEventsData";

// API
import { getAppCalendar } from "util/APIHelper";

function Calendar() {
  const [calendarEventsData, setCalendarEventsData] = useState([]);

  useEffect(() => {
    const runAsync = async () => {
      const calendarEventsDataResponse = await getAppCalendar();
      setCalendarEventsData(calendarEventsDataResponse.data.message);
    };
    runAsync();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={3}>
        <MDBox display="flex" justifyContent="flex-end" mt={1} mb={4} mx={2}>
          <Header />
        </MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12} xl={9} sx={{ height: "max-content" }}>
            {useMemo(
              () => (
                <EventCalendar
                  initialView="dayGridMonth"
                  initialDate="2021-08-10"
                  events={calendarEventsData}
                  selectable
                  editable
                />
              ),
              [calendarEventsData]
            )}
          </Grid>
          <Grid item xs={12} xl={3}>
            <MDBox mb={3}>
              <NextEvents />
            </MDBox>
            <MDBox mb={3}>
              <ProductivityChart />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Calendar;
