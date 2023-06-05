import { useNavigate } from "react-router-dom";
import { Avatar, Box, Divider, Typography } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { selectUser, logout } from "../../src/features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const AuthedNavbar = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    navigate("/login"); // Redirect to the login page or any other desired page
  };

  return (
    <>
      {user && (
        <>
          <Box
            display="flex"
            alignItems="center"
            paddingLeft="1rem"
            paddingTop="1rem"
            paddingBottom="1rem"
            sx={{
              backgroundColor: "#ffffff",
              position: "fixed",
              width: "100%",
              zIndex: 1,
            }}
          >
            <AccountBalanceWalletIcon
              sx={{ fontSize: "40px", marginLeft: "1rem" }}
            />
            <Typography variant="h4" fontSize="20px" marginLeft="1rem">
              BudgetWise
            </Typography>
            <Box
              display="flex"
              marginLeft="auto"
              alignItems="center"
              marginRight="2rem"
            >
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  backgroundColor: "#e1e5e8",
                  borderRadius: "30px",
                  paddingTop: "0.5rem",
                  paddingBottom: "0.5rem",
                }}
              >
                <Avatar sx={{ marginLeft: "1rem", width: 35, height: 35 }} />
                <SettingsIcon
                  sx={{ marginRight: "1rem", marginLeft: "1rem" }}
                />
              </Box>
              <LogoutIcon
                onClick={handleLogout}
                sx={{
                  marginLeft: "1rem",
                  cursor: "pointer",
                }}
              />
            </Box>
          </Box>
          <Divider />
        </>
      )}
    </>
  );
};

export default AuthedNavbar;
