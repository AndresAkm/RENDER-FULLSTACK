const controladoresClientes = require("../controllers/controller.clientes")
const controladoresProductos = require("../controllers/controller.productos")
const {
  listarUsuarios,
  listarUsuarioPorId,
  nuevoUsuario,
  editarUsuario,
  eliminarUsuario,
} = require("../controllers/controller.usuarios")

const express = require("express")
const router = express.Router()

// Endpoints para clientes
router.get("/clientes", controladoresClientes.listarClientes)
router.get("/clientes/:id", controladoresClientes.listarClientePorId)
router.post("/clientes", controladoresClientes.nuevoCliente)
router.put("/clientes/:id", controladoresClientes.editarCliente)
router.delete("/clientes/:id", controladoresClientes.eliminarCliente)

// Endpoints para productos
router.get("/productos", controladoresProductos.listarProductos)
router.get("/productos/:id", controladoresProductos.listarProductosPorId)
router.post("/productos", controladoresProductos.nuevoProducto)
router.put("/productos/:id", controladoresProductos.editarProducto)
router.delete("/productos/:id", controladoresProductos.eliminarProducto)

// Endpoints para usuarios
router.get("/usuarios", listarUsuarios)
router.get("/usuarios/:id", listarUsuarioPorId)
router.post("/usuarios", nuevoUsuario)
router.put("/usuarios/:id", editarUsuario)
router.delete("/usuarios/:id", eliminarUsuario)

module.exports = router
