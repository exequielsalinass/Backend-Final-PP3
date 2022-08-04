## GUIA DEL BACKEND

> Para ejecutar nuestro servidor usamos en consola el comando ``npm run dev``

### Librerias

1. Node
2. Express (Peticiones HTTP)
3. Nodemon (Ejecutar el codigo de forma automatica)
4. Mongoose (Para simplificar la llamada a la base de datos)
5. Dotenv (Para crear variables de entorno)

### Modificaciones en package.json

a. Agregamos module, para tener la sintaxis de import

### Estructura del diseño del backend

> Index.js

Configuracion del servidor.

> Carpeta Config

1. db.js : Posee el código de conexión a la base de datos 

> .env

Creado para ocultar datos sensibles en variables de entorno.

----------------------------------------------------------------------

### El *Patrón de Arquitectura* utilizado es el **Model View Controller**

Es el patrón de arquitectura más común y se utiliza en casi todos los lenguajes de programación.

> Ventajas:

1. Código ordenado
2. Todos lo implementan

Partes en la que se divide:

1. Models: encargado de consultar la base de datos pero no muestra los resultados en pantalla.
2. Vista: transmite todo lo obtenido a la pantalla.
3. Controllers: define la funcionalidad que va a comuniar el routing con los modelos.


---------------------------------------------------------------------

### Models

Dentro de la carpeta Models, creamos el archivo Usuario.js, este posee el 'Schema' de los usuarios.


### Routing

Dentro de la carpeta Routes creamos el archivo usuariosRoutes.js, aquí es donde definimos las diferentes peticiones HTTP (get, post, put, delete, patch)

### Controller

Dentro de la carpeta Controller creamos el archivo usuarioController.js, aquí definimos la funcionalidad que va a comunicar Usuario.js con usuarioRoutes.js

--------------------------------------------------------------------

Nuestro siguiente paso fue habilitar en el index.js (que tiene la configuración de nuestro servidor) a que pueda procesar información que recibe en formarto ``.json`` con la siguiente línea de código: ``app.use(express.json())``



