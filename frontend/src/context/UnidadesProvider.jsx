import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const UnidadContext = createContext();

const UnidadesProvider = ({ children }) => {
  const [unidades, setUnidades] = useState([]);
  const [unidad, setUnidad] = useState({});
  const [alerta, setAlerta] = useState({});
  const [cargando, setCargando] = useState(false);
  const [modalFormularioTarea, setModalFormularioTarea] = useState(false);
  const [tarea, setTarea] = useState({});

  const navigate = useNavigate();

  const { auth } = useAuth(); //Porque sino no me carga el contenido cuando inicio sesion

  useEffect(() => {
    const obtenerUnidades = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clienteAxios("/unidades", config);
        setUnidades(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerUnidades();
  }, [auth]);

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);

    setTimeout(() => {
      setAlerta({});
    }, 5000);
  };

  const submitUnidad = async (unidad) => {
    if (unidad.id) {
      await editarUnidad(unidad);
    } else {
      await nuevaUnidad(unidad);
    }
  };

  const editarUnidad = async (unidad) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.put(
        `/unidades/${unidad.id}`,
        unidad,
        config
      );
      // Sincronizar el state
      const unidadesActualizadas = unidades.map((unidadState) =>
        unidadState._id === data._id ? data : unidadState
      );
      setUnidades(unidadesActualizadas);

      // Mostrar el mensaje de alerta
      setAlerta({
        msg: "Unidad Actualizada Correctamente",
        error: false,
      });

      // Redireccionar
      setTimeout(() => {
        setAlerta({});
        navigate("/unidades");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const nuevaUnidad = async (unidad) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post("/unidades", unidad, config);

      setUnidades([...unidades, data]); //Tomo una copia de las unidades actuales y le agrego data

      setAlerta({
        msg: "Unidad Creada Correctamente",
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/unidades");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerUnidad = async (id) => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios(`/unidades/${id}`, config);
      setUnidad(data);
      setAlerta({});
    } catch (error) {
      navigate("/unidades");
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    }
    setCargando(false);
  };

  const eliminarUnidad = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.delete(`/unidades/${id}`, config);

      //Sincronizar el state
      const unidadesActualizadas = unidades.filter(
        (unidadState) => unidadState._id !== id
      );
      setUnidades(unidadesActualizadas);

      setAlerta({
        msg: data.msg,
        error: false,
      });

      setTimeout(() => {
        setAlerta({});
        navigate("/unidades");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const cerrarSesionUnidades = () => {
    setUnidades([]);
    setUnidad({});
    setAlerta({});
  };

  const handleModalTarea = () => {
    setModalFormularioTarea(!modalFormularioTarea);
    setTarea({});
  };

  const submitTarea = async (tarea) => {
    if (tarea?.id) {
      await editarTarea(tarea);
    } else {
      await crearTarea(tarea);
    }
  };

  const crearTarea = async (tarea) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post("/tareas", tarea, config);

      // Agregar la tarea al state
      const unidadActualizada = { ...unidad };            //* Copia del objeto: unidad
      unidadActualizada.tareas = [...unidad.tareas, data];  //* Es un array porque tareas es una array -> le agrego data (tarea creada)

      setUnidad(unidadActualizada);
      setAlerta({});
      setModalFormularioTarea(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalEditarTarea = (tarea) => {
    setTarea(tarea);
    setModalFormularioTarea(true);
  };

  /* const editarTarea = async (tarea) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.put(
        `/tareas/${tarea.id}`,
        tarea,
        config
      );

      const proyectoActualizado = { ...proyecto };
      proyectoActualizado.tareas = proyectoActualizado.tareas.map(
        (tareaState) => (tareaState._id === data._id ? data : tareaState)
      );
      setProyecto(proyectoActualizado);

      setAlerta({});
      setModalFormularioTarea(false);
    } catch (error) {
      console.log(error);
    }
  }; */

  return (
    <UnidadContext.Provider
      value={{
        unidades,
        mostrarAlerta,
        alerta,
        submitUnidad,
        obtenerUnidad,
        unidad,
        cargando,
        eliminarUnidad,
        cerrarSesionUnidades,
        modalFormularioTarea,
        handleModalTarea,
        submitTarea,
        tarea,
        handleModalEditarTarea
      }}
    >
      {children}
    </UnidadContext.Provider>
  );
};

export { UnidadesProvider };

export default UnidadContext;
