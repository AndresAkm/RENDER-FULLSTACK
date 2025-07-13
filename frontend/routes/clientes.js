const express = require("express")
const router = express.Router()
const apiClient = require("../config/api")

// Listar todos los clientes
router.get("/", async (req, res) => {
  try {
    const response = await apiClient.get("/clientes")
    res.render("pages/clientes/index", {
      title: "Gestión de Clientes",
      activeMenu: "clientes",
      clientes: response.data,
      success: req.query.success,
      error: req.query.error,
    })
  } catch (error) {
    res.render("pages/clientes/index", {
      title: "Gestión de Clientes",
      activeMenu: "clientes",
      clientes: [],
      error: "Error al cargar los clientes",
    })
  }
})

// Mostrar formulario para crear cliente
router.get("/nuevo", (req, res) => {
  res.render("pages/clientes/form", {
    title: "Nuevo Cliente",
    activeMenu: "clientes",
    cliente: null,
    action: "/clientes",
    method: "POST",
  })
})

// Crear nuevo cliente
router.post("/", async (req, res) => {
  try {
    await apiClient.post("/clientes", {
      doc: req.body.documento,
      nc: req.body.nombreCompleto,
      fn: req.body.fNacimiento,
    })
    res.redirect("/clientes?success=Cliente creado exitosamente")
  } catch (error) {
    res.redirect("/clientes?error=Error al crear el cliente")
  }
})

// Mostrar formulario para editar cliente
router.get("/:id/editar", async (req, res) => {
  try {
    const response = await apiClient.get(`/clientes/${req.params.id}`)
    res.render("pages/clientes/form", {
      title: "Editar Cliente",
      activeMenu: "clientes",
      cliente: response.data,
      action: `/clientes/${req.params.id}?_method=PUT`,
      method: "POST",
    })
  } catch (error) {
    res.redirect("/clientes?error=Cliente no encontrado")
  }
})

// Actualizar cliente
router.put("/:id", async (req, res) => {
  try {
    await apiClient.put(`/clientes/${req.params.id}`, {
      doc: req.body.documento,
      nc: req.body.nombreCompleto,
      fn: req.body.fNacimiento,
    })
    res.redirect("/clientes?success=Cliente actualizado exitosamente")
  } catch (error) {
    res.redirect("/clientes?error=Error al actualizar el cliente")
  }
})

// Eliminar cliente
router.delete("/:id", async (req, res) => {
  try {
    await apiClient.delete(`/clientes/${req.params.id}`)
    res.redirect("/clientes?success=Cliente eliminado exitosamente")
  } catch (error) {
    res.redirect("/clientes?error=Error al eliminar el cliente")
  }
})

module.exports = router
