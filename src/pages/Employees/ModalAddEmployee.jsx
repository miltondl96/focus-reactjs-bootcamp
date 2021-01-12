import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { fire, firestore } from "../../firebase";
import { DateTime } from "luxon";

export default function ModalAddEmployee({
  isOpen,
  setIsOpen,
  employeeToEdit,
}) {
  Modal.setAppElement("#root");
  const [isLoading, setiIsLoading] = useState(false);
  const { register, handleSubmit, errors, reset } = useForm();

  useEffect(() => {
    if (employeeToEdit.id) {
      reset({
        name: employeeToEdit.data().name,
        dui: employeeToEdit.data().dui,
        position: employeeToEdit.data().position,
        date: DateTime.fromSeconds(
          employeeToEdit.data().admissionDate.seconds
        ).toFormat("yyyy-MM-dd"),
      });
    } else {
      reset({
        name: "",
        date: "",
        dui: "",
        position: "",
      });
    }
    setiIsLoading(false);
  }, [employeeToEdit]);

  const onSubmit = async (data) => {
    if (employeeToEdit.id) {
      try {
        setiIsLoading(true);
        await firestore
          .collection("employees")
          .doc(employeeToEdit.id)
          .update({
            name: data.name,
            admissionDate: fire.firestore.Timestamp.fromDate(
              new Date(data.date)
            ),
            dui: data.dui,
            position: data.position,
          });
          
        setIsOpen(false);
      } catch (error) {
        console.log(error);
        setiIsLoading(false);
      }
    } else {
      try {
        setiIsLoading(true);

        const res = await firestore.collection("employees").add({
          name: data.name,
          admissionDate: fire.firestore.Timestamp.fromDate(new Date(data.date)),
          dui: data.dui,
          position: data.position,
        });

        if (res) {
          setIsOpen(false);
        }
      } catch (error) {
        console.log(error);
        setiIsLoading(false);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Agregar Empleado"
      onRequestClose={() => setIsOpen(false)}
      className="absolute m-32 inset-x-0 bg-gray-50 focus:outline-none rounded-3xl overflow-hidden"
      overlayClassName="fixed inset-0 bg-indigo-900 bg-opacity-30"
    >
      <div className="w-full">
        <p className="text-center font-bold text-xl my-3 text-gray-900">
          {employeeToEdit.id ? "Editar Empleado" : "Agregar Empleado"}
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    ref={register({ required: true })}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  {errors.name && (
                    <span className=" text-sm text-red-900">
                      Este campo es requerido
                    </span>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Fecha de ingreso a la compañia.
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    ref={register({ required: true })}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  {errors.date && (
                    <span className=" text-sm text-red-900">
                      Este campo es requerido
                    </span>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="position"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Puesto
                  </label>
                  <input
                    type="text"
                    name="position"
                    id="position"
                    ref={register({ required: true })}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  {errors.position && (
                    <span className=" text-sm text-red-900">
                      Este campo es requerido
                    </span>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="dui"
                    className="block text-sm font-medium text-gray-700"
                  >
                    DUI
                  </label>
                  <input
                    type="text"
                    name="dui"
                    id="dui"
                    ref={register({ required: true })}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  {errors.dui && (
                    <span className=" text-sm text-red-900">
                      Este campo es requerido
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isLoading ? "Cargando" : "Guardar"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}
