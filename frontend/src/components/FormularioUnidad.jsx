import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import useUnidades from "../hooks/useUnidades";
import Alerta from "./Alerta";

const niveles = ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6"];

function FormularioUnidad() {
  const [id, setId] = useState(null);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [nivel, setNivel] = useState("");

  const params = useParams()
  const { mostrarAlerta, alerta, submitUnidad, unidad } = useUnidades();


  useEffect(() => {
    if(params.id) {
      setId(unidad._id)
      setNombre(unidad.nombre)
      setDescripcion(unidad.descripcion)
      setFechaEntrega(unidad.fechaInicio?.split('T')[0])
      setNivel(unidad.nivel)
    } else {
      console.log('Nuevo Unidad')
    }
  }, [params])
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, descripcion, fechaEntrega, nivel].includes("")) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });

      return;
    }

    // Pasar los datos al provider
    await submitUnidad({ id, nombre, descripcion, fechaEntrega, nivel });

    setId(null)
    setNombre("");
    setDescripcion("");
    setFechaEntrega("");
    setNivel("");
  };

  const { msg } = alerta;

  return (
    <form
      className="bg-white py-10 px-5 md:w-3/4 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      {msg && <Alerta alerta={alerta} />}

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="nombre"
        >
          Nombre Unidad
        </label>

        <input
          id="nombre"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre de la Unidad"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="descripcion"
        >
          Descripción de la unidad
        </label>

        <textarea
          id="descripcion"
          className="border w-full h-80 p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Descripción de la Unidad"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="fecha-entrega"
        >
          Fecha de Creación
        </label>

        <input
          id="fecha-entrega"
          type="date"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={fechaEntrega}
          onChange={(e) => setFechaEntrega(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase text-sm font-bold"
          htmlFor="nivel"
        >
          Nivel o Año
        </label>
        <select
          id="nivel"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={nivel}
          onChange={(e) => setNivel(e.target.value)}
        >
          <option value="">-- Seleccionar --</option>
          {niveles.map((opcion) => (
            <option key={opcion}>{opcion}</option>
          ))}
        </select>
      </div>

      <input
        type="submit"
        value={id ? "Actualizar Unidad" : "Crear Unidad"}
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
      />
    </form>
  );
}

export default FormularioUnidad;
