const express = require("express")
const cors = require("cors")
const app = express()
const enrutador = require("./routes/router")
require("dotenv").config()

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

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: "Algo salió mal!" })
})

// Ruta de health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Backend funcionando correctamente" })
})

const PORT = process.env.PORT || 8300

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend escuchando en el puerto ${PORT}...`)
  console.log(`📡 API disponible en: http://localhost:${PORT}/api/v2`)
})
