import { useMemo, useState, useEffect } from "react";

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

// Widgets page components
import Steps from "layouts/pages/widgets/components/Steps";
import FullBody from "layouts/pages/widgets/components/FullBody";
import MediaPlayer from "layouts/pages/widgets/components/MediaPlayer";
import OrdersOverview from "layouts/pages/widgets/components/OrdersOverview";
import UpcomingEvents from "layouts/pages/widgets/components/UpcomingEvents";
import Chart from "layouts/pages/widgets/components/Chart";

// Data
// import progressLineChartData from "layouts/pages/widgets/data/progressLineChartData";
// import calendarEventsData from "layouts/pages/widgets/data/calendarEventsData";
// import categoriesListData from "layouts/pages/widgets/data/categoriesListData";
// import caloriesChartData from "layouts/pages/widgets/data/caloriesChartData";

// API
import {
  getWidgetTasks,
  getWidgetsCalories,
  getWidgetCalendar,
  getWidgetsCategories,
} from "util/APIHelper";

function Widgets() {
  const [lights, setLights] = useState(false);
  const [progressLineChartData, setProgressLineChartData] = useState({});
  const [calendarEventsData, setCalendarEventsData] = useState([]);
  const [categoriesListData, setCategoriesListData] = useState([]);
  const [caloriesChartData, setCaloriesChartData] = useState({
    labels: [],
    datasets: [],
  });

  const handleSetLights = () => setLights(!lights);

  useEffect(() => {
    const runAsync = async () => {
      const progressLineChartDataResponse = await getWidgetTasks();
      setProgressLineChartData(progressLineChartDataResponse.data.message);
      const calendarEventsDataResponse = await getWidgetCalendar();
      setCalendarEventsData(calendarEventsDataResponse.data.message);
      const caloriesChartDataResponse = await getWidgetsCalories();
      setCaloriesChartData(caloriesChartDataResponse.data.message);

      const categoriesListDataResponse = await getWidgetsCategories();
      const categoriesListDataContent = categoriesListDataResponse.data.message.map((content) => ({
        color: content.color,
        icon: content.icon,
        name: content.name,
        description: (
          <>
            {content.description.content}
            <MDTypography
              variant={content.description.typography.variant}
              color={content.description.typography.color}
              fontWeight={content.description.typography.fontWeight}
            >
              {content.description.typography.content}
            </MDTypography>
          </>
        ),
        route: content.route,
      }));
      setCategoriesListData(categoriesListDataContent);
    };
    runAsync();
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
                title="Tasks"
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
                  title={{ text: "battery health" }}
                  count="99 %"
                  icon={{ color: "info", component: "battery_charging_full" }}
                  direction="left"
                />
              </MDBox>
              <MiniStatisticsCard
                title={{ text: "music volume" }}
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
                  title="salary"
                  description="Belong Interactive"
                  value="+$2000"
                />
              </MDBox>
              <MDBox width="100%">
                <DefaultInfoCard
                  icon="paypal"
                  title="paypal"
                  description="Freelance Payment"
                  value="$455.00"
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} lg={4}>
              <MasterCard number={4562112245947852} holder="jack peterson" expires="11/22" />
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
                title="Lights"
                onChange={handleSetLights}
              />
            </Grid>
            <Grid item xs={12} lg={3}>
              <Chart
                title="calories"
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
                      m
                    </MDTypography>
                  </>
                }
                description="New York City"
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
                  header={{ title: "calendar", date: "Monday, 2021" }}
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
              <CategoriesList title="categories" categories={categoriesListData} />
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

export default Widgets;
