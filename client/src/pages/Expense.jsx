import { useEffect, useState, useMemo } from "react";
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
import {
  postExpenseAPI,
  fetchExpenseAPI,
  editExpenseAPI,
  deleteExpenseAPI,
} from "../api/expense";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const categoryMapping = {
  1: "Eating Out",
  2: "Shopping",
  3: "Groceries",
  4: "Utilities",
  5: "Entertainment",
  6: "Transport",
  7: "Health",
  8: "Travel",
  9: "Education",
  10: "Others",
};

function Expense() {
  const { palette } = useTheme();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const [openDia, setOpenDia] = useState(false);

  const columns = useMemo(
    () => [
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
    ],
    [],
  );

  const addExpenseTransaction = async (date, category, amount, description) => {
    const authToken = localStorage.getItem("authToken");
    try {
      const formattedDate = date.toISOString().split("T")[0];
      const amountValue = parseFloat(amount);
      const categoryValue = parseInt(category);
      await postExpenseAPI(
        authToken,
        formattedDate,
        categoryValue,
        amountValue,
        description,
      );
    } catch (error) {
      alert(error);
    }
  };

  // const editExpenseTransaction = async (
  //   id,
  //   date,
  //   category,
  //   amount,
  //   description,
  // ) => {
  //   const authToken = localStorage.getItem("authToken");
  //   try {
  //     const formattedDate = date.toISOString().split("T")[0];
  //     const amountValue = parseFloat(amount);
  //     const categoryValue = parseInt(category);
  //     await editExpenseAPI(
  //       authToken,
  //       id,
  //       formattedDate,
  //       categoryValue,
  //       amountValue,
  //       description,
  //     );
  //   } catch (error) {
  //     alert(error);
  //   }
  // };

  const deleteExpenseTransaction = async (ids) => {
    const authToken = localStorage.getItem("authToken");
    try {
      if (ids.length > 0) {
        for (const id of ids) {
          await deleteExpenseAPI(authToken, id);
          setRows((prevRows) => prevRows.filter((row) => row.true_id !== id));
        }
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const fetchExpenseTransactions = async () => {
      const authToken = localStorage.getItem("authToken");
      try {
        const response = await fetchExpenseAPI(authToken);
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
            true_id: transaction.expense_transaction_id,
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

    fetchExpenseTransactions();
  }, []);

  return (
    <>
      <AuthedNavbar />
      <Sidebar />
      <Box marginLeft="15rem" marginTop="6rem" display="flex">
        <Typography padding="1rem" variant="h4">
          Your Transactions List
        </Typography>
        <Button
          style={{
            backgroundColor: palette.success.main,
            color: palette.success.light,
            marginLeft: "auto",
            alignItems: "center",
            marginRight: "2rem",
            marginBottom: "1rem",
          }}
          onClick={() => setOpenDia(true)}
        >
          Record your expense
        </Button>
        <Button
          style={{
            backgroundColor: palette.error.main,
            color: "black",
            alignItems: "center",
            marginRight: "2rem",
            marginBottom: "1rem",
          }}
          onClick={() => deleteExpenseTransaction(selectedRows)}
          disabled={selectedRows.length === 0}
        >
          Delete
        </Button>
        <Dialog open={openDia} maxWidth="lg">
          <DialogContent>
            <DialogContentText>
              Input your transaction details below
            </DialogContentText>
            <Box margin="1rem" width="400px">
              <Box display="flex" alignItems="center" margin="0.5rem">
                <Typography>Date:</Typography>
              </Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Basic date time picker"
                    value={date}
                    onChange={(date) => setDate(date)}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <Box display="flex" alignItems="center" margin="0.5rem">
                <Typography>Category:</Typography>
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
              <Box display="flex" alignItems="center" margin="0.5rem">
                <Typography>Amount:</Typography>
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
              <Box display="flex" alignItems="center" margin="0.5rem">
                <Typography>Description:</Typography>
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
                addExpenseTransaction(date, category, amount, description);
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
          rowCount={rows.length}
          rowsPerPageOptions={[10]} // Set the available page size options to only 10
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
}

export default Expense;
