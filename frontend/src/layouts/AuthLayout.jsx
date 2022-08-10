import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <>
      <main className="container mx-auto p-5 md:p-0 md:flex md:justify-center">
        <div>
            <Outlet />
        </div>
      </main>
    </>
  );
}

export default AuthLayout;