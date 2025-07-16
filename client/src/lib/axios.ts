import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_URL_NETWORK || import.meta.env.VITE_URL_LOCAL, // atau ganti ke URL backend-mu kalau berbeda
  headers: {
    "Content-Type": "application/json",
  },
})

export default api
