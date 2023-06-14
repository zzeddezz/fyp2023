import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBase/MDBox";
import MDTypography from "components/MDBase/MDTypography";
import MDProgress from "components/MDBase/MDProgress";

// ProductPage page components
import ProductCell from "layouts/ecommerce/products/product-page/components/ProductCell";
import ReviewCell from "layouts/ecommerce/products/product-page/components/ReviewCell";
import DefaultCell from "layouts/ecommerce/products/product-page/components/DefaultCell";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "components/MDComponents/LayoutContainers/DashboardLayout";
import DashboardNavbar from "components/MDComponents/Navbars/DashboardNavbar";
import Footer from "components/MDComponents/Footer";
import DataTable from "components/MDComponents/Tables/DataTable";

// ProductPage page components
import ProductImages from "layouts/ecommerce/products/product-page/components/ProductImages";
import ProductInfo from "layouts/ecommerce/products/product-page/components/ProductInfo";

// Data
// import dataTableData from "layouts/ecommerce/products/product-page/data/dataTableData";

// API
import { getProductsProductPage } from "util/APIHelper";

function ProductPage() {
  const [dataTableData, setDataTableData] = useState({
    columns: [],
    rows: [],
  });

  useEffect(() => {
    const runAsync = async () => {
      const dataTableDataResponse = await getProductsProductPage();
      const dataTableDataContent = {};
      dataTableDataContent.columns = dataTableDataResponse.data.message.columns;
      dataTableDataContent.rows = dataTableDataResponse.data.message.rows.map((content) => ({
        product: <ProductCell image={content.product.image} name={content.product.name} />,
        price: <DefaultCell>${content.price}</DefaultCell>,
        review: <ReviewCell rating={content.rating} />,
        availability: (
          <MDBox width={content.availability.width}>
            <MDProgress
              variant={content.availability.variant}
              value={content.availability.value}
              color={content.availability.color}
            />
          </MDBox>
        ),
        id: <DefaultCell>{content.id}</DefaultCell>,
      }));
      setDataTableData(dataTableDataContent);
    };
    runAsync();
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Card sx={{ overflow: "visible" }}>
          <MDBox p={3}>
            <MDBox mb={3}>
              <MDTypography variant="h5" fontWeight="medium">
                Product Details
              </MDTypography>
            </MDBox>

            <Grid container spacing={3}>
              <Grid item xs={12} lg={6} xl={5}>
                <ProductImages />
              </Grid>
              <Grid item xs={12} lg={5} sx={{ mx: "auto" }}>
                <ProductInfo />
              </Grid>
            </Grid>

            <MDBox mt={8} mb={2}>
              <MDBox mb={1} ml={2}>
                <MDTypography variant="h5" fontWeight="medium">
                  Other Products
                </MDTypography>
              </MDBox>
              <DataTable
                table={dataTableData}
                entriesPerPage={false}
                showTotalEntries={false}
                isSorted={false}
              />
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ProductPage;
