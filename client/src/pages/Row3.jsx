import { useState, useEffect, useMemo } from "react";
import DashboardBox from "../../src/components/DashboardBox";
import { Divider } from "@mui/material";
import BoxHeader from "../../src/components/BoxHeader";
import { fetchExpenseAPI } from "../api/expense";
import { fetchRevenueAPI } from "../api/revenue";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
} from "recharts";

function Row3() {
  const [expenseData, setExpenseData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    const fetchExpenseTransactions = async () => {
      const authToken = localStorage.getItem("authToken");
      try {
        const response = await fetchExpenseAPI(authToken);
        const transactions = response.data; // Assuming response.data contains the transactions array
        setExpenseData(transactions);
      } catch (error) {
        alert(error);
      }
    };

    const fetchRevenueTransactions = async () => {
      const authToken = localStorage.getItem("authToken");
      try {
        const response = await fetchRevenueAPI(authToken);
        const transactions = response.data; // Assuming response.data contains the transactions array
        setRevenueData(transactions);
      } catch (error) {
        alert(error);
      }
    };

    fetchExpenseTransactions();
    fetchRevenueTransactions();
  }, []);

  const dataForChart1 = useMemo(() => {
    const filteredData = expenseData?.filter((transaction) => {
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
  }, [expenseData]);

  const formattedData = useMemo(() => {
    const monthlyData = {};

    // Group expense transactions by month
    expenseData?.forEach((transaction) => {
      const transactionDate = new Date(transaction.date);
      const month = transactionDate.getMonth(); // 0-based index
      const year = transactionDate.getFullYear();

      const key = `${year}-${month}`;
      if (!monthlyData[key]) {
        monthlyData[key] = {
          month: `${transactionDate.toLocaleDateString("en-US", {
            month: "short",
          })}-${year}`,
          expense: 0,
          revenue: 0,
        };
      }

      monthlyData[key].expense += transaction.amount;
    });

    // Group revenue transactions by month
    revenueData?.forEach((transaction) => {
      const transactionDate = new Date(transaction.date);
      const month = transactionDate.getMonth(); // 0-based index
      const year = transactionDate.getFullYear();

      const key = `${year}-${month}`;
      if (!monthlyData[key]) {
        monthlyData[key] = {
          month: `${transactionDate.toLocaleDateString("en-US", {
            month: "short",
          })}-${year}`,
          expense: 0,
          revenue: 0,
        };
      }

      monthlyData[key].revenue += transaction.amount;
    });

    return Object.values(monthlyData);
  }, [expenseData, revenueData]);

  return (
    <>
      <DashboardBox gridArea="f">
        <BoxHeader title="Expenses in Current Year" />
        <Divider sx={{ paddingBottom: "0.5rem" }} />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={500} height={400} data={dataForChart1}>
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
      <DashboardBox gridArea="g">
        <BoxHeader title="Expenses and Revenues by Month" />
        <Divider sx={{ paddingBottom: "0.5rem" }} />
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="expense" fill="#8884d8" name="Expense" />
            <Bar dataKey="revenue" fill="#82ca9d" name="Revenue" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
}

export default Row3;
