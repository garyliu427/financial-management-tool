import { Box, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

const BoxHeader = ({ title }) => {
  return (
    <Box display="flex" marginTop="1rem" marginLeft="2rem" marginBottom="1rem">
      <Typography variant="h3" mb="-0.1rem">
        {title}
      </Typography>
    </Box>
  );
};

BoxHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default BoxHeader;
