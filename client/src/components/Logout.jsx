import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/userSlice";
import { Button, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LogoutIcon from "@mui/icons-material/Logout";
import { selectUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    user && (
      <Box>
        <Button
          style={{
            color: theme.palette.grey[500],
            padding: "0.1rem 0.1rem",
          }}
          onClick={handleLogout}
        >
          <LogoutIcon />
        </Button>
      </Box>
    )
  );
};

export default Logout;
