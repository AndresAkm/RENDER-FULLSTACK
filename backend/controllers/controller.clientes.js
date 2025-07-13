const modelCliente = require("../models/clientes.model")

exports.listarClientes = async (req, res) => {
  try {
    const listaCliente = await modelCliente.find()
    if (listaCliente.length > 0) res.status(200).json(listaCliente)
    else res.status(404).json({ error: "No se encontraron clientes" })
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor", details: error.message })
  }
}

exports.listarClientePorId = async (req, res) => {
  try {
    const listaCliente = await modelCliente.findOne({ _id: req.params.id })
    if (listaCliente) res.status(200).json(listaCliente)
    else res.status(404).json({ error: "No se encontró el cliente" })
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor", details: error.message })
  }
}

exports.nuevoCliente = async (req, res) => {
  try {
    const nuevoCliente = {
      documento: req.body.doc,
      nombreCompleto: req.body.nc,
      fNacimiento: req.body.fn,
    }

    const insertarCliente = await modelCliente.create(nuevoCliente)
    if (insertarCliente) res.status(201).json({ mensaje: "Cliente registrado exitosamente", cliente: insertarCliente })
    else res.status(400).json({ mensaje: "No se pudo registrar el cliente" })
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor", details: error.message })
  }
}

exports.editarCliente = async (req, res) => {
  try {
    const clienteEditado = {
      documento: req.body.doc,
      nombreCompleto: req.body.nc,
      fNacimiento: req.body.fn,
    }

    const actualizacion = await modelCliente.findOneAndUpdate({ _id: req.params.id }, clienteEditado, { new: true })
    if (actualizacion) res.status(200).json({ mensaje: "Cliente actualizado exitosamente", cliente: actualizacion })
    else res.status(404).json({ mensaje: "Cliente no encontrado" })
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor", details: error.message })
  }
}

exports.eliminarCliente = async (req, res) => {
  try {
    const eliminacion = await modelCliente.findOneAndDelete({ _id: req.params.id })

    if (eliminacion) res.status(200).json({ mensaje: "Cliente eliminado exitosamente" })
    else res.status(404).json({ mensaje: "Cliente no encontrado" })
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor", details: error.message })
  }
}
