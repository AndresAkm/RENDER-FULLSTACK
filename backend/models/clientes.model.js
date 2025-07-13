const mongoose = require("../config/connectiondb")

const schemaCliente = new mongoose.Schema(
  {
    documento: {
      type: String,
      required: [true, "El documento es obligatorio"],
      minLength: [7, "El documento es demasiado corto"],
      maxLength: [10, "El documento es demasiado largo"],
      unique: true,
    },
    nombreCompleto: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },
    fNacimiento: {
      type: String,
      required: [true, "La fecha de nacimiento es obligatoria"],
      minLength: 10,
      maxLength: 10,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
)

const cliente = mongoose.model("clientes", schemaCliente)
module.exports = cliente
