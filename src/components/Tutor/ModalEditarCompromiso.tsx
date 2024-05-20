import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, ChangeEvent } from 'react';
import InputTutor from './InputTutor';
import Button from '../Button';
import axios from 'axios';
import { Commintment } from '../../store/types/Commintment';
import InputSelectTutor from './InputSelectTutor';
import { CommitmentStatus } from '../../store/types/CommitmentStatus';
import TextAreaTutor from './TextAreaTutor';
import Combobox from '../Combobox';

interface ModalEditarCompromisoProps {
  onClose: () => void;
  updatePage: () => void; // Nueva prop para la función de actualización
  compromiso: any;
}

let opciones: CommitmentStatus[] = [
  {
    CommitmentStatusId: 1,
    Description: 'Pendiente',
  },
  {
    CommitmentStatusId: 2,
    Description: 'En Proceso',
  },
  {
    CommitmentStatusId: 3,
    Description: 'Finalizado',
  },
];

export default function ModalEditarCompromiso({ onClose, updatePage, compromiso }: ModalEditarCompromisoProps) {
  const [commitmentData, setCommitmentData] = useState(compromiso);
  const [selectedOptionId, setSelectedOptionId] = useState<number | undefined>(undefined); // Nuevo estado para almacenar el CommitmentStatusId seleccionado
  const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined); // Nuevo estado para almacenar el CommitmentStatus seleccionado
  const [description, setDescription] = useState<string | undefined>(compromiso.Compromiso); // Nuevo estado para almacenar la descripción del compromiso

  const handleChangeCompromiso = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleChangeEstado = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value); // Actualiza el valor seleccionado en el select
    const selectedOption = e.target.value; // Valor seleccionado en el select
    console.log('selectedOptionnnnnnnnnnnn:', selectedOption);
  };

  const guardarDatos = async () => {
    try {
      const newData = {
        "commitmentId": commitmentData.commitmentId,
        "description": description,
        "isActive": true,
        "actionPlanId": 0, //no lo usa
        "commitmentStatusId": selectedOption,
        "creationDate": "2024-05-10T22:21:05.980Z", //no lo usa
        "modificationDate": "2024-05-10T22:21:05.980Z", //no lo usa
        "commitmentStatusDescription": "string" //no lo usa
      };
      console.log('newData para update:', newData);
      const response = await axios.put('https://localhost:44369/actualizarCommitment', newData);
      console.log('Commitment actualizado:', response.data);
      onClose(); // Cierra el modal después de guardar los datos exitosamente
      updatePage();
    } catch (error) {
      console.error('Error al actualizar el plan de acción:', error);
    }
  };

  return (
    <Transition show={true} as={Fragment}>
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
              <div className="p-4 w-534" style={{ width: "534px", marginLeft: "0" }}>
                <p className="font-montserrat text-[35px] font-bold text-primary">Editar Compromiso</p>
                <div className='´w-4'>
                  <TextAreaTutor
                    titulo="Compromiso *"
                    name="description"
                    value={description}
                    onChange={handleChangeCompromiso}
                    readOnly={false}
                    enable={true}
                  />
                  <InputSelectTutor
                    titulo='Estado del Compromiso *'
                    name='commitmentStatusDescription'
                    value={selectedOption}
                    onChange={handleChangeEstado}
                    options={opciones}
                  />
                </div>
                <div className="flex justify-between items-center mx-25 my-3">
                  <Button text="Cancelar" onClick={onClose} variant='secundario' />
                  <Button text="Guardar Cambios" onClick={guardarDatos} variant='call-to-action' />
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
