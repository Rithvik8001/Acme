import axios from "axios";

const axiosOptions = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

const axiosOptionsInstance = axios.create(axiosOptions);

export default axiosOptionsInstance;
