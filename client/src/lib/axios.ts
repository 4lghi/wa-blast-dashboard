import axios from "axios"

const api = axios.create({
  baseURL: "http://172.25.1.244:3001", // atau ganti ke URL backend-mu kalau berbeda
  headers: {
    "Content-Type": "application/json",
  },
})

export default api
