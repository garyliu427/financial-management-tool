import DashboardBox from "../../src/components/DashboardBox";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { useEffect, useState, useMemo } from "react";
import { fetchExpenseAPI } from "../api/expense";

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

function Row2() {
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FF0000",
    "#800080",
    "#0000FF",
    "#008000",
    "#808000",
    "#800000",
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#ededed"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const [expenseData, setExpenseData] = useState();

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

    fetchExpenseTransactions();
  }, []);

  const transformedData = useMemo(() => {
    const categoryCounts = {};
    expenseData?.forEach((transaction) => {
      const { category, amount } = transaction;
      if (categoryCounts[category]) {
        categoryCounts[category] += amount;
      } else {
        categoryCounts[category] = amount;
      }
    });

    return Object.keys(categoryCounts).map((category) => ({
      name: categoryMapping[category],
      value: categoryCounts[category],
    }));
  }, [expenseData]);

  console.log("Hi", transformedData);

  return (
    <>
      <DashboardBox gridArea="d">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              data={transformedData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {expenseData?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend align="right" verticalAlign="middle" layout="vertical" />;
          </PieChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="e"></DashboardBox>
    </>
  );
}

export default Row2;
