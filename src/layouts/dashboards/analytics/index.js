import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBase/MDBox";
import MDTypography from "components/MDBase/MDTypography";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "components/MDComponents/LayoutContainers/DashboardLayout";
import DashboardNavbar from "components/MDComponents/Navbars/DashboardNavbar";
import Footer from "components/MDComponents/Footer";
import ReportsBarChart from "components/MDComponents/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "components/MDComponents/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "components/MDComponents/Cards/StatisticsCards/ComplexStatisticsCard";
import BookingCard from "components/MDComponents/Cards/BookingCard";

// Anaytics dashboard components
import SalesByCountry from "layouts/dashboards/analytics/components/SalesByCountry";

// Data
// import reportsBarChartData from "layouts/dashboards/analytics/data/reportsBarChartData";
// import reportsLineChartData from "layouts/dashboards/analytics/data/reportsLineChartData";

// Images
import booking1 from "assets/images/products/acp.jpg";
import booking2 from "assets/images/products/poly.jpg";
import booking3 from "assets/images/products/metal deck.jpeg";

// API
import {
  getAnalyticsWebsiteViews,
  getAnalyticsDailySales,
  getAnalyticsCompletedTasks,
} from "util/APIHelper";

function Analytics() {
  // const { sales, tasks } = reportsLineChartData;
  const [websiteData, setWebsiteData] = useState({});
  const [salesData, setSalesData] = useState({});
  const [tasksData, setTasksData] = useState({});

  useEffect(() => {
    const runAsync = async () => {
      const websiteResponse = await getAnalyticsWebsiteViews();
      setWebsiteData(websiteResponse.data.message);

      const salesResponse = await getAnalyticsDailySales();
      setSalesData(salesResponse.data.message);

      const tasksResponse = await getAnalyticsCompletedTasks();
      setTasksData(tasksResponse.data.message);
    };
    runAsync();
  }, []);

  // Action buttons for the BookingCard
  const actionButtons = (
    <>
      <Tooltip title="Refresh" placement="bottom">
        <MDTypography
          variant="body1"
          color="primary"
          lineHeight={1}
          sx={{ cursor: "pointer", mx: 3 }}
        >
          <Icon color="inherit">refresh</Icon>
        </MDTypography>
      </Tooltip>
      <Tooltip title="Edit" placement="bottom">
        <MDTypography variant="body1" color="info" lineHeight={1} sx={{ cursor: "pointer", mx: 3 }}>
          <Icon color="inherit">edit</Icon>
        </MDTypography>
      </Tooltip>
    </>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container>
          <SalesByCountry />
        </Grid>
        <MDBox mt={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={websiteData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={salesData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasksData}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={1.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="dark"
                  icon="weekend"
                  title="Bookings"
                  count={281}
                  percentage={{
                    color: "success",
                    amount: "+55%",
                    label: "than lask week",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  icon="leaderboard"
                  title="Today's Users"
                  count="2,300"
                  percentage={{
                    color: "success",
                    amount: "+3%",
                    label: "than last month",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="success"
                  icon="store"
                  title="Revenue"
                  count="34k"
                  percentage={{
                    color: "success",
                    amount: "+1%",
                    label: "than yesterday",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="primary"
                  icon="person_add"
                  title="Followers"
                  count="+91"
                  percentage={{
                    color: "success",
                    amount: "",
                    label: "Just updated",
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mt={3}>
                <BookingCard
                  image={booking1}
                  title="Awning Aluminium Composite Panel"
                  description="The place perfect awning for your home."
                  price="$ starting at RM 22 persqft"
                  action={actionButtons}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mt={3}>
                <BookingCard
                  image={booking2}
                  title="Awning Polycarbonate "
                  description="Polycarbonate is translucent, perfect for natural light."
                  price="$ starting at RM 25 persqft"
                  action={actionButtons}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mt={3}>
                <BookingCard
                  image={booking3}
                  title="Awning metal deck"
                  description="Metal metarial is strong and inexpensive. good for kitchen area."
                  price="$ starting at RM 19 persqft"
                  action={actionButtons}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Analytics;
