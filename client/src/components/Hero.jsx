import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <>
      <Box display="flex">
        <Box paddingLeft="10rem" paddingTop="10rem">
          <Box sx={{ height: "14rem" }}>
            <Typography variant="h1" width="500px" marginBottom="3rem">
              Use BudgetWise to Power Your Finance
            </Typography>
          </Box>
          <Typography
            variant="h4"
            width="500px"
            marginBottom="3rem"
            lineHeight="2rem"
          >
            BudgetWise is Financial Dashboard System which helps you to manage
            money.
          </Typography>
          <Button
            style={{
              backgroundColor: theme.palette.success.main,
              color: theme.palette.success.light,
              padding: "0.8rem 2.3rem",
            }}
            onClick={() => navigate("/login")}
          >
            Get Started
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginLeft: "2rem",
          }}
        >
          <img
            style={{
              height: 600,
              width: "auto",
              maxWidth: "100%",
              maxHeight: "100%",
              marginTop: "5rem",
              marginRight: "2rem",
            }}
            alt="Hero"
            src="../../src/assets/hero.png"
          />
        </Box>
      </Box>
    </>
  );
};

export default Hero;
