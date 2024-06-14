import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

import Button from '../Button'; 
import { ListCita } from "../../store/types/ListCita";
import { Services as ServicesProperties } from '../../config';
import axios from 'axios';

interface CitaModalDetalleProps {
  onClose: () => void; // Tipo de onClose
  appointment: ListCita;
}

export default function CitaModalDetalle({ onClose, appointment }: CitaModalDetalleProps) {
  // Solo necesitas el estado isOpen dentro de ModalTutor
  const [isOpen, setIsOpen] = useState(true); // Inicializar el estado como true para abrir el modal por defecto
    
  function closeModal() {
    setIsOpen(false);
    onClose(); // Llamar a la función onClose para comunicar que se cerró el modal
  }

  const attributesToRender =[
    {
        name:"Fecha",
        value:appointment.creationDate
    },
    {
        name:"Modalidad",
        value:appointment.isInPerson?"Presencial":"Virtual"
    },
    {
        name:"Hora",
        value:appointment.startTime+" - "+appointment.endTime
    },
    {
        name:"Motivo",
        value:appointment.reason
    },
    {
        name:"Tipo de Tutoría",
        value:appointment.programName
    }
] 

  return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black/25" />
            </Transition.Child>

            {/* Contenido del modal */}
            <span className="inline-block h-screen align-middle">&#8203;</span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl relative">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 relative mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-montserrat text-[30px] font-bold text-primary pt-3">CITA</h3>
                  <div className="absolute top-0 right-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      style={{ width: '40px', height: '49px', cursor: 'pointer' }}
                      className="hover:stroke-red-500 bg-[rgba(255,_255,_255,_0.50)] border-custom drop-shadow-md"
                      onClick={closeModal}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
              </Dialog.Title>
                <div className='flex flex-col gap-2 flex-grow overflow-auto'>
                    {attributesToRender.length>0 && attributesToRender.map((item)=>(
                    <div key={`label-${item.name}`} className='flex w-full'>
                        <label className='font-montserrat text-sm w-[50%] font-bold'>{item.name}</label>
                        <p className='font-montserrat text-sm w-[50%] justify-begin font-semibold block truncate'>{item.value}</p>
                    </div>
                    ))}
                </div> 
            </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
  );
}
