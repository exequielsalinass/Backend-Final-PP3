import Unidad from "../models/Unidad.js";
import Tareas from "../models/Tareas.js";

const agregarTarea = async (req, res) => {
  const { unidad } = req.body;

  const existeUnidad = await Unidad.findById(unidad);

  if (!existeUnidad) {
    const error = new Error("La Unidad no existe");
    return res.status(404).json({ msg: error.message });
  }

  if (existeUnidad.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("No tienes permisos");
    return res.status(403).json({ msg: error.message });
  }

  try {
    const tareaAlmacenda = await Tareas.create(req.body);
    // Almacenar el id en la unidad
    existeUnidad.tareas.push(tareaAlmacenda._id);
    await existeUnidad.save();
    res.json(tareaAlmacenda);
  } catch (error) {
    console.log(error);
  }
};

const obtenerTarea = async (req, res) => {
  const { id } = req.params;

  const tarea = await Tareas.findById(id).populate("unidad");       //* Realizo dos consultas en la misma linea

  if (!tarea) {
    const error = new Error("Tarea no encontrada");
    return res.status(404).json({ msg: error.message });
  }

  if (tarea.unidad.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("No tienes permisos");
    return res.status(403).json({ msg: error.message });
  }

  res.json(tarea);
};

const actualizarTarea = async (req, res) => {
  const { id } = req.params;

  const tarea = await Tareas.findById(id).populate("unidad");

  if (!tarea) {
    const error = new Error("Tarea no encontrada");
    return res.status(404).json({ msg: error.message });
  }

  if (tarea.unidad.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("No tienes permisos");
    return res.status(403).json({ msg: error.message });
  }

  tarea.nombre = req.body.nombre || tarea.nombre;
  tarea.descripcion = req.body.descripcion || tarea.descripcion;
  tarea.ejercicio = req.body.ejercicio || tarea.ejercicio;
  tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega;

  try {
    const tareaAlmacenda = await tarea.save();
    res.json(tareaAlmacenda);
  } catch (error) {
    console.log(error);
  }
};

const eliminarTarea = async (req, res) => {
  const { id } = req.params;

  const tarea = await Tareas.findById(id).populate("unidad");

  if (!tarea) {
    const error = new Error("Tarea no encontrada");
    return res.status(404).json({ msg: error.message });
  }

  if (tarea.unidad.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("No tienes permisos");
    return res.status(403).json({ msg: error.message });
  }

  try {
    await tarea.deleteOne()
    res.json({ msg: "La tarea se elimino" });
  } catch (error) {
    console.log(error);
  }
};

const cambiarEstado = async (req, res) => {
  /* const { id } = req.params;

  const tarea = await Tareas.findById(id).populate("unidad");

  if (!tarea) {
    const error = new Error("Tarea no encontrada");
    return res.status(404).json({ msg: error.message });
  }

  if (
    tarea.unidad.creador.toString() !== req.usuario._id.toString() &&
    !tarea.unidad.alumnos.some(
      (colaborador) => colaborador._id.toString() === req.usuario._id.toString()
    )
  ) {
    const error = new Error("No tienes permisos");
    return res.status(403).json({ msg: error.message });
  }

  tarea.estado = !tarea.estado;
  tarea.completado = req.usuario._id;
  await tarea.save();

  const tareaAlmacenada = await Tareas.findById(id)
    .populate("unidad")
    .populate("completado");

  res.json(tareaAlmacenada); */
};

export {
  agregarTarea,
  obtenerTarea,
  actualizarTarea,
  eliminarTarea,
  cambiarEstado,
};
