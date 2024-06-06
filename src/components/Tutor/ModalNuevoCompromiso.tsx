import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, ChangeEvent } from 'react';
import InputTutor from './InputTutor';
import Button from '../Button';
import axios from 'axios';
import { Services as ServicesProperties } from '../../config';

interface ModalNuevoCompromisoProps {
  isOpen: boolean;
  onClose: () => void;
  updatePage: () => void; // Nueva prop para la función de actualización
  actionPlanId: number;
}

export default function ModalNuevoCompromiso({ isOpen, onClose,  updatePage, actionPlanId}: ModalNuevoCompromisoProps) {
  const [commitmentData, setCommitmentData] = useState({
    actionPlanId: '',
    description: '',
    name: '',
    commitmentStatusDescription: '',
  });

  // Estado para el mensaje de error del nombre del compromiso
  const [nameError, setNameError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCommitmentData({ ...commitmentData, [name]: value });
  };

  const onBlurName = (e: ChangeEvent<HTMLInputElement>) => {
    if (!commitmentData.description.trim()) {
      setNameError('El compromiso no puede estar vacío');
    } else {
      setNameError('');
    }
  }

  const guardarDatos = async () => {
    try {
      const newData = {
        description: commitmentData.description,
        actionPlanId: actionPlanId,
        name: '',
        commitmentStatusDescription: '',
      };
  
      const response = await axios.post(ServicesProperties.BaseUrl+'/crearCommitment', newData);
      console.log('Commitment creado:', response.data);
      onClose(); // Cierra el modal después de guardar los datos exitosamente
      updatePage(); // Actualiza la página
    } catch (error) {
      console.error('Error al crear el plan de acción:', error);
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
        <div className="flex items-center justify-center min-h-screen">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="border-custom shadow-custom bg-[rgba(235,_236,_250,_1.00)] relative bg-white rounded-lg p-4 max-w-auto mx-auto">
              <div className="p-4">
                <p className="font-montserrat text-[35px] font-bold text-primary">Nuevo Compromiso</p>
                <div className='´w-4'>
                  <InputTutor 
                  titulo="Compromiso *" 
                  texto='Escribe el compromiso para el estudiante ' 
                  name="description"
                  value={commitmentData.description}
                  onChange={handleChange}
                  manejarBlur={onBlurName}
                  />
                  {nameError && <p className="text-red-500 pl-6">{nameError}</p>}
                </div>
                <div className="flex justify-between items-center mx-25 my-3">
                  <Button text="Cancelar" onClick={onClose} variant='secundario' />
                  <Button text="Crear Compromiso" onClick={guardarDatos} variant='call-to-action' disabled={!commitmentData.description.trim()}/>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
