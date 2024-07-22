import axios from "axios"

export const api = axios.create({
  // baseURL: "http://localhost:3333"
  baseURL: " https://api-foodexplorer-4z46.onrender.com"
})