## GUIA DEL BACKEND

> Para ejecutar nuestro servidor usamos en consola el comando ``npm run dev``

### Librerias

1. Node
2. Express (Peticiones HTTP)
3. Nodemon (Ejecutar el codigo de forma automatica)
4. Mongoose (Para simplificar la llamada a la base de datos)
5. Dotenv (Para crear variables de entorno)
6. Bcrypt (Hashear passwords)
7. Jsonwebtoken (Generar el token)

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

--------------------------------------------------------------------

Luego se creó el código para evitar usuarios duplicados.

```javascript
const registrar = async (req, res) => { 
  const { email } = req.body;                               
  const existeUsuario = await Usuario.findOne({ email });

  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const usuario = new Usuario(req.body);   
    usuario.token = generarId();
    await usuario.save();
    res.json({
      msg: "Usuario creado correctamente, revisa tu email para confirmar tu cuenta",
    });
  } catch (error) {
    console.log(error);
  }
};
```

-----------------------------------------------------------------------

Lo siguiente fue **hashear** las contraseñas. Para eso instalamos la dependencia de *bcrypt*.

Esta librería nos sirve tanto para hashear un password como también para comparar una cadena de string con otra cadena de string hasheada.

Lo importamos en ``Usuario.js`` y hacemos uso de uno de sus hooks (pre)

```javascript
usuarioSchema.pre('save', async function(next){ 
  if(!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
})
```
El código anterior se encarga de comprobrar el que password no se haya modificado con el método que nos da mongoose (``isModified``), dado que si no hacemos esto se vuelve a hashear el string que ya estaba hasheado y el usuario perderá el acceso a su cuenta.

------------------------------------------------------------------------

Generar el id: creamos en la carpeta ``helpers`` el archivo ``generarId.js``, aquí diseñamos una función que nos de una cadena de string totalmente aleatoria.
Esta función la usamos en ``usuarioController.js`` para cambiar el id por la cadena que nosotros designamos gracias a la funcion ``generarId.js``

------------------------------------------------------------------------

Validamos la autenticación del usuario: 
1. Usuario existe
2. Usuario esta o no confirmado
3. Comprobar el password

Para comprobar el password generamos la siguientes líneas de código en ``Usuario.js``

```javascript
usuarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.password)   
} 
```

Esto nos retorna true o false, como mencione anteriormente *bcrypt* nos permite comparar una cadena sin hashear con una hasheada (``compare``)

-----------------------------------------------------------------------------------------------

Generar el Json Web Token: en primer lugar instalamos la dependencia ``jsonwebtoken``.

Creamos el archivo ``generarJWT.js`` en la carpeta ``helpers`` , aquí vamos a diseñar la función que nos genere un **JWT**.

```javascript
const generarJWT = (id) => {
    return jwt.sign({ id }, process.env.JTW_SECRET, {
        expiresIn: '30d',
    })
}
```

El metodo ``sing`` nos permite generar un token, los parámetros que recibe son los siguientes:

1. Un objetos con los datos que va a colocar en el jwt
2. Clave de seguridad (guardada en las variables de entorno)
3. Un objeto con la configuración deseada

----------------------------------------------------------------

Confirmar cuentas: Por primera vez creamos nuestro routing dinámico ¿que quiere decir?, que nuestra ruta puede soportar multiples valores.

``` javascript
router.get("/confirmar/:token", confirmar);
```

``:token`` nos genera el routing dinámico.

Luego validamos: primero extraemos el *token* de ``req.params``, para luego saber si el token del usuario existe o no.
Si el token que tenemos como respuesta es válido, entonces lo que haremos es cambiar al usuario.confirmado como ``true``, y por último eliminamos el *token*

-----------------------------------------------------------------------

Recuperar password: validamos mediante el email si el usuario existe, luego generamos de vuelta el token. Para más adelante crear el algoritmo de enviar el token por email.

-----------------------------------------------------------------------------

Comprobar token: creamos otro routing dinámico. 

```javascript
router.get("/olvide-password/:token", comprobarToken); 
```

Validamos que el token sea correcto.

-------------------------------------------------------------------------

Generar nuevo password: Obtenemos el password y el password2 del formulario, lo almacenamos como un nuevo password y convertimos el token en un string vacio

La ruta dinamica es: 

```javascript
router.post("/olvide-password/:token", nuevoPassword); 
```

--------------------------------------------------------------------------

Creamos un "Custom Middleware" para la autenticación.

1. Creamos la carpeta middleware
2. Dentro de la carpeta creamos el archivo ```checkAuth.js`` 
3. Creamos un nueva ruta que determina mediante la funcion ``chechAuth`` que todo este bien, para luego permitirle al usuario tener acceso a su perfil (de esta forma protegemos esa ruta)

> CheckAuth

Valida que el JTW sea válido y que este enviado vía *Barer* y *header* , si todo esta bien, con ``next()`` hacemos que pase al siguiente middleware -> ``perfil``

--------------------------------------------------------------------------






