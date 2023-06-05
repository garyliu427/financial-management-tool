import axios from "./axios";

export const postExpenseAPI = async (
  authToken,
  date,
  category,
  amount,
  description,
) => {
  return await axios.post(
    "/expense",
    { date, category, amount, description },
    {
      headers: {
        Authorization: authToken,
      },
    },
  );
};

export const editExpenseAPI = async (
  authToken,
  expense_transacation_id,
  amount,
  category,
  description,
  date,
) => {
  return await axios.put(
    `/expense/${expense_transacation_id}`,
    {
      amount,
      category,
      description,
      date,
    },
    {
      headers: {
        Authorization: authToken,
      },
    },
  );
};

export const fetchExpenseAPI = async (authToken) => {
  return await axios.get("/expense/transactions", {
    headers: {
      Authorization: authToken,
    },
  });
};
