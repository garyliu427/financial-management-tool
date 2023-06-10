import { useState, useEffect, useMemo } from "react";
import Sidebar from "../components/Sidebar";
import AuthedNavbar from "../components/AuthedNavbar";
import { Box, Typography, Button } from "@mui/material";
import DashboardBox from "../components/DashboardBox";
import { fetchExpenseAPI } from "../api/expense";
import { fetchRevenueAPI } from "../api/revenue";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
  Label,
} from "recharts";
import regression, { DataPoint } from "regression";

function Prediction() {
  const [expenseData, setExpenseData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [predictedData, setPredictedData] = useState([]);

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

  console.log(formattedData);

  const generatePredictions = (data) => {
    // Prepare the data for regression
    const dataPoints = data.map((entry) => [entry.month, entry.revenue]);

    // Perform linear regression
    const result = regression.linear(dataPoints);

    // Get the regression line slope and intercept
    const slope = result.equation[0];
    const intercept = result.equation[1];

    // Generate predictions for the next year
    const nextYearPredictions = [];
    for (let month = 0; month < 12; month++) {
      const nextMonth = (new Date().getMonth() + month + 1) % 12;
      const nextYear =
        new Date().getFullYear() +
        Math.floor((new Date().getMonth() + month + 1) / 12);
      const nextMonthLabel = `${nextMonth}-${nextYear}`;
      const nextMonthPrediction = slope * (month + 1) + intercept;

      // Create a new data point for the predicted revenue of each month in the next year
      const predictedDataPoint = {
        month: nextMonthLabel,
        expense: 0,
        revenue: nextMonthPrediction,
      };

      nextYearPredictions.push(predictedDataPoint);
    }

    // Add the predicted data points to the existing data
    const predictedData = [...data, ...nextYearPredictions];

    return predictedData;
  };

  useEffect(() => {
    // Generate predictions when the formatted data changes
    setPredictedData(generatePredictions(formattedData));
  }, [formattedData]);

  console.log(generatePredictions(formattedData));

  return (
    <>
      <AuthedNavbar />
      <Sidebar />
      <DashboardBox
        width="85%"
        height="80%"
        marginLeft="17rem"
        marginTop="6rem"
      >
        <Box m="1rem 2.5rem" gap="1rem">
          <Box>
            <Typography variant="h3">Revenue and Predictions</Typography>
            <Typography variant="h6">
              charted revenue and predicted revenue based on a simple linear
              regression model
            </Typography>
          </Box>
        </Box>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={predictedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ff2413" />
            <XAxis
              dataKey="month"
              tickLine={false}
              style={{ fontSize: "10px" }}
            >
              <Label value="month" position="insideBottom" />
            </XAxis>
            <YAxis
              axisLine={{ strokeWidth: "0" }}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            >
              <Label
                value="Revenue in USD"
                angle={-90}
                offset={-5}
                position="insideLeft"
              />
            </YAxis>
            <Tooltip />
            <Legend verticalAlign="top" />
            <Line
              type="monotone"
              dataKey="Actual Revenue"
              stroke="#fsf213"
              strokeWidth={0}
              dot={{ strokeWidth: 5 }}
            />
            <Line
              type="monotone"
              dataKey="Regression Line"
              stroke="#8884d8"
              dot={false}
            />
            <Line strokeDasharray="5 5" dataKey="Predicted Revenue" />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
}

export default Prediction;
