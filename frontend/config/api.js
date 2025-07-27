const axios = require("axios")

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8300/api/v2"

// Crear una instancia de axios con la configuración base
// Esto permite reutilizar la configuración en diferentes rutas
// sin la necesidad de repetir el código
const apiClient = axios.create({
  baseURL: API_BASE_URL, // Base URL de la API
  timeout: 10000, // Tiempo máximo de espera para las solicitudes, en caso de tardar más de 10 segundos, se cancelará la solicitud
  headers: {
    "Content-Type": "application/json", // Tipo de contenido que se enviará en las solicitudes
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
