import { useEffect } from "react";
import useUnidades from "../hooks/useUnidades";
import { useParams } from "react-router-dom";
import FormularioUnidad from "../components/FormularioUnidad";
import Spinner from "../components/Spinner";

function EditarUnidad() {
  const params = useParams();
  const { obtenerUnidad, unidad, cargando, eliminarUnidad } = useUnidades();

  useEffect(() => {
    obtenerUnidad(params.id);
  }, []);

  const handleClick = () => {
    if (confirm("¿Deseas eliminar esta unidad?")) {
      eliminarUnidad(params.id);
    }
  };

  const { nombre, nivel } = unidad;

  if (cargando) return <Spinner />;

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-black text-3xl">
          <span className="font-normal">Editar:</span> {nombre}
          <span className="ml-2 font-light text-sky-700">{nivel}</span>
        </h1>
        <div className="flex items-center gap-2 text-gray-400 hover:text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          <button className="uppercase font-bold" onClick={handleClick}>
            Eliminar
          </button>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <FormularioUnidad />
      </div>
    </>
  );
}

export default EditarUnidad;
