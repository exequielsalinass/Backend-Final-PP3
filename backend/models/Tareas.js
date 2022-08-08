import mongoose from "mongoose";

const tareasSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: true,
    },
    descripcion: {
      type: String,
      trim: true,
      required: true,
    },
    estado: {
      type: Boolean,
      default: false,
    },
    ejercicio: {
        type: String,
        trim: true,
        required: true,
      },
    fechaEntrega: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    unidad: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unidad",
    },
    /* completado: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    }, */
  },
  {
    timestamps: true,
  }
);

const Tareas = mongoose.model("Tarea", tareasSchema);
export default Tareas;