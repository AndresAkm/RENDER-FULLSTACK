const express = require("express")
const router = express.Router()
const apiClient = require("../config/api")

// Listar todos los productos
router.get("/", async (req, res) => {
  try {
    const response = await apiClient.get("/productos")
    res.render("pages/productos/index", {
      title: "Gestión de Productos",
      activeMenu: "productos",
      productos: response.data,
      success: req.query.success,
      error: req.query.error,
    })
  } catch (error) {
    res.render("pages/productos/index", {
      title: "Gestión de Productos",
      activeMenu: "productos",
      productos: [],
      error: "Error al cargar los productos",
    })
  }
})

// Mostrar formulario para crear producto
router.get("/nuevo", (req, res) => {
  res.render("pages/productos/form", {
    title: "Nuevo Producto",
    activeMenu: "productos",
    producto: null,
    action: "/productos",
    method: "POST",
  })
})

// Crear nuevo producto
router.post("/", async (req, res) => {
  try {
    await apiClient.post("/productos", {
      name: req.body.nombre,
      cont: req.body.contenido,
      avai: req.body.disponible === "on",
    })
    res.redirect("/productos?success=Producto creado exitosamente")
  } catch (error) {
    res.redirect("/productos?error=Error al crear el producto")
  }
})

// Mostrar formulario para editar producto
router.get("/:id/editar", async (req, res) => {
  try {
    const response = await apiClient.get(`/productos/${req.params.id}`)
    res.render("pages/productos/form", {
      title: "Editar Producto",
      activeMenu: "productos",
      producto: response.data,
      action: `/productos/${req.params.id}?_method=PUT`,
      method: "POST",
    })
  } catch (error) {
    res.redirect("/productos?error=Producto no encontrado")
  }
})

// Actualizar producto
router.put("/:id", async (req, res) => {
  try {
    await apiClient.put(`/productos/${req.params.id}`, {
      name: req.body.nombre,
      cont: req.body.contenido,
      avai: req.body.disponible === "on",
    })
    res.redirect("/productos?success=Producto actualizado exitosamente")
  } catch (error) {
    res.redirect("/productos?error=Error al actualizar el producto")
  }
})

// Eliminar producto
router.delete("/:id", async (req, res) => {
  try {
    await apiClient.delete(`/productos/${req.params.id}`)
    res.redirect("/productos?success=Producto eliminado exitosamente")
  } catch (error) {
    res.redirect("/productos?error=Error al eliminar el producto")
  }
})

module.exports = router
