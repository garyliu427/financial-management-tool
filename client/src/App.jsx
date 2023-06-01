import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { themeOptions } from "./theme";
import { Box, CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../src/components/Navbar";
import Hero from "../src/components/Hero";
import Register from "../src/components/Register";
import Login from "../src/components/Login";
import Accounts from "./pages/Accounts";
import Default from "./pages/Default";

function App() {
  const theme = useMemo(() => createTheme(themeOptions), []);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" height="100%">
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <>
                    <Navbar />
                    <Hero />
                  </>
                }
              />
              <Route path="/dashboard/default" element={<Default />} />
              <Route path="/dashboard/accounts" element={<Accounts />} />
              <Route path="/predictions" element={<div>prediections</div>} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
