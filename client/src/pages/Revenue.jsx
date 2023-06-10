import { useEffect, useState } from "react";
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
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTheme } from "@mui/material/styles";
import {
  postRevenueAPI,
  fetchRevenueAPI,
  editRevenueAPI,
  deleteRevenueAPI,
} from "../api/revenue";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "date",
    headerName: "Date",
    width: 200,
    editable: false,
  },
  {
    field: "category",
    headerName: "Category",
    width: 150,
    editable: false,
    valueGetter: (params) => categoryMapping[params.value] || "",
  },
  {
    field: "amount",
    headerName: "Amount",
    type: "number",
    width: 150,
    editable: false,
    valueFormatter: (params) => `$${params.value}`,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "description",
    headerName: "Description",
    sortable: false,
    editable: false,
    width: 150,
    valueGetter: (params) => params.row.description || "",
  },
];

const categoryMapping = {
  1: "Salary",
  2: "Bonus",
  3: "Investment",
  4: "Others",
};

function Revenue() {
  const { palette } = useTheme();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [rows, setRows] = useState([]);

  const [openDia, setOpenDia] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const addRevenueTransaction = async (date, category, amount, description) => {
    const authToken = localStorage.getItem("authToken");
    try {
      const formattedDate = date.toISOString().split("T")[0];
      const amountValue = parseFloat(amount);
      const categoryValue = parseInt(category);
      await postRevenueAPI(
        authToken,
        formattedDate,
        categoryValue,
        amountValue,
        description,
      );
      setShouldUpdate(true);
    } catch (error) {
      alert(error);
    }
  };

  const editRevenueTransaction = async (
    id,
    date,
    category,
    amount,
    description,
  ) => {
    const authToken = localStorage.getItem("authToken");
    try {
      const formattedDate = date.toISOString().split("T")[0];
      const amountValue = parseFloat(amount);
      const categoryValue = parseInt(category);
      await editRevenueAPI(
        authToken,
        id,
        formattedDate,
        categoryValue,
        amountValue,
        description,
      );
    } catch (error) {
      alert(error);
    }
  };

  const deleteRevenueTransaction = async (ids) => {
    const authToken = localStorage.getItem("authToken");
    try {
      if (ids.length > 0) {
        for (const id of ids) {
          await deleteRevenueAPI(authToken, id);
          setRows((prevRows) => prevRows.filter((row) => row.true_id !== id));
        }
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const fetchRevenueTransactions = async () => {
      const authToken = localStorage.getItem("authToken");
      try {
        const response = await fetchRevenueAPI(authToken);
        const transactions = response.data; // Assuming response.data contains the transactions array
        const formattedRows = transactions.map((transaction, index) => {
          const transactionDate = new Date(transaction.date);
          const formattedDate = transactionDate.toLocaleDateString("en-AU", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          });

          return {
            id: index + 1,
            true_id: transaction.revenue_transaction_id,
            date: formattedDate,
            category: transaction.category,
            amount: transaction.amount,
            description: transaction.description,
          };
        });
        setRows(formattedRows);
      } catch (error) {
        alert(error);
      }
    };

    fetchRevenueTransactions();

    if (shouldUpdate) {
      setShouldUpdate(false); // Reset the state
      fetchRevenueTransactions(); // Fetch the updated expense transactions
    }
  }, [shouldUpdate]);

  console.log(rows);

  return (
    <>
      <AuthedNavbar />
      <Sidebar />
      <Box marginLeft="15rem" marginTop="6rem" display="flex">
        <Typography padding="1rem" variant="h4">
          Revenue Statement
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
          Record your income
        </Button>
        <Button
          style={{
            backgroundColor:
              selectedRows.length === 0 ? "#fbcac6" : palette.error.main,
            color: selectedRows.length === 0 ? "black" : "rgb(87, 34, 34)",
            alignItems: "center",
            marginRight: "2rem",
            marginBottom: "1rem",
          }}
          onClick={() => deleteRevenueTransaction(selectedRows)}
          disabled={selectedRows.length === 0}
        >
          Delete
        </Button>
        <Dialog open={openDia} maxWidth="lg">
          <DialogContent>
            <DialogContentText>
              Input your transaction details below
            </DialogContentText>
            <Box margin="1rem" fullWidth maxWidth="md" display="flex">
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                margin="0.5rem"
              >
                <Typography>Date</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Basic date time picker"
                      value={date}
                      onChange={(date) => setDate(date)}
                      disableFuture
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                margin="0.5rem"
              >
                <Typography>Category</Typography>
                <Select
                  id="category"
                  fullWidth
                  variant="filled"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {Object.entries(categoryMapping).map(([key, value]) => (
                    <MenuItem key={key} value={key}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                margin="0.5rem"
              >
                <Typography>Amount</Typography>
                <TextField
                  autoFocus
                  id="amount"
                  type="text"
                  fullWidth
                  variant="filled"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                margin="0.5rem"
              >
                <Typography>Description</Typography>
                <TextField
                  autoFocus
                  id="description"
                  type="text"
                  fullWidth
                  variant="filled"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDia(false)}>Cancel</Button>
            <Button
              onClick={() => {
                addRevenueTransaction(date, category, amount, description);
                setOpenDia(false);
              }}
            >
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Box sx={{ marginLeft: "15rem" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10} // Set the initial page size to 10
          pagination
          paginationMode="server" // Enable server-side pagination
          onRowSelectionModelChange={(selectionModel) => {
            const selectedRowIds = selectionModel.map(
              (index) => rows[index - 1]?.true_id,
            );
            setSelectedRows(selectedRowIds);
          }}
          slots={{ toolbar: GridToolbar }}
          rowCount={rows.length}
          rowsPerPageOptions={[10]} // Set the available page size options to only 10
          checkboxSelection
        />
      </Box>
    </>
  );
}

export default Revenue;
