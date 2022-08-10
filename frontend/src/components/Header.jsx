import { Link } from "react-router-dom";
/* import useProyectos from "../hooks/useProyectos"; */
/* import Busqueda from "./Busqueda"; */

function Header() {
  /* const { handleBuscador } = useProyectos(); */

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">
          LearningEnglish
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <button
            type="button"
            className="font-bold uppercase rounded-lg border border-cyan-800 p-1"
            /* onClick={handleBuscador} */
          >
            Buscar Unidad
          </button>
          <Link to="/unidades" className="font-bold uppercase">
            Unidades
          </Link>

          <button
            type="buttom"
            className="text-white text-sm bg-sky-600 p-2 rounded-md uppercase font-bold"
          >
            Cerrar Sesión
          </button>

          {/* <Busqueda /> */}
        </div>
      </div>
    </header>
  );
}

export default Header;
