const mongoose = require("mongoose");

const tareaSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "El campo de texto es obligatorio"],
      minlength: [5, "El texto debe ser una oración válida"],
      maxlenth: [200, "El texto no puede contener más de 200 caracteres"],
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    prioridad: {
      type: String,
      enum: {
        values: ["baja", "media", "alta"],
        message: "La prioridad debe ser baja o media o alta",
      },
      default: "media",
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: [true, "La tarea debe estar asociada a un usuario"],
    },
  },
  { timestamps: true }, // createdAt y updatedAt
);

module.exports = mongoose.model("Tarea", tareaSchema);
