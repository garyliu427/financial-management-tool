import { useState, useEffect, useMemo } from "react";
import DashboardBox from "../../src/components/DashboardBox";
import {
  Box,
  Button,
  FormControl,
  Typography,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import BoxHeader from "../../src/components/BoxHeader";
import { fetchExpenseAPI } from "../api/expense";
import { fetchRevenueAPI } from "../api/revenue";
import { PieChart, Pie, ResponsiveContainer, Cell, Legend } from "recharts";

function Row1() {
  const [expense, setExpense] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const authToken = localStorage.getItem("authToken");
  const currentYear = new Date().getFullYear();
  const [budget, setBudget] = useState(localStorage.getItem("budget") || 0);
  const [inputBudget, setInputBudget] = useState("");

  useEffect(() => {
    const fetchExpenseTransactions = async () => {
      try {
        const response = await fetchExpenseAPI(authToken);
        const transactions = response.data;
        setExpense(transactions);
      } catch (error) {
        alert(error);
      }
    };

    fetchExpenseTransactions();
  }, []);

  useEffect(() => {
    const fetchRevenueTransactions = async () => {
      try {
        const response = await fetchRevenueAPI(authToken);
        const transactions = response.data;
        setRevenue(transactions);
      } catch (error) {
        alert(error);
      }
    };

    fetchRevenueTransactions();
  }, []);

  const totalExpense = useMemo(() => {
    const filteredData = expense.filter(
      (transaction) => new Date(transaction.date).getFullYear() === currentYear,
    );
    return filteredData.reduce(
      (accumulator, transaction) => accumulator + transaction.amount,
      0,
    );
  }, [expense, currentYear]);

  const totalRevenue = useMemo(() => {
    const filteredData = revenue.filter(
      (transaction) => new Date(transaction.date).getFullYear() === currentYear,
    );
    return filteredData.reduce(
      (accumulator, transaction) => accumulator + transaction.amount,
      0,
    );
  }, [revenue, currentYear]);

  const completionPercentage = (totalRevenue / budget) * 100;
  const remainingPercentage = 100 - completionPercentage;

  const handleInputChange = (event) => {
    setInputBudget(event.target.value);
  };

  const handleSetBudget = () => {
    setBudget(inputBudget);
    localStorage.setItem("budget", inputBudget);
  };

  const data = [
    { name: "Completed", value: completionPercentage },
    { name: "Remaining", value: remainingPercentage },
  ];

  const renderLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  return (
    <>
      <DashboardBox gridArea="a" style={{ backgroundColor: "#2da58e" }}>
        <BoxHeader title={`Total Expense in ${currentYear}`} />
        <Typography sx={{ color: "#ffffff", paddingLeft: "1rem" }}>
          ${totalExpense}
        </Typography>
      </DashboardBox>
      <DashboardBox gridArea="b">
        <BoxHeader title={`Total Earning in ${currentYear}`} />
        <Typography sx={{ paddingLeft: "1rem" }}>${totalRevenue}</Typography>
      </DashboardBox>
      <DashboardBox gridArea="c">
        <Box display="flex" alignItems="center">
          <BoxHeader title={"Your Budget"} />
          <FormControl
            variant="outlined"
            sx={{
              marginLeft: "auto",
              marginRight: "1rem",
            }}
          >
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Amount"
              onChange={handleInputChange}
            />
          </FormControl>
          <Button
            onClick={handleSetBudget}
            sx={{
              marginRight: "1rem",
              backgroundColor: "#45bff8",
              color: "black",
            }}
          >
            Set
          </Button>
        </Box>
        <ResponsiveContainer width="80%" height="80%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={renderLabel}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? "#6e8cf0" : "#f38b5e"}
                />
              ))}
            </Pie>
            <Legend
              verticalAlign="middle"
              layout="vertical"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingLeft: "10px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
}

export default Row1;
