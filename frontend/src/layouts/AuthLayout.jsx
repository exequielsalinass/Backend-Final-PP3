import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <>
      <main className="container mx-auto p-5 md:p-0 md:flex md:justify-center">
        <div /* className="md:w-2/3 lg:w-2/5 bg-red-100" */>
            <Outlet />
        </div>
      </main>
    </>
  );
}

export default AuthLayout;