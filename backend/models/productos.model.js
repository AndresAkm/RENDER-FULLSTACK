const mongoose = require("../config/connectiondb")

const schemaProductos = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
    contenido: {
      type: String,
      required: [true, "El contenido es obligatorio"],
    },
    disponible: {
      type: Boolean,
      default: true,
      required: [true, "La disponibilidad es obligatoria"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

const productos = mongoose.model("Productos", schemaProductos)
module.exports = productos
