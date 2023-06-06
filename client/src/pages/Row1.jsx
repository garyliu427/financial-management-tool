import { useState, useEffect, useMemo } from "react";
import DashboardBox from "../../src/components/DashboardBox";
import { Typography } from "@mui/material";
import BoxHeader from "../../src/components/BoxHeader";
import { fetchExpenseAPI } from "../api/expense";
import { fetchRevenueAPI } from "../api/revenue";

function Row1() {
  const [expense, setExpense] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const authToken = localStorage.getItem("authToken");
  const currentYear = new Date().getFullYear();

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
      <DashboardBox gridArea="c"></DashboardBox>
    </>
  );
}

export default Row1;
