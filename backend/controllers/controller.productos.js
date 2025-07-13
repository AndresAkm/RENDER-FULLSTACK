const modelProductos = require("../models/productos.model")

exports.listarProductos = async (req, res) => {
  try {
    const listarProductos = await modelProductos.find()
    if (listarProductos.length > 0) res.status(200).json(listarProductos)
    else res.status(404).json({ error: "No se encontraron productos registrados" })
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor", details: error.message })
  }
}

exports.listarProductosPorId = async (req, res) => {
  try {
    const listarProductosPorId = await modelProductos.findOne({ _id: req.params.id })
    if (listarProductosPorId) res.status(200).json(listarProductosPorId)
    else res.status(404).json({ error: "No se encontró este producto" })
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor", details: error.message })
  }
}

exports.nuevoProducto = async (req, res) => {
  try {
    const nuevoProducto = {
      nombre: req.body.name,
      contenido: req.body.cont,
      disponible: req.body.avai,
    }

    const agregarProducto = await modelProductos.create(nuevoProducto)
    if (agregarProducto) res.status(201).json({ mensaje: "Producto agregado correctamente", producto: agregarProducto })
    else res.status(400).json({ mensaje: "No se pudo agregar el producto" })
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor", details: error.message })
  }
}

exports.editarProducto = async (req, res) => {
  try {
    const productoEditado = {
      nombre: req.body.name,
      contenido: req.body.cont,
      disponible: req.body.avai,
    }

    const actualizar = await modelProductos.findOneAndUpdate({ _id: req.params.id }, productoEditado, { new: true })
    if (actualizar) res.status(200).json({ mensaje: "Producto actualizado correctamente", producto: actualizar })
    else res.status(404).json({ mensaje: "Producto no encontrado" })
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor", details: error.message })
  }
}

exports.eliminarProducto = async (req, res) => {
  try {
    const eliminarProducto = await modelProductos.findOneAndDelete({ _id: req.params.id })
    if (eliminarProducto) res.status(200).json({ mensaje: "Producto eliminado correctamente" })
    else res.status(404).json({ mensaje: "Producto no encontrado" })
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor", details: error.message })
  }
}
