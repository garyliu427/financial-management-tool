import React from "react";
import Sidebar from "../components/Sidebar";
import AuthedNavbar from "../components/AuthedNavbar";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@mui/material/styles";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "date",
    headerName: "Date",
    width: 150,
    editable: true,
  },
  {
    field: "category",
    headerName: "Category",
    width: 150,
    editable: true,
  },
  {
    field: "amount",
    headerName: "Amount",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "description",
    headerName: "Description",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [];

function Accounts() {
  const { palette } = useTheme();
  const [openDia, setOpenDia] = React.useState(false);

  const addExpenseTransaction = () => {
    console.log("Add Expense Transaction");
  };

  return (
    <>
      <AuthedNavbar />
      <Sidebar />
      <Box marginLeft="15rem">
        <Typography padding="1rem" variant="h4">
          Your Transactions List
        </Typography>
        <Button
          style={{
            backgroundColor: palette.success.main,
            color: palette.success.light,
            display: "flex",
            marginLeft: "auto",
            alignItems: "center",
            marginRight: "2rem",
            marginBottom: "1rem",
          }}
          onClick={() => setOpenDia(true)}
        >
          Add your transaction
        </Button>
        <Dialog open={openDia}>
          <DialogContent>
            <DialogContentText>
              Input your transaction details below
            </DialogContentText>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              margin="1rem"
            >
              <Box display="flex" alignItems="center" margin="0.5rem">
                <Typography>Date:</Typography>
                <TextField
                  autoFocus
                  id="date"
                  type="datetime"
                  fullWidth
                  variant="filled"
                />
              </Box>
              <Box display="flex" alignItems="center" margin="0.5rem">
                <Typography>Category:</Typography>
                <TextField autoFocus id="category" fullWidth variant="filled" />
              </Box>
              <Box display="flex" alignItems="center" margin="0.5rem">
                <Typography>Amount:</Typography>
                <TextField
                  autoFocus
                  id="amount"
                  type="text"
                  fullWidth
                  variant="filled"
                />
              </Box>
              <Box display="flex" alignItems="center" margin="0.5rem">
                <Typography>Description:</Typography>
                <TextField
                  autoFocus
                  id="description"
                  type="text"
                  fullWidth
                  variant="filled"
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDia(false)}>Cancel</Button>
            <Button onClick={addExpenseTransaction}>Send</Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Box sx={{ height: 500, marginLeft: "15rem" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
      ;
    </>
  );
}

export default Accounts;
