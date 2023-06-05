import { Box } from "@mui/material";
import Row1 from "./Row1";
import Row2 from "./Row2";
import Row3 from "./Row3";
import Sidebar from "../components/Sidebar";
import AuthedNavbar from "../components/AuthedNavbar";

const gridTemplateLargeScreens = `
  "a b c"
  "a b c"
  "a b c"
  "a b f"
  "d e f"
  "d e f"
  "d h i"
  "g h i"
  "g h j"
  "g h j"
`;

const Dashboard = () => {
  return (
    <>
      <AuthedNavbar />
      <Sidebar />
      <Box
        marginLeft="16rem"
        display="grid"
        gap="0.5rem"
        marginTop="1rem"
        sx={{
          gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
          gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
          gridTemplateAreas: gridTemplateLargeScreens,
        }}
      >
        <Row1 />
        <Row2 />
        <Row3 />
      </Box>
    </>
  );
};

export default Dashboard;
