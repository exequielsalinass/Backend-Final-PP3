import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";

function ConfirmarCuenta() {
  const [alerta, setAlerta] = useState({});
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

  const params = useParams(); // Para extraer el valor de la url
  const { id } = params;

  useEffect(() => {
    const confirmarCuentaToken = async () => {
      try {
        const url = `/usuarios/confirmar/${id}`;
        const { data } = await clienteAxios(url);

        setAlerta({
          msg: data.msg,
          error: false,
        });
        setTimeout(() => {
          setAlerta({});
        }, 4000);
        setCuentaConfirmada(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };

    confirmarCuentaToken();
  }, []);

  const { msg } = alerta;

  return (
    <>
      <div className="container md:max-w-screen-md">
        <h1 className="text-sky-600 font-black text-center text-6xl mt-16 capitalize">
          Confirma tu cuenta y administra tus{" "}
          <span className="text-slate-700">Tareas</span>
        </h1>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
          {msg && <Alerta alerta={alerta} />}
          {cuentaConfirmada && (
            <Link
              className="block text-center my-5 font-bold text-slate-500 uppercase text-sm"
              to="/"
            >
              Inicia Sesión
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default ConfirmarCuenta;
