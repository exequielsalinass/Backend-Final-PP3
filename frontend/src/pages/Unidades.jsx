import useUnidades from "../hooks/useUnidades";
import PreviewUnidad from "../components/PreviewUnidad";
import Alerta from "../components/Alerta";

function Unidades() {
  const { unidades, alerta } = useUnidades();

  const { msg } = alerta

  return (
    <>
      <h1 className="text-4xl text-sky-600 font-black uppercase">Unidades</h1>

      { msg && <Alerta alerta={alerta} />}

      <div className="bg-white mt-5 border-t shadow rounded-lg">
        {unidades.length ? (
          unidades.map( unidad => (
              <PreviewUnidad
                key={unidad._id}
                unidad={unidad}
              />
          ))
        ) : (
          <p className="mt-5 text-center text-gray-600 uppercase p-5">
            No Hay Unidades
          </p>
        )}
      </div>
    </>
  )
}

export default Unidades