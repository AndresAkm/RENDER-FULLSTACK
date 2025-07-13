const modelUsuario = require("../models/usuarios.model")

const listarUsuarios = async (req, res) => {
  try {
    const listarUsuarios = await modelUsuario.find()
    if (listarUsuarios.length > 0) res.status(200).json(listarUsuarios)
    else res.status(404).json({ mensaje: "No se encontraron usuarios registrados" })
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor", details: error.message })
  }
}

const listarUsuarioPorId = async (req, res) => {
  try {
    const listarUsuarioPorId = await modelUsuario.findOne({ _id: req.params.id })
    if (listarUsuarioPorId) res.status(200).json(listarUsuarioPorId)
    else res.status(404).json({ mensaje: "No se encontró este usuario" })
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor", details: error.message })
  }
}

const nuevoUsuario = async (req, res) => {
  try {
    const nuevoUsuario = {
      nombre: req.body.name,
      email: req.body.email,
      contraseña: req.body.pass,
    }

    const crearUsuario = await modelUsuario.create(nuevoUsuario)
    if (crearUsuario) res.status(201).json({ mensaje: "Usuario creado con éxito", usuario: crearUsuario })
    else res.status(400).json({ mensaje: "No se pudo crear el nuevo usuario" })
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor", details: error.message })
  }
}

const editarUsuario = async (req, res) => {
  try {
    const editarUsuario = {
      nombre: req.body.name,
      email: req.body.email,
      contraseña: req.body.pass,
    }

    const actualizar = await modelUsuario.findOneAndUpdate({ _id: req.params.id }, editarUsuario, { new: true })
    if (actualizar) res.status(200).json({ mensaje: "Usuario actualizado con éxito", usuario: actualizar })
    else res.status(404).json({ mensaje: "Usuario no encontrado" })
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor", details: error.message })
  }
}

const eliminarUsuario = async (req, res) => {
  try {
    const eliminarUsuario = await modelUsuario.findOneAndDelete({ _id: req.params.id })
    if (eliminarUsuario) res.status(200).json({ mensaje: "Usuario eliminado con éxito" })
    else res.status(404).json({ mensaje: "Usuario no encontrado" })
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor", details: error.message })
  }
}

module.exports = {
  listarUsuarios,
  listarUsuarioPorId,
  nuevoUsuario,
  editarUsuario,
  eliminarUsuario,
}
