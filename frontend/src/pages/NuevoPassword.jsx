import { Link } from "react-router-dom";

function NuevoPassword() {
  return (
    <>
      <div className="container md:max-w-screen-md">
        <h1 className="text-sky-600 font-black text-center text-6xl mt-16 capitalize">
          Reestablece tu contraseña y administra tus{" "}
          <span className="text-slate-700">Tareas</span>
        </h1>

        {/* {msg && <Alerta alerta={alerta} />} */}

        {/* {tokenValido && ( */}
        <form
          className="my-10 bg-white shadow rounded-lg p-10 "
          /* onSubmit={handleSubmit} */
        >
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password"
            >
              Nueva Contraseña:
            </label>
            <input
              id="password"
              type="password"
              placeholder="Ingresa tu Contraseña"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              /* value={password}
              onChange={(e) => setPassword(e.target.value)} */
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password"
            >
              Repetir Contraseña:
            </label>
            <input
              id="password"
              type="password"
              placeholder="Ingresa tu Contraseña"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              /* value={password}
              onChange={(e) => setPassword(e.target.value)} */
            />
          </div>

          <input
            type="submit"
            value="Guardar nueva contraseña"
            className="mb-5 bg-sky-700 w-full py-3 text-white uppercase border rounded-md hover:bg-sky-800 font-bold hover:cursor-pointer transition-colors"
          />
        </form>
        {/* )} */}

        {/* {passwordModificado && ( */}
        <Link
          className="block text-center text-slate-500 uppercase text-sm"
          to="/"
        >
          ¿Ya tienes una cuenta?{" "}
          <span className="font-bold">Inicia sesión</span>
        </Link>
        {/* )} */}
      </div>
    </>
  );
}

export default NuevoPassword;
