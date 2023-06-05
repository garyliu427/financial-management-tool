import { useState, useEffect, useMemo } from "react";
import DashboardBox from "../../src/components/DashboardBox";
import { Typography } from "@mui/material";
import BoxHeader from "../../src/components/BoxHeader";
import { fetchExpenseAPI } from "../api/expense";

function Row1() {
  const [data, setData] = useState([]);
  const authToken = localStorage.getItem("authToken");
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchExpenseTransactions = async () => {
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

  const totalExpense = useMemo(() => {
    const filteredData = data.filter(
      (transaction) => new Date(transaction.date).getFullYear() === currentYear,
    );
    return filteredData.reduce(
      (accumulator, transaction) => accumulator + transaction.amount,
      0,
    );
  }, [data, currentYear]);

  return (
    <>
      <DashboardBox gridArea="a">
        <BoxHeader title={`Total Expense in ${currentYear}`} />
        <Typography>${totalExpense}</Typography>
      </DashboardBox>
      <DashboardBox gridArea="b"></DashboardBox>
      <DashboardBox gridArea="c"></DashboardBox>
    </>
  );
}

export default Row1;
