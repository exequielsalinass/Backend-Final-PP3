import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/Spinner";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function RutaProtegida() {
  const { auth, cargando } = useAuth();

  if (cargando) return <Spinner />;

  return (
    <>
      {auth._id ? (
        <div className="bg-gray-100">
          <Header />

          <div className="md:flex bg-slate-600 md:min-h-screen">
            <Sidebar />

            <main className="p-10 bg-rose-500 flex-1">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}

export default RutaProtegida;
