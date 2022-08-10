import mongoose from "mongoose";

const unidadesSchema = mongoose.Schema(
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
    nivel: {
        type: String,
        required: true,
        enum: ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6"],
    },
    fechaInicio: {
      type: Date,
      default: Date.now(),
    },
    creador: {
      type: mongoose.Schema.Types.ObjectId,     //* La persona que crea el proyecto es la unica que puede asignar tareas
      ref: "Usuario",
    },
    tareas: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tarea",
      },
    ],
    alumnos: [        //* Es un arreglo porque una unidad puede tener múltiples alumnos
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Unidad = mongoose.model("Unidad", unidadesSchema);
export default Unidad;