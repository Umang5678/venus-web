import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "http://192.168.1.13:5000/api", // ✅ Your Node.js backend URL
});

export default API;
