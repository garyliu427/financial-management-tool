import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center">
          <Box>
            <Box
              gap="0.75rem"
              display="flex"
              alignItems="center"
              marginLeft="10rem"
              marginTop="1rem"
            >
              <Box display="flex" justifyContent="center" alignItems="center">
                <AccountBalanceWalletIcon
                  sx={{
                    fontSize: "28px",
                    marginRight: "1rem",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/")}
                />
                <Typography variant="h3" fontSize="20px">
                  Finanseer
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
