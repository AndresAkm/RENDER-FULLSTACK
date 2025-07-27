const express = require("express")
const router = express.Router()
const apiClient = require("../config/api")

router.get("/", (req, res) => {
  res.render("pages/home", {
    title: "Inicio - Sistema de Gestión",
    activeMenu: "home",
  })
})

router.get("/dashboard", (req, res) => {
  res.render("pages/dashboard", {
    title: "Dashboard - Sistema de Gestión",
    activeMenu: "dashboard",
  })
})

// Rutas proxy para el dashboard (para evitar CORS en el frontend)
router.get("/api/health", async (req, res) => {
  try {
    const response = await apiClient.get("/health")
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: "API no disponible" })
  }
})

router.get("/api/db-health", async (req, res) => {
  try {
    const response = await apiClient.get("/db-health")
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ status: "ERROR", message: "No se pudo conectar a la base de datos" })
  }
})

router.get("/api/clientes", async (req, res) => {
  try {
    const response = await apiClient.get("/clientes")
    res.json(response.data)
  } catch (error) {
    res.json([])
  }
})

router.get("/api/productos", async (req, res) => {
  try {
    const response = await apiClient.get("/productos")
    res.json(response.data)
  } catch (error) {
    res.json([])
  }
})

router.get("/api/usuarios", async (req, res) => {
  try {
    const response = await apiClient.get("/usuarios")
    res.json(response.data)
  } catch (error) {
    res.json([])
  }
})

module.exports = router
