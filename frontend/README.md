## GUIA DEL FRONTEND

> Para ejecutar nuestro servidor usamos en consola el comando ``npm run dev``

### Librerias

1. React-router-dom (Routing del proyecto)
2. Axios (Comunicarme con el backend)
3. Tailwind - postcss - autoprefixer (Estilos)

#### Primeros Pasos

Establezo el routing en App.jsx

El principal componente es el de área pública: ``<AuthLayout/>`` y también más adelante tendremos el área privada.

Creo el área pública : ``<AuthLayout/>`` 

Dentro del área pública tenemos las siguientes páginas:

1. ``<Login/>``
2. ``<Registrar/>``
3. ``<OlvidePassword/>``
4. ``<NuevoPassword/>``
5. ``<ConfirmarCuenta/>``

Creo el diseño de cada interfaz.

Añado los state al formulario de regitrar. 
Valido el formulario, y puedo conectarme con el backend gracias a ``axios``

Instalo ``CORS`` en el backend para poder permitir el envio de informacion de un dominio a otro

Lo configuro en el index.js del backend

Creo las variables de entorno en el archivo ``.env``

También instalo ``nodemailer`` en el backend.

Configuro nodemailer y mailtrap en email.js (backend)

Envio el email desde ``usuarioController.js``



