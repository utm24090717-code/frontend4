import axios from "axios";

const API = axios.create({
  baseURL: "http://gael123-001-site1.anytempurl.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

export default API;