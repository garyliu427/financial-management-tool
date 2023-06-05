import { useState, useEffect, useMemo } from "react";
import DashboardBox from "../../src/components/DashboardBox";
import Divider from "@mui/material/Divider";
import BoxHeader from "../../src/components/BoxHeader";
import { fetchExpenseAPI } from "../api/expense";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

function Row1() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchExpenseTransactions = async () => {
      const authToken = localStorage.getItem("authToken");
      try {
        const response = await fetchExpenseAPI(authToken);
        const transactions = response.data; // Assuming response.data contains the transactions array
        setData(transactions);
      } catch (error) {
        alert(error);
      }
    };

    fetchExpenseTransactions();
  }, []);

  const formattedData = useMemo(() => {
    const filteredData = data.filter((transaction) => {
      const currentYear = new Date().getFullYear();
      const transactionYear = new Date(transaction.date).getFullYear();
      return transactionYear === currentYear;
    });

    return filteredData.map((transaction) => {
      const transactionDate = new Date(transaction.date);
      const formattedDate = transactionDate.toLocaleDateString("en-AU", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      return {
        id: transaction.expense_transaction_id,
        date: formattedDate,
        category: transaction.category,
        expense: transaction.amount,
        description: transaction.description,
      };
    });
  }, [data]);

  return (
    <>
      <DashboardBox gridArea="a">
        <BoxHeader title="Expenses" />
        <Divider sx={{ marginBottom: "2.5rem" }} />
        <LineChart width={500} height={300} data={formattedData}>
          <XAxis dataKey="date" style={{ fontSize: "12px" }} />
          <YAxis
            tickFormatter={(value) => `$${value}`}
            tickLine={false}
            axisLine={{ strokeWidth: "0" }}
            style={{ fontSize: "12px" }}
          />
          <Tooltip
            formatter={(value) => `$${value}`} // Display the expense value with a dollar sign in the Tooltip
            labelFormatter={() => "Expense"} // Custom label for the Tooltip
          />
          <Line type="monotone" dataKey="expense" stroke="#8884d8" />
        </LineChart>
      </DashboardBox>
      <DashboardBox gridArea="b"></DashboardBox>
      <DashboardBox gridArea="c"></DashboardBox>
    </>
  );
}

export default Row1;
