import { useState, useEffect } from "react";

// @mui material components teer
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBase/MDBox";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "components/MDComponents/LayoutContainers/DashboardLayout";
import DashboardNavbar from "components/MDComponents/Navbars/DashboardNavbar";
import Footer from "components/MDComponents/Footer";
import TimelineList from "components/MDComponents/Timeline/TimelineList";
import TimelineItem from "components/MDComponents/Timeline/TimelineItem";

// Data
// import timelineData from "layouts/pages/projects/timeline/data/timelineData";

// API
import { getProjectsTimeline } from "util/APIHelper";

function Timeline() {
  const [timelineData, setTimelineData] = useState([]);

  useEffect(() => {
    const runAsync = async () => {
      const timelineDataResponse = await getProjectsTimeline();
      setTimelineData(timelineDataResponse.data.message);
    };
    runAsync();
  }, []);

  const renderTimelineItems = timelineData.map(
    ({ color, icon, title, dateTime, description, badges, lastItem }) => (
      <TimelineItem
        key={title + color}
        color={color}
        icon={icon}
        title={title}
        dateTime={dateTime}
        description={description}
        badges={badges}
        lastItem={lastItem}
      />
    )
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox my={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <TimelineList title="Timeline with dotted line">{renderTimelineItems}</TimelineList>
          </Grid>
          <Grid item xs={12} lg={6}>
            <TimelineList title="Timeline with dotted line" dark>
              {renderTimelineItems}
            </TimelineList>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Timeline;
