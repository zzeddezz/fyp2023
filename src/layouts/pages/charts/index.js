import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBase/MDBox";
import MDTypography from "components/MDBase/MDTypography";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "components/MDComponents/LayoutContainers/DashboardLayout";
import DashboardNavbar from "components/MDComponents/Navbars/DashboardNavbar";
import Footer from "components/MDComponents/Footer";
import DefaultLineChart from "components/MDComponents/Charts/LineCharts/DefaultLineChart";
import GradientLineChart from "components/MDComponents/Charts/LineCharts/GradientLineChart";
import VerticalBarChart from "components/MDComponents/Charts/BarCharts/VerticalBarChart";
import HorizontalBarChart from "components/MDComponents/Charts/BarCharts/HorizontalBarChart";
import MixedChart from "components/MDComponents/Charts/MixedChart";
import BubbleChart from "components/MDComponents/Charts/BubbleChart";
import DefaultDoughnutChart from "components/MDComponents/Charts/DoughnutCharts/DefaultDoughnutChart";
import PieChart from "components/MDComponents/Charts/PieChart";
import RadarChart from "components/MDComponents/Charts/RadarChart";
import PolarChart from "components/MDComponents/Charts/PolarChart";

// Data
// import defaultLineChartData from "layouts/pages/charts/data/defaultLineChartData";
// import gradientLineChartData from "layouts/pages/charts/data/gradientLineChartData";
// import verticalBarChartData from "layouts/pages/charts/data/verticalBarChartData";
// import horizontalBarChartData from "layouts/pages/charts/data/horizontalBarChartData";
// import mixedChartData from "layouts/pages/charts/data/mixedChartData";
// import bubbleChartData from "layouts/pages/charts/data/bubbleChartData";
// import defaultDoughnutChartData from "layouts/pages/charts/data/defaultDoughnutChartData";
// import pieChartData from "layouts/pages/charts/data/pieChartData";
// import radarChartData from "layouts/pages/charts/data/radarChartData";
// import polarChartData from "layouts/pages/charts/data/polarChartData";

// API
import {
  getChartsLine,
  getChartsLineGradient,
  getChartsBar,
  getChartsBarHorizontal,
  getChartsMixed,
  getChartsBubble,
  getChartsDoughnut,
  getChartsPie,
  getChartsRadar,
  getChartsPolar,
} from "util/APIHelper";

function Charts() {
  const [lineData, setLineData] = useState({});
  const [lineGradientData, setLineGradientData] = useState({});
  const [barData, setBarData] = useState({});
  const [barHorizontalData, setBarHorizontalData] = useState({});
  const [mixedData, setMixedData] = useState({});
  const [bubbleData, setBubbleData] = useState({});
  const [doughnutData, setDoughnutData] = useState({});
  const [pieData, setPieData] = useState({});
  const [radarData, setRadarData] = useState({});
  const [polarData, setPolarData] = useState({});

  useEffect(() => {
    const runAsync = async () => {
      const lineResponse = await getChartsLine();
      setLineData(lineResponse.data.message);

      const lineGradientReponse = await getChartsLineGradient();
      setLineGradientData(lineGradientReponse.data.message);

      const barResponse = await getChartsBar();
      setBarData(barResponse.data.message);

      const barHorizontalResponse = await getChartsBarHorizontal();
      setBarHorizontalData(barHorizontalResponse.data.message);

      const mixedResponse = await getChartsMixed();
      setMixedData(mixedResponse.data.message);

      const bubbleResponse = await getChartsBubble();
      setBubbleData(bubbleResponse.data.message);

      const doughnutResponse = await getChartsDoughnut();
      setDoughnutData(doughnutResponse.data.message);

      const pieResponse = await getChartsPie();
      setPieData(pieResponse.data.message);

      const radarResponse = await getChartsRadar();
      setRadarData(radarResponse.data.message);

      const polarResponse = await getChartsPolar();
      setPolarData(polarResponse.data.message);
    };
    runAsync();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox my={3}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} sx={{ lineHeight: 0 }}>
              <MDTypography variant="h5">Charts</MDTypography>
              <MDTypography variant="button" color="text">
                Charts on this page use Chart.js - Simple yet flexible JavaScript charting for
                designers & developers.
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <DefaultLineChart
                icon={{ component: "insights" }}
                title="Line chart"
                height="20rem"
                description="Product insights"
                chart={lineData}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <GradientLineChart
                icon={{ component: "show_chart" }}
                title="Line chart with gradient"
                height="20rem"
                description="Visits from devices"
                chart={lineGradientData}
              />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <VerticalBarChart
                icon={{ color: "dark", component: "leaderboard" }}
                title="Bar chart"
                height="20rem"
                description="Sales related to age average"
                chart={barData}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <HorizontalBarChart
                icon={{ color: "dark", component: "splitscreen" }}
                title="Bar chart horizontal"
                height="20rem"
                description="Sales related to age average"
                chart={barHorizontalData}
              />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <MixedChart
                icon={{ color: "primary", component: "auto_graph" }}
                title="Mixed chart"
                height="20rem"
                description="Analytics Insights"
                chart={mixedData}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <BubbleChart
                icon={{ color: "primary", component: "multiline_chart" }}
                title="Bubble chart"
                height="20rem"
                description="Users divided by regions"
                chart={bubbleData}
              />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <DefaultDoughnutChart
                icon={{ color: "success", component: "donut_small" }}
                title="Doughnut chart"
                height="20rem"
                description="Affiliates program"
                chart={doughnutData}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <PieChart
                icon={{ color: "success", component: "donut_small" }}
                title="Pie chart"
                height="20rem"
                description="Analytics Insights"
                chart={pieData}
              />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <RadarChart
                icon={{ color: "warning", component: "data_saver_on" }}
                title="Radar chart"
                height="32rem"
                description="Sciences score"
                chart={radarData}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <PolarChart
                icon={{ color: "warning", component: "scatter_plot" }}
                title="Polar chart"
                height="32rem"
                description="Analytics Insights"
                chart={polarData}
              />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Charts;
