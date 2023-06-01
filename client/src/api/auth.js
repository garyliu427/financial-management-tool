import axios from "./axios";

export const loginAPI = async (email, password) => {
  return await axios.post("/auth/login", { email, password });
};

export const signupAPI = async (username, email, password) => {
  return await axios.post("/auth/signup", { username, email, password });
};

export const resetPasswordAPI = async (email) => {
  return await axios.post("/auth/reset_password", { email });
};

export const logoutAPI = async (email) => {
  return await axios.post("/auth/logout", { email });
};
