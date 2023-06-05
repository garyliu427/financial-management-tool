import {
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BatchPredictionIcon from "@mui/icons-material/BatchPrediction";

const Sidebar = () => {
  const drawerWidth = 240;

  // State for controlling the sidebar visibility
  const navigate = useNavigate();

  return (
    <>
      {/* Sidebar */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            marginTop: "5.2rem",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* Content of the sidebar */}
        <Box>
          <Divider />
          <List>
            <ListItemButton onClick={() => navigate("/dashboard/default")}>
              <DashboardIcon
                sx={{
                  marginRight: "1.5rem",
                  marginLeft: "1rem",
                }}
              />
              <ListItemText primary="Default" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/dashboard/accounts")}>
              <ReceiptIcon sx={{ marginRight: "1.5rem", marginLeft: "1rem" }} />
              <ListItemText primary="Accounts" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/dashboard/predictions")}>
              <BatchPredictionIcon
                sx={{ marginRight: "1.5rem", marginLeft: "1rem" }}
              />
              <ListItemText primary="Predictions" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
