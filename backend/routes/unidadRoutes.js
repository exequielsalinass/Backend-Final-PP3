import express from "express";
import {
    obtenerUnidades,
    obtenerUnidad,
    nuevaUnidad,
    editarUnidad,
    eliminarUnidad,
    buscarAlumno,
    eliminarAlumno,
    agregarAlumno,
} from "../controllers/unidadController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/", checkAuth, obtenerUnidades);
router.post("/", checkAuth, nuevaUnidad);

router
  .route("/:id")
  .get(checkAuth, obtenerUnidad)
  .put(checkAuth, editarUnidad)
  .delete(checkAuth, eliminarUnidad);

router.post("/colaboradores", checkAuth, buscarAlumno);
router.post("/colaboradores/:id", checkAuth, agregarAlumno);
router.post("/eliminar-colaborador/:id", checkAuth, eliminarAlumno);

export default router;