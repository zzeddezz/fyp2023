import dateFormat from "dateformat";

export const columns = [
  {
    name: "No.",
    cell: (row, index) => <div>{index + 1}</div>,
  },
  {
    name: "Name",
    selector: (row) => row.booking.name,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.booking.email,
    sortable: true,
  },
  {
    name: "Phone",
    selector: (row) => row.booking.phone,
    sortable: true,
  },
  {
    name: "Start Date",
    selector: (row) => dateFormat(row.startDate, "mmmm dS, yyyy"),
    sortable: true,
  },
  {
    name: "Product Name",
    selector: (row) => row.booking.productName,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.workStatus,
    sortable: true,
    conditionalCellStyles: [
      {
        when: (row) => row.workStatus === "In Progress",
        style: {
          color: "#facc15",
          fontWeight: 600,
        },
      },
      {
        when: (row) => row.workStatus === "Done",
        style: {
          color: "#22c55e",
          fontWeight: 600,
        },
      },
    ],
  },
];
