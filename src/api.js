import axios from "axios";

const API = axios.create({
  baseURL: "http://192.168.137.1:5000/api", // ✅ BACKEND
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
console.log("Api Called");

export default API;
