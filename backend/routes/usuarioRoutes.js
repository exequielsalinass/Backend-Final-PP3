import express from "express";
const router = express.Router();

import {
  registrar,
  autenticar,
  confirmar,
  olvidePassword
} from "../controllers/usuarioController.js";


// Autenticación , Registro y Confirmación de Usuarios
router.post("/", registrar); //Crea un nuevo usuario
router.post("/login", autenticar); //Authentication
router.get("/confirmar/:token", confirmar); //Token
router.post("/olvide-password", olvidePassword); // Enviar instrucciones para cambiar el password
/* router.get("/olvide-password/:token", comprobarToken); // Validar el nuevo token
router.post("/olvide-password/:token", nuevoPassword); // Obtener el nuevo password
// router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword) //* Otra alternativa para las lineas 11 y 12
router.get("/perfil", checkAuth, perfil); */

export default router;
