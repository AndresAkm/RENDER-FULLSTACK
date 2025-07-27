const express = require("express")
const cors = require("cors")
const app = express()
const enrutador = require("./routes/router")
require("dotenv").config()
const mongoose = require("./config/connectiondb")

const logger = require("morgan")
app.use(logger("dev"))

// Configuración de CORS para permitir requests del frontend
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3001",
    credentials: true,
  }),
)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/api/v2", enrutador)

// Ruta de health check
app.get("/api/v2/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Backend funcionando correctamente" })
})

app.get("/api/v2/db-health", async (req, res) => {
  try {
    if(mongoose.connection.readyState === 1) {
      res.status(200).json({ status: "OK", message: "Base de datos conectada" })
    }
  } catch (error) {
      res.status(500).json({ status: "ERROR", message: "Base de datos desconectada" })
  }
})

const PORT = process.env.PORT || 8300

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend escuchando en el puerto ${PORT}...`)
  console.log(`📡 API disponible en: http://localhost:${PORT}/api/v2`)
})
