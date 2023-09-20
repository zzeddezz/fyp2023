/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        "rm-nav": "calc(100vh - 64px)",
      },
      width: {
        "custom-50": "32rem",
      },
    },
    colors: {
      primary: "#745bb9",
      secondary: "#e4dff1",
      background: "#ffffff",
      "background-success": "#f0fdf4",
      text: "#0a0812",
      accent: "#664baf",
      "gray-1": "#f8fafc",
      "gray-2": "#4b5563",
      "red-danger": "#dc2626",
      "green-success": "#22c55e",
      "yellow-inprogress": "#facc15",
    },
  },
  plugins: [],
};
