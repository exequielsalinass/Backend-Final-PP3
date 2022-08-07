import Unidad from "../models/Unidad.js";
import Usuario from "../models/Usuario.js";

const obtenerUnidades = async (req, res) => {
  const unidades = await Unidad.find({
    $or: [{ alumnos: { $in: req.usuario } }, { creador: { $in: req.usuario } }],
  }); /* .select("-tareas"); */

  res.json(unidades);
};

const nuevaUnidad = async (req, res) => {
  const unidad = new Unidad(req.body);
  unidad.creador = req.usuario._id;

  try {
    const unidadAlmacenada = await unidad.save();
    res.json(unidadAlmacenada);
  } catch (error) {
    console.log(error);
  }
};

const obtenerUnidad = async (req, res) => {
  const { id } = req.params;

  const unidad = await Unidad.findById(id);
  /* .populate({ path: 'tareas', populate: {path: 'completado', select: 'nombre'} })
    .populate("alumnos", "nombre email"); */

  if (!unidad) {
    const error = new Error("No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (unidad.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("No tienes permiso");
    return res.status(401).json({ msg: error.message });
  }

  res.json(unidad);
};

const editarUnidad = async (req, res) => {
  const { id } = req.params;

  const unidad = await Unidad.findById(id);

  if (!unidad) {
    const error = new Error("No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (unidad.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("No tienes permiso");
    return res.status(401).json({ msg: error.message });
  }

  unidad.nombre = req.body.nombre || unidad.nombre;       //* Si el usuario envia algo mediante req.body lo guardamos y sino guarda lo que ya existe
  unidad.descripcion = req.body.descripcion || unidad.descripcion;
  unidad.fechaEntrega = req.body.fechaEntrega || unidad.fechaEntrega;
  unidad.nivel = req.body.nivel || unidad.nivel;

  try {
    const unidadAlmacenada = await unidad.save();
    res.json(unidadAlmacenada);
  } catch (error) {
    console.log(error);
  }
};

const eliminarUnidad = async (req, res) => {

  const { id } = req.params;

  const unidad = await Unidad.findById(id);

  if (!unidad) {
    const error = new Error("No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (unidad.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("No tienes permiso");
    return res.status(401).json({ msg: error.message });
  }

  try {
    await unidad.deleteOne(); //metodo de mongoose
    res.json({ msg: "Unidad Eliminada" });
  } catch (error) {
    console.log(error);
  }
};

const buscarAlumno = async (req, res) => {
  /* const { email } = req.body;

  const usuario = await Usuario.findOne({ email }).select(
    "-confirmado -createdAt -password -token -updatedAt -__v"
  ); //* findOne --> para encontrar un campo --/ Email

  if (!usuario) {
    const error = new Error("Usuario no encontrado");
    return res.status(404).json({ msg: error.message });
  }

  res.json(usuario); */
};

const agregarAlumno = async (req, res) => {
  /* const proyecto = await Proyecto.findById(req.params.id);

  if (!proyecto) {
    const error = new Error("Proyecto No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción no válida");
    return res.status(404).json({ msg: error.message });
  }

  const { email } = req.body;

  const usuario = await Usuario.findOne({ email }).select(
    "-confirmado -createdAt -password -token -updatedAt -__v"
  ); //* findOne --> para encontrar un campo --/ Email

  if (!usuario) {
    const error = new Error("Usuario no encontrado");
    return res.status(404).json({ msg: error.message });
  }

  // El colaborador no es el admin del proyecto.

  if (proyecto.creador.toString() === usuario._id.toString()) {
    const error = new Error("El creador del proyecto no puede ser colaborador");
    return res.status(404).json({ msg: error.message });
  }

  // Revisar que no este agregado al proyecto

  if (proyecto.colaboradores.includes(usuario._id)) {
    const error = new Error("El usuario ya pertenece al proyecto");
    return res.status(404).json({ msg: error.message });
  }

  //Esta ok, se puede agregar
  proyecto.colaboradores.push(usuario._id);
  await proyecto.save();
  res.json({ msg: "Colaborador agregado correctamente" }); */
};

const eliminarAlumno = async (req, res) => {
  /* const proyecto = await Proyecto.findById(req.params.id);

  if (!proyecto) {
    const error = new Error("Proyecto No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción no válida");
    return res.status(404).json({ msg: error.message });
  }

  //Esta ok, se puede eliminar
  proyecto.colaboradores.pull(req.body.id);
  await proyecto.save();
  res.json({ msg: "Colaborador eliminado correctamente" }); */
};

export {
  obtenerUnidades,
  obtenerUnidad,
  nuevaUnidad,
  editarUnidad,
  eliminarUnidad,
  buscarAlumno,
  eliminarAlumno,
  agregarAlumno,
};
