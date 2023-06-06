import { useState, useEffect, useMemo } from "react";
import DashboardBox from "../../src/components/DashboardBox";
import { Divider } from "@mui/material";
import BoxHeader from "../../src/components/BoxHeader";
import { fetchExpenseAPI } from "../api/expense";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Row3() {
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
      <DashboardBox gridArea="f">
        <BoxHeader title="Expenses in Current Year" />
        <Divider sx={{ paddingBottom: "0.5rem" }} />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={formattedData}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >
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
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="g"></DashboardBox>
    </>
  );
}

export default Row3;
