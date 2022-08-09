import { Link } from "react-router-dom";

function OlvidePassword() {
  return (
    <>
      <section className="h-screen">
        <div className="container  px-6 py-12 h-screen">
          <div className="flex  justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0 ">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="w-full"
                alt="Phone image"
              />
            </div>
            <div className="md:w-8/12 lg:w-5/12 lg:ml-20 ">

            <h1 className="text-sky-600 font-black text-6xl text-center capitalize">
        Recupere su contraseña y administre sus{" "}
        <span className="text-slate-700">Tareas</span>
      </h1>

      {/* {msg && <Alerta alerta={alerta} />} */}

      <form
        className="my-10 bg-white shadow rounded-lg p-10"
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
            onChange={(e) => setEmail(e.target.value)} */
          />
        </div>

        <input
          type="submit"
          value="Enviar Instrucciones"
          className="mb-5 bg-sky-700 w-full py-3 text-white uppercase border rounded-md hover:bg-sky-800 font-bold hover:cursor-pointer transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          ¿Ya tienes una cuenta? <span className="font-bold">Inicia sesión</span>
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/registrar"
        >
          ¿No tienes una cuenta? <span className="font-bold">Regístrate</span>
        </Link>
      </nav>


            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default OlvidePassword