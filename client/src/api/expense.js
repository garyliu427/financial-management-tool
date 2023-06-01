import axios from "axios";

export const postExpenseAPI = async (
  authToken,
  amount,
  category,
  description,
  date,
) => {
  return await axios.post(
    "/expense",
    { amount, category, description, date },
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
