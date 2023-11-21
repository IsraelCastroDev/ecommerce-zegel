import axios from "axios";

const baseURL = "http://127.0.1:8000"

export const axi = axios.create({
  baseURL,
});
