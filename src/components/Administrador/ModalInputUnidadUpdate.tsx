import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Button from '../Button';
import IconAlertCircle from '../../assets/svg/IconAlertCircle';
import IconCheckCircle from '../../assets/svg/IconCheckCircle';
import ModalError from '../ModalError';
import ModalSuccess from '../ModalSuccess';
import { useUnidadDerivacion } from '../../store/hooks/useUnidadDerivacion';
import UnidadDerivacion from '../../store/types/UnidadDerivacion.ts';
import InputAdmin2 from './InputAdmin2';
import { useLocation } from 'react-router-dom';

interface ModalInputProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: () => void;
  message: string;
  isAcceptAction: boolean;
  esHijo?: boolean;
  idPadre?: number;
  unidadEstado: UnidadDerivacion;
}

const unidadInicial: UnidadDerivacion = {
  unidadDerivacionId: 0,
  nombre: '',
  siglas: '',
  responsable: '',
  email: '',
  telefono: '',
  estado: true,
  esPadre: true,
  fechaCreacion: '',
};

const ModalInputUnidadUpdate: React.FC<ModalInputProps> = ({ isOpen, onClose, onAdd, message, isAcceptAction, esHijo = false, idPadre, unidadEstado }) => {
  const [nuevaUnidad, setNuevaUnidad] = useState<UnidadDerivacion>(unidadEstado);
  const [isOpenModal, setIsOpenModel] = useState<boolean>(false);
  const [isOpenModalSuccess, setIsOpenModalSuccess] = useState<boolean>(false);
  const [isOpenModalError, setIsOpenModalError] = useState<boolean>(false);
  const { updateUnidad } = useUnidadDerivacion();
  const handleOnAddAgregarUnidad = (nuevaUnidad: UnidadDerivacion) => {
    updateUnidad(nuevaUnidad).then((result) => {
      if (result) {
        setIsOpenModalSuccess(true);
      }
      else {
        setIsOpenModalError(true);
      }
      setIsOpenModel(false);
    });
  };

  // useEffect(() => {
  //   )

  useEffect(() => {
    setNuevaUnidad(unidadEstado);
  }, [isOpen, unidadEstado]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setNuevaUnidad((prevState) => {
      if(!prevState){
        return unidadEstado;
      }
      return {
        ...prevState,
        [name]: value,
        esPadre: false,
        parentId: idPadre,
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
                  <Dialog.Title as="h1" className="text-2xl leading-6 font-semibold text-gray-900" >
                    Editar {esHijo ? `SubUnidad` : `Unidad`} de Derivación
                  </Dialog.Title>
                  <InputAdmin2 
                    titulo="Nombre de la Unidad" 
                    enable={true}
                    name="nombre"
                    valor={`${nuevaUnidad && nuevaUnidad.nombre}`}
                    onChange={handleInputChange}/>
                  <InputAdmin2 
                    titulo="Siglas de la Unidad" 
                    enable={true}
                    name="siglas"
                    valor={`${nuevaUnidad && nuevaUnidad.siglas}`}
                    onChange={handleInputChange}/>
                  <InputAdmin2 
                    titulo="Responsable de la Unidad" 
                    enable={true}
                    name="responsable"
                    valor={`${nuevaUnidad && nuevaUnidad.responsable}`}
                    onChange={handleInputChange}/>
                  <InputAdmin2 
                    titulo="Email del Responsable" 
                    enable={true}
                    name="email"
                    valor={`${nuevaUnidad && nuevaUnidad.email}`}
                    onChange={handleInputChange}/>
                  <InputAdmin2 
                    titulo="Teléfono del Responsable" 
                    enable={true}
                    name="telefono"
                    valor={`${nuevaUnidad && nuevaUnidad.telefono}`}
                    onChange={handleInputChange}/>
                </div>
              </div>
              <div className="flex items-center justify-center pt-5 space-x-4">
                <Button text='Cancelar' onClick={onClose} />
                <Button text='Editar' onClick={() => {
                  if(nuevaUnidad && nuevaUnidad.nombre && nuevaUnidad.siglas){
                    handleOnAddAgregarUnidad(nuevaUnidad);
                    // onClose();
                  }
                    
                  // setIsOpen(false);
                }} />
              </div>
            </div>
          </Transition.Child>
        </div>
        <ModalSuccess 
          isOpen={isOpenModalSuccess} 
          message={`Se modificó con éxito la Unidad: ${nuevaUnidad && nuevaUnidad.nombre}`}
          onClose={() => {
            setNuevaUnidad(unidadInicial);
            setIsOpenModalSuccess(false);
            onClose();
          }}
        />
        <ModalError isOpen={isOpenModalError} message='Ocurrió un problema inesperado. Intente nuevamente'
        onClose={() => {
          setNuevaUnidad(unidadInicial);
          setIsOpenModalError(false)
        }}
      /> 
      </Dialog>
    </Transition.Root>
  );
};

export default ModalInputUnidadUpdate;