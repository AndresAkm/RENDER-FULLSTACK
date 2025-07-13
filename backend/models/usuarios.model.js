const mongoose = require("../config/connectiondb")

const schemaUsuarios = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
      minlength: [2, "El nombre debe tener al menos 2 caracteres"],
    },
    email: {
      type: String,
      required: [true, "El correo electrónico es obligatorio"],
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Debe ser un correo válido"],
    },
    contraseña: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

const usuario = mongoose.model("usuarios", schemaUsuarios)
module.exports = usuario
