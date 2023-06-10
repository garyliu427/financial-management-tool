import axios from "axios";

const instance = axios.create({
  baseURL: "https://financial-management-m2kl.onrender.com/",
});

export default instance;
