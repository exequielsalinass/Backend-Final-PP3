import Usuario from '../models/Usuario.js'
import generarId from '../helpers/generarId.js'
import generarJWT from "../helpers/generarJWT.js";

// CREAR UN NUEVO USUARIO Y REGISTRARLO EN LA BD

const registrar = async (req, res) => {                         //* req: datos que envio || res: datos que obtengo
  // Evitar registros duplicados
  const { email } = req.body;                               
  const existeUsuario = await Usuario.findOne({ email });

  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const usuario = new Usuario(req.body);      //* son los datos que mando por postman
    usuario.token = generarId();
    await usuario.save();

    /* //* Enviar el email de confirmacion
    emailRegistro({
      email: usuario.email,
      nombre: usuario.nombre,
      token: usuario.token,
    }); */

    res.json({
      msg: "Usuario creado correctamente, revisa tu email para confirmar tu cuenta",
    });
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;
  //Comprobar si el usuario existe
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El Usuario no existe");
    return res.status(404).json({ msg: error.message });
  }
  //Comprobar que el usuario este confirmado
  if (!usuario.confirmado) {
    const error = new Error("Tu cuenta no ha sido confirmada");
    return res.status(403).json({ msg: error.message });
  }
  //Comprobar su password
  if (await usuario.comprobarPassword(password)) {
    // creo un objeto con los datos que necesito, si no me devuelvo todo el objecto de usuario
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error("El password es incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};

const confirmar = async (req, res) => {
  const { token } = req.params;
  const usuarioConfirmar = await Usuario.findOne({ token });
  if (!usuarioConfirmar) {                                    //* == si no existe el usuarioConfirmar
    const error = new Error("Token no válido");
    return res.status(403).json({ msg: error.message });
  }

  try {
    usuarioConfirmar.confirmado = true;
    usuarioConfirmar.token = "";
    await usuarioConfirmar.save();
    res.json({ msg: "Usuario Confirmado Correctamente" });
  } catch (error) {
    console.log(error);
  }
};

export { registrar, autenticar, confirmar }