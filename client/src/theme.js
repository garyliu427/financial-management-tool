import { createTheme } from "@mui/material/styles";

export const themeOptions = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#3f51b5",
      dark: "#091f3d",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#f5f7fb",
    },
    success: {
      main: "#2da58e",
      light: "#e7f4f1",
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    fontSize: 14,
    h1: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 56,
      fontWeight: 700,
    },
    h2: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 32,
      fontWeight: 600,
    },
    h3: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 20,
      fontWeight: 500,
    },
    h4: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 18,
      fontWeight: 400,
    },
    h5: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 14,
      fontWeight: 300,
    },
    h6: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      fontWeight: 700,
    },
  },
});
