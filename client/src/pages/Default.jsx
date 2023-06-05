import { Box } from "@mui/material";
import Row1 from "./Row1";
import Row2 from "./Row2";
import Row3 from "./Row3";
import Sidebar from "../components/Sidebar";
import AuthedNavbar from "../components/AuthedNavbar";

const gridTemplateLargeScreens = `
  "a b c c"
  "a b c c"
  "d d e e"
  "d d e e" 
  "d d g g"
  "f f g g"
  "f f g g"
  "f f g g"
`;

const Default = () => {
  return (
    <>
      <AuthedNavbar />
      <Sidebar />
      <Box
        width="100%"
        height="100%"
        display="grid"
        paddingLeft="16rem"
        gap="1.5rem"
        marginTop="1rem"
        sx={{
          gridTemplateColumns: "repeat(4, minmax(120px, 1fr))",
          gridTemplateRows: "repeat(10, minmax(100px, 1fr))",
          gridTemplateAreas: gridTemplateLargeScreens,
          marginTop: "6rem",
        }}
      >
        <Row1 />
        <Row2 />
        <Row3 />
      </Box>
    </>
  );
};

export default Default;
