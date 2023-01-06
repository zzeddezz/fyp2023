// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBase/MDBox";
import MDTypography from "components/MDBase/MDTypography";
import MDAvatar from "components/MDBase/MDAvatar";

function ProductCell({ image, name, orders }) {
  return (
    <MDBox display="flex" alignItems="center" pr={2}>
      <MDBox mr={2}>
        <MDAvatar src={image} alt={name} />
      </MDBox>
      <MDBox display="flex" flexDirection="column">
        <MDTypography variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="button" fontWeight="regular" color="secondary">
          <MDTypography component="span" variant="button" fontWeight="regular" color="success">
            {orders}
          </MDTypography>{" "}
          orders
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

// Typechecking props for the ProductCell
ProductCell.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  orders: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default ProductCell;
