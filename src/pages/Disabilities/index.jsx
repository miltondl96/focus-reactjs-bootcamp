import { DateTime } from "luxon";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { firestore } from "../../firebase";
import ModalAddDisability from "./ModalAddDisability";

export default function Disabilities() {
  const [disabilities, setDisabilities] = useState([]);
  const [disabilityToEdit, setDisabilityToEdit] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    let unsubscribe = firestore.collection("disabilities").onSnapshot(
      (querySnapshot) => {
        var docs = [];
        querySnapshot.forEach(function (doc) {
          docs.push(doc);
        });
        setDisabilities(docs);
      },
      (error) => {
        throw error;
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const removeDisability = async (id) => {
    await firestore.collection("disabilities").doc(id).delete();
  };

  return (
    <div>
      <Navbar />

      <div className="flex flex-col container mt-10 mx-auto">
        <div className="flex justify-start my-3">
          <button
            onClick={() => {
              setModalIsOpen(true);
              setDisabilityToEdit({});
            }}
            className="text-indigo-600 hover:text-indigo-900 py-2 px-3 rounded-full border border-indigo-600 hover:border-indigo-900"
          >
            Agregar Incapacidad +
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
                      Fecha de ingreso
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Unidad Médica
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Doctor que atendió
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Inicio de incapacidad
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Fin de incapacidad
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Días de cobertura
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Editar</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {disabilities.map((employee) => (
                    <tr key={employee.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {DateTime.fromSeconds(employee.data().admissionDate.seconds).toFormat("dd/MM/yyyy")}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {employee.data().unit}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {employee.data().doctor}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {DateTime.fromSeconds(employee.data().startDate.seconds).toFormat("dd/MM/yyyy")}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {DateTime.fromSeconds(employee.data().endDate.seconds).toFormat("dd/MM/yyyy")}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {employee.data().disabilityDays}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button
                          onClick={() => {
                            setDisabilityToEdit(employee);
                            setModalIsOpen(true);
                          }}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => {
                            removeDisability(employee.id);
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

      <ModalAddDisability
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        disabilityToEdit={disabilityToEdit}
      />
    </div>
  );
}
