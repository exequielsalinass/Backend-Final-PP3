import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

function NuevoPassword() {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [tokenValido, setTokenValido] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [passwordModificado, setPasswordModificado] = useState(false);

  const params = useParams();
  const { token } = params;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = `/usuarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setTimeout(() => {
        setAlerta({});
        setPassword("");
        setPassword2("");
      }, 4000);
      setPasswordModificado(true);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/usuarios/olvide-password/${token}`);
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    comprobarToken();
  }, []);

  const { msg } = alerta;

  return (
    <>
      <div className="container md:max-w-screen-md">
        <h1 className="text-sky-600 font-black text-center text-6xl mt-16 capitalize">
          Reestablece tu contraseña y administra tus{" "}
          <span className="text-slate-700">Tareas</span>
        </h1>

        {msg && <Alerta alerta={alerta} />}

        {tokenValido && (
          <form
            className="my-10 bg-white shadow rounded-lg p-10 "
            onSubmit={handleSubmit}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>

            <input
              type="submit"
              value="Guardar nueva contraseña"
              className="mb-5 bg-sky-700 w-full py-3 text-white uppercase border rounded-md hover:bg-sky-800 font-bold hover:cursor-pointer transition-colors"
            />

            {password && (
              <ul className="grid justify-start mb-2 ml-2 text-sm">
                <li
                  className={`${
                    password.length < 8 ? "text-red-600" : "text-green-600"
                  } flex gap-2`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                  Al menos 8 caracteres
                </li>
                <li
                  className={`${
                    !password.match(/[A-z]/) ? "text-red-600" : "text-green-600"
                  } flex gap-2 `}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                  Al menos una letra
                </li>
                <li
                  className={`${
                    !password.match(/[A-Z]/) ? "text-red-600" : "text-green-600"
                  } flex gap-2`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                  Al menos una mayúscula
                </li>
                <li
                  className={`${
                    !password.match(/\d/) ? "text-red-600" : "text-green-600"
                  } flex gap-2`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                  Al menos un número
                </li>
              </ul>
            )}
          </form>
        )}

        {passwordModificado && (
          <Link
            className="block text-center text-slate-500 uppercase text-sm"
            to="/"
          >
            <span className="font-bold">Inicia sesión</span>
          </Link>
        )}
      </div>
    </>
  );
}

export default NuevoPassword;
