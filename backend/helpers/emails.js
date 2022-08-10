import nodemailer from 'nodemailer'

export const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Información del email
  // Para agregar estilos: forma linea de styles...

  const info = await transport.sendMail({
    from: '"LearningEnglish - Administrador de Tareas" <cuentas@learingenglish.com>',
    to: email,
    subject: "LearningEnglish - Comprueba tu cuenta",
    text: "Comprueba tu cuenta en LearningEnglish",
    html: `<p style="color:blue; font-size:20px;">Hola: ${nombre}, comprueba tu cuenta en LearningEnglish</p>
    <p>Tu cuenta ya esta casi lista, solo debes darle 'click' al siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
    </p>
    <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
    
    `,
  });
};

//*------------------------------------------------------------------------------------------//

export const emailOlvidePassword = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Información del email
  // Para agregar estilos: forma linea de styles...

  const info = await transport.sendMail({                                   // send metodo que envia el email
    from: '"LearningEnglish - Administrador de Tareas" <cuentas@learingenglish.com>',
    to: email,
    subject: "LearningEnglish - Restablece tu contraseña",
    text: "Restablece tu contraseña en LearningEnglish",
    html: `<p style="color:blue; font-size:20px;">Hola: ${nombre}, restablece tu contraseña en LearningEnglish</p>
    <p>Para generar un nuevo password, solo debes darle 'click' al siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablece tu contraseña</a>
    </p>
    <p>Si tu no solicitaste este email, puedes ignorar el mensaje</p>
    
    `,
  });
};
