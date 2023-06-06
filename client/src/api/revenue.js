import axios from "./axios";

export const postRevenueAPI = async (
  authToken,
  date,
  category,
  amount,
  description,
) => {
  return await axios.post(
    "/revenue",
    { date, category, amount, description },
    {
      headers: {
        Authorization: authToken,
      },
    },
  );
};

export const editRevenueAPI = async (
  authToken,
  revenue_transaction_id,
  amount,
  category,
  description,
  date,
) => {
  return await axios.put(
    `/revenue/${revenue_transaction_id}`,
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

export const fetchRevenueAPI = async (authToken) => {
  return await axios.get("/revenue/transactions", {
    headers: {
      Authorization: authToken,
    },
  });
};

export const deleteRevenueAPI = async (authToken, revenue_transaction_id) => {
  return await axios.delete(`/revenue/${revenue_transaction_id}`, {
    headers: {
      Authorization: authToken,
    },
  });
};
