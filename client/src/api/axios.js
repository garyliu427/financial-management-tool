import axios from "axios";

const instance = axios.create({
  baseURL: "https://cryptic-scrubland-51274.herokuapp.com/",
});

export default instance;
