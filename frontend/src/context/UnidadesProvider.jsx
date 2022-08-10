import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
/* import { useNavigate } from "react-router-dom"; */

const UnidadContext = createContext();

const UnidadesProvider = ({ children }) => {

    const [unidades, setUnidades] = useState([])

    return (
        <UnidadContext.Provider
          value={{
            unidades
          }}
        >
          {children}
        </UnidadContext.Provider>
      );
}

export { UnidadesProvider };

export default UnidadContext;