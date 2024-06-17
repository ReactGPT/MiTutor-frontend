import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, ChangeEvent } from 'react';
import InputTutor from './InputTutor';
import TextAreaTutor from './TextAreaTutor';
import Button from '../Button';
import axios from 'axios';
import { Services as ServicesProperties } from '../../config';
import { useAuth } from '../../context';
import { TutorRoleDetails } from '../../store/types';

interface ModalNuevoPlanAccionProps {
  isOpen: boolean;
  onClose: () => void;
  updatePage: () => void; // Nueva prop para la función de actualización
  studentId: number;
  programId: number;
}

export default function ModalNuevoPlanAccion({ isOpen, onClose, updatePage,studentId, programId }: ModalNuevoPlanAccionProps) {
  const [planData, setPlanData] = useState({
    name: '',
    description: ''
  });
  const { userData } = useAuth();
  const tutorId = (userData?.userInfo?.roles[0].details as TutorRoleDetails).tutorId;
  // Estado para el mensaje de error del nombre del plan de acción
  const [nameError, setNameError] = useState('');

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPlanData({ ...planData, [name]: value });
  };
  
  const handleChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPlanData({ ...planData, [name]: value });
  };

  const onBlurName = (e: ChangeEvent<HTMLInputElement>) => {
    if (!planData.name.trim()) {
      setNameError('El nombre del plan no puede estar vacío');
    } else {
      setNameError('');
    }
  }

  const guardarDatos = async () => {
    if (!planData.name.trim()) {
      setNameError('El nombre del plan no puede estar vacío');
      return;
    } else{
      setNameError('');
    }
    
    try {
      const newData = {
        name: planData.name,
        description: planData.description,
        studentId: studentId, // Asigna el valor correspondiente para studentId
        programId: programId, // Asigna el valor correspondiente para programId 
        tutorId: tutorId, // Asigna el valor correspondiente para tutorId
      };
  
      const response = await axios.post(ServicesProperties.BaseUrl+'/crearActionPlan', newData);
      console.log('Plan de acción creado:', response.data);
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
                <p className="font-montserrat text-[35px] font-bold text-primary">Nuevo Plan de Acción</p>
                <div>
                  <InputTutor 
                    titulo="Nombre *"
                    texto="Nombre del plan de acción"
                    name="name"
                    value={planData.name}
                    onChange={handleChangeInput}
                    manejarBlur={onBlurName}
                  />
                  {nameError && <p className="text-red-500 pl-6">{nameError}</p>}
                  <div style={{ height: '12rem' }}>
                    <TextAreaTutor 
                    titulo="Descripción"
                    texto="Describe el plan de acción"
                    name="description"
                    value={planData.description}
                    onChange={handleChangeTextArea}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center mx-20">
                  <Button text="Cancelar" onClick={onClose} variant='secundario' />
                  <Button text="Crear Plan" onClick={guardarDatos} variant='call-to-action' disabled={!planData.name.trim()}/>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
