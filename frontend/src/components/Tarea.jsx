import { formatearFecha } from "../helpers/fecha.js";
import useUnidades from "../hooks/useUnidades.jsx";

function Tarea({ tarea }) {
  const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } =
    useUnidades();

  const { descripcion, nombre, ejercicio, fechaEntrega, estado, _id } = tarea;

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div className="flex flex-col items-start">
        <p className=" mb-2 text-xl font-bold">{nombre}</p>
        <p className=" mb-2 text-sm text-gray-500 uppercase font-medium">{descripcion}</p>
        <p className=" mb-2 text-sm font-medium uppercase">
            Fecha de Entrega: {" "}
          {formatearFecha(fechaEntrega)}
        </p>
        <p className=" mb-2 mr-3 text-gray-600 flex gap-2 items-center  justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>{" "}
          <a href={ejercicio} className="text-sky-700 cursor-pointer underline">{ejercicio}</a>
        </p>
        {estado && (
          <p className="text-xs bg-green-500 uppercase p-1 rounded-lg text-white">
            Completada por: {tarea.completado.nombre}
          </p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-2">
        {/*  {admin && ( */}
        <button
          onClick={() => handleModalEditarTarea(tarea)}
          className="bg-indigo-600 hover:bg-indigo-700 transition-colors px-4 py-3 text-white uppercase font-bold text-sm rounded-lg cursor-pointer"
        >
          Editar
        </button>
        {/*  )} */}

        <button
          onClick={() => completarTarea(_id)}
          className={`${
            estado ? "bg-sky-600" : "bg-gray-600"
          } px-4 py-3 text-white uppercase font-bold text-sm rounded-lg cursor-pointer`}
        >
          {estado ? "Completa" : "Incompleta"}
        </button>

        {/* {admin && ( */}
        <button
          className="bg-red-600 hover:bg-red-700 transition-colors px-4 py-3 text-white uppercase font-bold text-sm rounded-lg cursor-pointer"
          onClick={() => handleModalEliminarTarea(tarea)}
        >
          Eliminar
        </button>
        {/*  )} */}
      </div>
    </div>
  );
}

export default Tarea;
