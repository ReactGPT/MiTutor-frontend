import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Button from '../Button';
import IconAlertCircle from '../../assets/svg/IconAlertCircle';
import IconCheckCircle from '../../assets/svg/IconCheckCircle';
import ModalError from '../ModalError';
import ModalSuccess from '../ModalSuccess';
import { useFacultades } from '../../store/hooks/useFacultades';
import Facultad from '../../store/types/Facultad';
import InputAdmin2 from './InputAdmin2';

interface ModalInputProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: () => void;
  message?: string;
  isAcceptAction?: boolean;
}

const facultadInicial: Facultad = {
  id: 0,
  name: '',
  acronym: '',
  numberStudents: 0,
  numberTutors: 0,
  isActive: false,
  facultyManager: null,
  specialties: [],
  tutoringPrograms: [],
};

const ModalInput: React.FC<ModalInputProps> = ({ isOpen, onClose, onAdd, message, isAcceptAction }) => {
  const [nuevaFacultad, setNuevaFacultad] = useState<Facultad | null>(facultadInicial);
  const [isOpenModal, setIsOpenModel] = useState<boolean>(false);
  const [isOpenModalSuccess, setIsOpenModalSuccess] = useState<boolean>(false);
  const [isOpenModalError, setIsOpenModalError] = useState<boolean>(false);
  const { createFacultad } = useFacultades();
  const handleOnAddAgregarFacultad = (nuevaFacultad: Facultad) => {
    createFacultad(nuevaFacultad).then((result) => {
      if (result) {
        setIsOpenModalSuccess(true);
      }
      else {
        setIsOpenModalError(true);
      }
      setIsOpenModel(false);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevaFacultad((prevState) => {
      if (!prevState) {
        return null;
      }
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={onClose}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="flex flex-col items-center justify-center gap-4">

                <div className="text-center">
                  <Dialog.Title as="h1" className="text-2xl leading-6 font-semibold text-gray-900">
                    Nueva Facultad
                  </Dialog.Title>
                  <InputAdmin2
                    titulo="Nombre de la Facultad"
                    enable={true}
                    name="name"
                    onChange={handleInputChange} />
                  <InputAdmin2
                    titulo="Siglas de la Facultad"
                    enable={true}
                    name="acronym"
                    onChange={handleInputChange} />
                </div>
              </div>
              <div className="flex items-center justify-center pt-5 space-x-4">
                <Button text='Cancelar' onClick={onClose} />
                <Button text='Agregar' onClick={() => {
                  if (nuevaFacultad && nuevaFacultad.name && nuevaFacultad.acronym)
                    handleOnAddAgregarFacultad(nuevaFacultad);
                  // setIsOpen(false);
                }} />
              </div>
            </div>
          </Transition.Child>
        </div>
        <ModalSuccess
          isOpen={isOpenModalSuccess}
          message={`Se creó con éxito la facultad`}
          onClose={() => {
            setNuevaFacultad(null);
            onClose();
          }}
        />
        <ModalError isOpen={isOpenModalError} message='Ocurrió un problema inesperado. Intente nuevamente'
          onClose={() => {
            setNuevaFacultad(null);
            setIsOpenModalError(false);
          }}
        />
      </Dialog>
    </Transition.Root>
  );
};

export default ModalInput;