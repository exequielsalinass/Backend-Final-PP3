import FormularioUnidad from "../components/FormularioUnidad";

function NuevaUnidad() {
  return (
    <>
      <h1 className="text-4xl font-black">Nueva Unidad</h1>

      <div className="mt-10 flex justify-center">
        <FormularioUnidad />
      </div>
    </>
  );
}

export default NuevaUnidad;
