import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../use-auth";

export default function Navbar() {
  const { user, signout } = useAuth();

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="block lg:hidden h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Workflow"
              />
              <img
                className="mx-auto h-8 w-auto hidden lg:block"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
              />
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <NavLink
                  to="/employees"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Empleados
                </NavLink>
                <NavLink
                  to="/disabilities"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Incapacidades
                </NavLink>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              onClick={() => signout()}
              className=" text-gray-300 hover:text-white font-medium"
            >
              Cerrar Sesión
            </button>
            <div className="ml-3 relative">
              <button className="bg-gray-800 flex text-sm rounded-full focus:outline-none">
                <img
                  className="h-8 w-8 rounded-full"
                  src={user.photoURL}
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
