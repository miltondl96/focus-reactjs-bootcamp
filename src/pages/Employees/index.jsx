import { DateTime } from "luxon";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { firestore } from "../../firebase";
import ModalAddEmployee from "./ModalAddEmployee";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [employeeToEdit, setEmployeeToEdit] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    let unsubscribe = firestore.collection("employees").onSnapshot(
      (querySnapshot) => {
        var docs = [];
        querySnapshot.forEach(function (doc) {
          docs.push(doc);
        });
        setEmployees(docs);
      },
      (error) => {
        throw error;
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const deleteEmployee = async (id) => {
    await firestore.collection("employees").doc(id).delete();
  };

  return (
    <div>
      <Navbar />

      <div className="flex flex-col container mt-10 mx-auto">
        <div className="flex justify-start my-3">
          <button
            onClick={() => {
              setModalIsOpen(true);
              setEmployeeToEdit({});
            }}
            className="text-indigo-600 hover:text-indigo-900 py-2 px-3 rounded-full border border-indigo-600 hover:border-indigo-900"
          >
            Agregar Empleado +
          </button>
        </div>
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Código
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Nombre
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Fecha de ingreso
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Puesto
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      DUI
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Editar</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {employees.map((employee) => (
                    <tr key={employee.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {employee.id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {employee.data().name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {DateTime.fromSeconds(employee.data().admissionDate.seconds).toFormat("dd/MM/yyyy")}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {employee.data().position}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {employee.data().dui}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button
                          onClick={() => {
                            setEmployeeToEdit(employee);
                            setModalIsOpen(true);
                          }}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => {
                            deleteEmployee(employee.id);
                          }}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <ModalAddEmployee
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        employeeToEdit={employeeToEdit}
      />
    </div>
  );
}
