import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

function Registrar() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([nombre, email, password, repetirPassword].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({
        msg: "Las contraseñas deben ser iguales",
        error: true,
      });
    }

    setAlerta({});

    //Crear el usuario en la API

    try {
      const { data } = await clienteAxios.post(`/usuarios`, {
        nombre,
        email,
        password,
      });

      setAlerta({
        msg: data.msg,
        error: false,
      });

      setNombre("");
      setEmail("");
      setPassword("");
      setRepetirPassword("");
    } catch (error) {
      // console.log()  //*Documentacion de axios
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

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
                Crea tu Cuenta y administra tus{" "}
                <span className="text-slate-700">Tareas</span>
              </h1>

              {msg && <Alerta alerta={alerta} />}

              <form
                className="mt-10 mb-5 bg-white shadow rounded-lg p-10"
                onSubmit={handleSubmit}
              >
                <div className="my-5">
                  <label
                    className="uppercase text-gray-600 block text-xl font-bold"
                    htmlFor="nombre"
                  >
                    Nombre:
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    placeholder="Tu Nombre"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    placeholder="Ingresa tu Contraseña"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="my-5">
                  <label
                    className="uppercase text-gray-600 block text-xl font-bold"
                    htmlFor="password2"
                  >
                    Repite tu Contraseña:
                  </label>
                  <input
                    id="password2"
                    type="password"
                    placeholder="Repite tu Contraseña"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={repetirPassword}
                    onChange={(e) => setRepetirPassword(e.target.value)}
                  />
                </div>

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
                        !password.match(/[A-z]/)
                          ? "text-red-600"
                          : "text-green-600"
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
                        !password.match(/[A-Z]/)
                          ? "text-red-600"
                          : "text-green-600"
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
                        !password.match(/\d/)
                          ? "text-red-600"
                          : "text-green-600"
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

                <input
                  type="submit"
                  value="Crear Cuenta"
                  className="bg-sky-700 w-full py-3 text-white uppercase border rounded-md hover:bg-sky-800 font-bold hover:cursor-pointer transition-colors"
                />
              </form>

              <nav className="lg:flex lg:justify-center">
                <Link
                  className="block text-center my-3 text-slate-500 uppercase text-sm"
                  to="/"
                >
                  ¿Ya tienes una cuenta?{" "}
                  <span className="font-bold"> Inicia sesión</span>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Registrar;
