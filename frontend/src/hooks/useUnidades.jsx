import { useContext } from "react";
import UnidadContext from "../context/UnidadesProvider";

function useUnidades() {
  return useContext(UnidadContext)
}

export default useUnidades