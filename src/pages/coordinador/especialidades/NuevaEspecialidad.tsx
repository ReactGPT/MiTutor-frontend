import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState, useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import { Button } from "../../../components";
import ModalError from "../../../components/ModalError";
import ModalSuccess from "../../../components/ModalSuccess";
import AsignarResponsable from "./AsignarResponsable";
import { insertartEspecialidad } from "../../../store/services/insertarEspecialidad";
import { useAuth } from "../../../context";

interface NuevaEspecialidadProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const NuevaEspecialidad = ({
  isOpen,
  onClose,
  onConfirm,
}: NuevaEspecialidadProps) => {
  const {userData} = useAuth();
  const userInfo = userData?.userInfo;
  const departmentId = useMemo(() => {
    let departmentId:number=0;  
    userInfo?.roles.forEach((role:any) => {
      if(role.type === "MANAGER"){
        departmentId = role.details.departmentId;
      }
    });
    return departmentId;
}, [userInfo]);
  const [isOpenError, setIsOpenError] = React.useState(false);
  const [isOpenSuccess, setIsOpenSuccess] = React.useState(false);
  const [isOpenAsignarResponsable, setIsOpenAsignarResponsable] = React.useState(false);
  const [nombre, setNombre] = useState("");
  const [siglas, setSiglas] = useState("");
  const [responsable, setResponsable] = useState("");
  const [telefonoResponsable, setTelefonoResponsable] = useState("");
  const [correoResponsable, setCorreoResponsable] = useState("");
  const [responsableId, setResponsableId] = useState(-1);

  const saveEspecialidad =async () => {
    
    await insertartEspecialidad({
      name: nombre,
      acronym: siglas,
      studentCount: 0,
      Faculty: { FacultyId: departmentId },
      SpecialtyManager: { Id: responsableId },
    });
    onConfirm();
    setIsOpenSuccess(true);
  };

  const validateInputs = () => {
    if (nombre === "" || siglas === "" || responsable === "") {
      return false;
    }
    return true;
  }

  const onError = () => {
    setIsOpenError(true);
  };

  return (
    <>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={onClose}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom z-10 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl border border-gray-300  bg-white transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div className=" gap-4">
                  <div className="pb-5">
                    <Dialog.Title
                      as="h3"
                      className="text-xl leading-6 text-left  font-bold text-gray-900"
                    >
                      Nueva Especialidad
                    </Dialog.Title>
                    <div className="absolute top-0 right-0 p-2">
                      <button
                        onClick={() => {
                          onClose();
                        }}
                      >
                        <FaX />
                      </button>
                    </div>
                  </div>
                  <div className="px-12 pb-5">
                    <div>
                      <label className="text-primary text-sm font-medium">
                        Nombre
                      </label>
                      <input
                        type="text"
                        placeholder="Nombre"
                        className="border border-terciary rounded-lg  w-full p-2 text-sm ring-0"
                        onChange={(e) => { setNombre(e.target.value); }}
                        value={nombre}  
                      />
                    </div>
                    <div>
                      <label className="text-primary text-sm font-medium">
                        Siglas
                      </label>
                      <input
                        type="text"
                        placeholder="Siglas"
                        className="border border-terciary rounded-lg  w-full p-2 text-sm ring-0"
                        onChange={(e) => { setSiglas(e.target.value); }}
                        value={siglas}
                      />
                    </div>
                    <div>
                      <label className="text-primary text-sm font-medium">
                        Responsable
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Responsable"
                          className="border border-terciary rounded-lg  w-full p-2 text-sm ring-0"
                          value={responsable}
                          disabled

                        />
                        <div className="absolute left-full ml-2 top-0 bottom-0 flex items-center justify-center">
                          <button
                            className="rounded-lg bg-secondary shadow p-2 "
                            onClick={() => {
                              setIsOpenAsignarResponsable(true);
                            }}
                          >
                            <MdOutlineEdit />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-primary text-sm font-medium">
                        Teléfono Responsable
                      </label>
                      <input
                        type="text"
                        placeholder="telefono"
                        className="border border-terciary rounded-lg  w-full p-2 text-sm ring-0"
                        value={telefonoResponsable}
                        disabled
                      />
                    </div>
                    <div>
                      <label className="text-primary text-sm font-medium">
                        Correo responsable
                      </label>
                      <input
                        type="text"
                        placeholder="Nombre"
                        className="border border-terciary rounded-lg  w-full p-2 text-sm ring-0"
                        value={correoResponsable}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-around pt-5 space-x-4 pb-10">
                  <Button
                    text="Añadir"
                    icon={FaPlus}
                    onClick={async () => {
                      await saveEspecialidad();
                    }}
                    disabled={!validateInputs()}
                  />
                  <Button
                    variant="secundario"
                    text="Cancelar"
                    icon={FaX}
                    onClick={() => {
                      onError();
                    }}
                  />
                </div>
                <ModalError
                  isOpen={isOpenError}
                  onClose={() => {
                    setIsOpenError(false);
                    onClose();
                  }}
                  message="No se guardaran los datos ingresados para esta Especialidad."
                />
                <ModalSuccess
                  isOpen={isOpenSuccess}
                  onClose={() => {
                    setIsOpenSuccess(false);
                    onClose();
                  }}
                  message="Puede visualizar la nueva Especialidad en su lista de Especialidades."
                />
                <AsignarResponsable
                  isOpen={isOpenAsignarResponsable}
                  onClose={() => {
                    setIsOpenAsignarResponsable(false);
                  }}
                  onSelect={(User) => {
                    console.log(`User selected: ${JSON.stringify(User,null,5)}`)
                    setResponsable(User.persona.name);
                    setTelefonoResponsable((User.persona.phone));
                    setCorreoResponsable(User.institutionalEmail);
                    setResponsableId(User.id);
                  }}
                />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default NuevaEspecialidad;
