import useUnidades from "../hooks/useUnidades";
/* import PreviewProyecto from "../components/PreviewProyecto"; */
import Alerta from "../components/Alerta";

function Unidades() {
  const { unidades /* alerta */ } = useUnidades();
  console.log(unidades)

  /* const { msg } = alerta */

  return (
    <>
      <h1 className="text-4xl text-sky-600 font-black uppercase">Unidades</h1>

      {/* { msg && <Alerta alerta={alerta} />} */}

      {/* <div className="bg-white shadow rounded-lg">
        {proyectos.length ? (
          proyectos.map( proyecto => (
              <PreviewProyecto
                key={proyecto._id}
                proyecto={proyecto}
              />
          ))
        ) : (
          <p className="mt-5 text-center text-gray-600 uppercase p-5">
            No Hay Proyectos
          </p>
        )}
      </div> */}
    </>
  )
}

export default Unidades