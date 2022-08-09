import { Link } from "react-router-dom";

function ConfirmarCuenta() {
  return (
    <>
      <div className="container md:max-w-screen-md">
      <h1 className="text-sky-600 font-black text-center text-6xl mt-16 capitalize">
        Confirma tu cuenta y administra tus{" "}
        <span className="text-slate-700">Tareas</span>
      </h1>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {/* {msg && <Alerta alerta={alerta} />}
        {cuentaConfirmada && ( */}
          <Link
            className="block text-center my-5 font-bold text-slate-500 uppercase text-sm"
            to="/"
          >
            Inicia sesión
          </Link>
        {/* )} */}
      </div>
      </div>
    </>
  )
}

export default ConfirmarCuenta