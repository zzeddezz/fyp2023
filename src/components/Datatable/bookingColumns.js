import dateFormat from "dateformat";
import jwt from "jwt-decode";

export const columns = [
  {
    name: "No.",
    cell: (row, index) => <div>{index + 1}</div>,
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
  },
  {
    name: "Phone",
    selector: (row) => row.phone,
    sortable: true,
  },
  {
    name: "Booking Date",
    selector: (row) => dateFormat(row.bookingDate, "mmmm dS, yyyy"),
    sortable: true,
  },
  {
    name: "Product Name",
    selector: (row) => row.productName,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
    conditionalCellStyles: [
      {
        when: (row) => row.status === "Pending",
        style: {
          color: "#facc15",
          fontWeight: 600,
        },
      },
      {
        when: (row) => row.status === "Reject",
        style: {
          color: "#dc2626",
          fontWeight: 600,
        },
      },
      {
        when: (row) => row.status === "Accept",
        style: {
          color: "#22c55e",
          fontWeight: 600,
        },
      },
    ],
  },
];
