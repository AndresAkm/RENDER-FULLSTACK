const axios = require("axios")

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8300/api/v2"

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Interceptor para manejo de errores
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error en API:", error.message)
    return Promise.reject(error)
  },
)

module.exports = apiClient
