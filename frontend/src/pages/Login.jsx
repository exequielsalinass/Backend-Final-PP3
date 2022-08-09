import { Link, useNavigate } from "react-router-dom";

function Login() {
  /* const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})

  // Importar datos del context
  const { setAuth } = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    if([email, password].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    try {
      const { data } = await clienteAxios.post('/usuarios/login', { email, password })
      setAlerta({})
      localStorage.setItem('token', data.token)
      setAuth(data)
      navigate('/proyectos')
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }

  }

  const { msg } = alerta */

  return (
    <>
      <section className="h-screen">
        <div className="container  px-6 py-12 h-screen">
          <h1 className="text-sky-600 text-center font-extrabold mb-4 uppercase text-6xl">
            ¡Bienvenido!
          </h1>
          <div className="flex  justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0 ">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="w-full"
                alt="Phone image"
              />
            </div>
            <div className="md:w-8/12 lg:w-5/12 lg:ml-20 ">
              {/* LOGIN HECHO POR MI */}
              <h1 className="text-sky-600 font-black text-6xl capitalize text-center">
                Inicia sesión y administra tus{" "}
                <span className="text-slate-700">Tareas</span>
              </h1>

              {/* { msg && <Alerta alerta={alerta} />} */}

              <form
                className="mt-10 mb-5 bg-white shadow rounded-lg p-10 "
                /* onSubmit={handleSubmit} */
              >
                <div className="my-5">
                  <label
                    className="uppercase text-gray-600 block text-xl font-bold"
                    htmlFor="email"
                  >
                    Email:
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email de Registro"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    /* value={email}
                        onChange={e => setEmail(e.target.value)} */
                  />
                </div>
                <div className="my-5">
                  <label
                    className="uppercase text-gray-600 block text-xl font-bold"
                    htmlFor="password"
                  >
                    Contraseña:
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Password de Registro"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    /* value={password}
                    onChange={(e) => setPassword(e.target.value)} */
                  />
                </div>

                <div className="form-group form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-sky-600 checked:border-sky-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  />
                  <label className="form-check-label inline-block text-gray-800">
                    Recuérdame
                  </label>
                </div>

                <input
                  type="submit"
                  value="Iniciar Sesión"
                  className="mb-5 bg-sky-700 w-full py-3 text-white uppercase border rounded-md hover:bg-sky-800 font-bold hover:cursor-pointer transition-colors"
                />
              </form>

              <nav className="lg:flex lg:justify-between">
                <Link
                  className="block text-center my-5 text-slate-500 uppercase text-sm"
                  to="/registrar"
                >
                  ¿No tienes una cuenta?{" "}
                  <span className="font-bold">Regístrate</span>
                </Link>

                <Link
                  className="block text-center my-5 text-slate-500 uppercase text-sm"
                  to="/olvide-password"
                >
                  ¿Olvidó su contraseña?
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
