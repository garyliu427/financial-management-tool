import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { themeOptions } from "./theme";
import { Box, CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../src/components/Navbar";
import Hero from "../src/components/Hero";
import Register from "../src/components/Register";
import Login from "../src/components/Login";
import Accounts from "./pages/Accounts";
import Default from "./pages/Default";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

function App() {
  const theme = useMemo(() => createTheme(themeOptions), []);
  const user = useSelector(selectUser);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" height="100%">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Navbar />
                    {user ? (
                      <Navigate to="/dashboard/default" replace />
                    ) : (
                      <Hero />
                    )}
                  </>
                }
              />
              <Route path="/dashboard/default" element={<Default />} />
              <Route path="/dashboard/accounts" element={<Accounts />} />
              <Route path="/predictions" element={<div>predictions</div>} />
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
