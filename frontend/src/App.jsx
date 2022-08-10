import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import RutaProtegida from "./layouts/RutaProtegida";

import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import OlvidePassword from "./pages/OlvidePassword";
import NuevoPassword from "./pages/NuevoPassword";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import Unidades from "./pages/Unidades";
import NuevaUnidad from "./pages/NuevaUnidad";
import Unidad from "./pages/Unidad";
import EditarUnidad from "./pages/EditarUnidad";
import NuevoAlumno from "./pages/NuevoAlumno";

import { AuthProvider } from "./context/AuthProvider";
import { UnidadesProvider } from "./context/UnidadesProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UnidadesProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route path="olvide-password/:token" element={<NuevoPassword />} />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>

            <Route path="/unidades" element={<RutaProtegida />}>
              <Route index element={<Unidades />} />
              <Route path="crear-unidad" element={<NuevaUnidad />} />
              <Route path="nuevo-alumno/:id" element={<NuevoAlumno />} />
              <Route path=":id" element={<Unidad />} />
              <Route path="editar/:id" element={<EditarUnidad />} />
            </Route>
          </Routes>
        </UnidadesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
