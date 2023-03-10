import { useEffect, useMemo, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBase/MDBox";
import MDTypography from "components/MDBase/MDTypography";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "components/MDComponents/LayoutContainers/DashboardLayout";
import DashboardNavbar from "components/MDComponents/Navbars/DashboardNavbar";
import Footer from "components/MDComponents/Footer";
import MiniStatisticsCard from "components/MDComponents/Cards/StatisticsCards/MiniStatisticsCard";
import ProgressLineChart from "components/MDComponents/Charts/LineCharts/ProgressLineChart";
import DefaultInfoCard from "components/MDComponents/Cards/InfoCards/DefaultInfoCard";
import MasterCard from "components/MDComponents/Cards/MasterCard";
import MiniInfoCard from "components/MDComponents/Cards/InfoCards/MiniInfoCard";
import ControllerCard from "components/MDComponents/Cards/ControllerCard";
import Calendar from "components/MDComponents/Calendar";
import CategoriesList from "components/MDComponents/Lists/CategoriesList";

// RTL page components
import Steps from "layouts/pages/rtl/components/Steps";
import FullBody from "layouts/pages/rtl/components/FullBody";
import MediaPlayer from "layouts/pages/rtl/components/MediaPlayer";
import OrdersOverview from "layouts/pages/rtl/components/OrdersOverview";
import UpcomingEvents from "layouts/pages/rtl/components/UpcomingEvents";
import Chart from "layouts/pages/rtl/components/Chart";

// Data
import progressLineChartData from "layouts/pages/rtl/data/progressLineChartData";
import calendarEventsData from "layouts/pages/rtl/data/calendarEventsData";
import categoriesListData from "layouts/pages/rtl/data/categoriesListData";
import caloriesChartData from "layouts/pages/rtl/data/caloriesChartData";

// Material Dashboard 2 PRO React contexts
import { useMaterialUIController, setDirection } from "context/md";

function RTL() {
  const [, dispatch] = useMaterialUIController();
  const [lights, setLights] = useState(false);

  const handleSetLights = () => setLights(!lights);

  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");

    return () => setDirection(dispatch, "ltr");
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox my={3}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
              <UpcomingEvents />
            </Grid>
            <Grid item xs={12} lg={8}>
              <ProgressLineChart
                icon="date_range"
                title="????????"
                count={480}
                progress={60}
                height="13.375rem"
                chart={progressLineChartData}
              />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={3}>
                <MiniStatisticsCard
                  title={{ text: "?????? ????????????????" }}
                  count="99 %"
                  icon={{ color: "info", component: "battery_charging_full" }}
                  direction="left"
                />
              </MDBox>
              <MiniStatisticsCard
                title={{ text: "???????? ?????? ????????????????" }}
                count="15/100"
                icon={{ color: "info", component: "volume_down" }}
                direction="left"
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={3}
              lg={5}
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
            >
              <MDBox width="100%" mr={{ xs: 0, sm: 3 }} mb={{ xs: 3, sm: 0 }}>
                <DefaultInfoCard
                  icon="account_balance"
                  title="????????"
                  description="?????????? ??????????????????"
                  value="+$2000"
                />
              </MDBox>
              <MDBox width="100%">
                <DefaultInfoCard
                  icon="paypal"
                  title="?????? ??????"
                  description="?????? ?????????????? ??????????"
                  value="$455.00"
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} lg={4}>
              <MasterCard number={4562112245947852} holder="?????? ??????????????" expires="11/22" />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <FullBody />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <ControllerCard
                state={lights}
                icon={
                  <Icon className={lights ? "text-white" : "text-dark"} fontSize="large">
                    lightbulb
                  </Icon>
                }
                title="???????? ??????????"
                onChange={handleSetLights}
              />
            </Grid>
            <Grid item xs={12} lg={3}>
              <Chart
                title="?????????? ????????????"
                count={97}
                percentage={{ color: "success", label: "+5%" }}
                chart={caloriesChartData}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <MiniInfoCard
                icon="shortcut"
                title={
                  <>
                    754&nbsp;
                    <MDTypography variant="button" color="secondary" fontWeight="medium">
                      ??
                    </MDTypography>
                  </>
                }
                description="?????????? ??????????????"
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <Steps />
            </Grid>
          </Grid>
        </MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={5}>
            {useMemo(
              () => (
                <Calendar
                  header={{ title: "??????????", date: "Monday, 2021" }}
                  headerToolbar={false}
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
          <Grid item xs={12} lg={3}>
            <MDBox mb={3}>
              <CategoriesList title="????????" categories={categoriesListData} />
            </MDBox>
            <MediaPlayer />
          </Grid>
          <Grid item xs={12} lg={4}>
            <OrdersOverview />
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default RTL;
