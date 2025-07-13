const express = require("express")
const router = express.Router()
const apiClient = require("../config/api")

// Listar todos los usuarios
router.get("/", async (req, res) => {
  try {
    const response = await apiClient.get("/usuarios")
    res.render("pages/usuarios/index", {
      title: "Gestión de Usuarios",
      activeMenu: "usuarios",
      usuarios: response.data,
      success: req.query.success,
      error: req.query.error,
    })
  } catch (error) {
    res.render("pages/usuarios/index", {
      title: "Gestión de Usuarios",
      activeMenu: "usuarios",
      usuarios: [],
      error: "Error al cargar los usuarios",
    })
  }
})

// Mostrar formulario para crear usuario
router.get("/nuevo", (req, res) => {
  res.render("pages/usuarios/form", {
    title: "Nuevo Usuario",
    activeMenu: "usuarios",
    usuario: null,
    action: "/usuarios",
    method: "POST",
  })
})

// Crear nuevo usuario
router.post("/", async (req, res) => {
  try {
    await apiClient.post("/usuarios", {
      name: req.body.nombre,
      email: req.body.email,
      pass: req.body.contraseña,
    })
    res.redirect("/usuarios?success=Usuario creado exitosamente")
  } catch (error) {
    res.redirect("/usuarios?error=Error al crear el usuario")
  }
})

// Mostrar formulario para editar usuario
router.get("/:id/editar", async (req, res) => {
  try {
    const response = await apiClient.get(`/usuarios/${req.params.id}`)
    res.render("pages/usuarios/form", {
      title: "Editar Usuario",
      activeMenu: "usuarios",
      usuario: response.data,
      action: `/usuarios/${req.params.id}?_method=PUT`,
      method: "POST",
    })
  } catch (error) {
    res.redirect("/usuarios?error=Usuario no encontrado")
  }
})

// Actualizar usuario
router.put("/:id", async (req, res) => {
  try {
    await apiClient.put(`/usuarios/${req.params.id}`, {
      name: req.body.nombre,
      email: req.body.email,
      pass: req.body.contraseña,
    })
    res.redirect("/usuarios?success=Usuario actualizado exitosamente")
  } catch (error) {
    res.redirect("/usuarios?error=Error al actualizar el usuario")
  }
})

// Eliminar usuario
router.delete("/:id", async (req, res) => {
  try {
    await apiClient.delete(`/usuarios/${req.params.id}`)
    res.redirect("/usuarios?success=Usuario eliminado exitosamente")
  } catch (error) {
    res.redirect("/usuarios?error=Error al eliminar el usuario")
  }
})

module.exports = router
