import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { fire, firestore } from "../../firebase";
import { DateTime } from "luxon";

export default function ModalAddDisability({
  isOpen,
  setIsOpen,
  disabilityToEdit,
}) {
  Modal.setAppElement("#root");
  const [isLoading, setiIsLoading] = useState(false);
  const { register, handleSubmit, errors, reset } = useForm();

  useEffect(() => {
    if (disabilityToEdit.id) {
      reset({
        startDate: DateTime.fromSeconds(
          disabilityToEdit.data().startDate.seconds
        ).toFormat("yyyy-MM-dd"),
        endDate: DateTime.fromSeconds(
          disabilityToEdit.data().endDate.seconds
        ).toFormat("yyyy-MM-dd"),
        doctor: disabilityToEdit.data().doctor,
        unit: disabilityToEdit.data().unit,
        disabilityDays: disabilityToEdit.data().disabilityDays,
        admissionDate: DateTime.fromSeconds(
          disabilityToEdit.data().admissionDate.seconds
        ).toFormat("yyyy-MM-dd"),
      });
    } else {
      reset({
        startDate: "",
        endDate: "",
        doctor: "",
        unit: "",
        disabilityDays: "",
        admissionDate: "",
      });
    }
    setiIsLoading(false);
  }, [disabilityToEdit, reset]);

  const onSubmit = async (data) => {
    if (disabilityToEdit.id) {
      try {
        setiIsLoading(true);
        await firestore
          .collection("disabilities")
          .doc(disabilityToEdit.id)
          .update({
            admissionDate: fire.firestore.Timestamp.fromDate(
              new Date(data.admissionDate)
            ),
            startDate: fire.firestore.Timestamp.fromDate(
              new Date(data.startDate)
            ),
            endDate: fire.firestore.Timestamp.fromDate(new Date(data.endDate)),
            doctor: data.doctor,
            unit: data.unit,
            disabilityDays: data.disabilityDays,
          });

        setIsOpen(false);
      } catch (error) {
        console.log(error);
        setiIsLoading(false);
      }
    } else {
      try {
        setiIsLoading(true);
        const res = await firestore.collection("disabilities").add({
          admissionDate: fire.firestore.Timestamp.fromDate(
            new Date(data.admissionDate)
          ),
          startDate: fire.firestore.Timestamp.fromDate(
            new Date(data.startDate)
          ),
          endDate: fire.firestore.Timestamp.fromDate(new Date(data.endDate)),
          doctor: data.doctor,
          unit: data.unit,
          disabilityDays: data.disabilityDays,
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
          {disabilityToEdit.id ? "Editar Empleado" : "Agregar Empleado"}
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="admissionDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Fecha de ingreso
                  </label>
                  <input
                    type="date"
                    name="admissionDate"
                    id="admissionDate"
                    ref={register({ required: true })}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  {errors.admissionDate && (
                    <span className=" text-sm text-red-900">
                      Este campo es requerido
                    </span>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="unit"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Unidad Médica
                  </label>
                  <input
                    type="text"
                    name="unit"
                    id="unit"
                    ref={register({ required: true })}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  {errors.unit && (
                    <span className=" text-sm text-red-900">
                      Este campo es requerido
                    </span>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="doctor"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Doctor que atendió
                  </label>
                  <input
                    type="text"
                    name="doctor"
                    id="doctor"
                    ref={register({ required: true })}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  {errors.doctor && (
                    <span className=" text-sm text-red-900">
                      Este campo es requerido
                    </span>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="startDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Inicio de Incapacidad
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    ref={register({ required: true })}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  {errors.startDate && (
                    <span className=" text-sm text-red-900">
                      Este campo es requerido
                    </span>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="endDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Fin de Incapacidad
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    id="endDate"
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
                    htmlFor="disabilityDays"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Dias de cobertura de incapacidad
                  </label>
                  <input
                    type="text"
                    name="disabilityDays"
                    id="disabilityDays"
                    ref={register({ required: true })}
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  {errors.disabilityDays && (
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
