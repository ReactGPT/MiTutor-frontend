import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

import Button from '../Button';
import { Derivation, ListDerivation } from '../../store/types/Derivation';
import { Services as ServicesProperties } from '../../config';
import axios from 'axios';

interface DerivationModalDetalleProps {
  onClose: () => void; // Tipo de onClose
  derivation: ListDerivation
}

export default function DerivationModalDetalle({ onClose, derivation }: DerivationModalDetalleProps) {
  // Solo necesitas el estado isOpen dentro de ModalTutor
  const [isOpen, setIsOpen] = useState(true); // Inicializar el estado como true para abrir el modal por defecto
  const [fileName, setFileName] = useState(`derivacion_${derivation.derivationId}.pdf`);
  const carpeta="derivaciones";

  async function descargarArchivo() {
    try {
      const response = await axios.get(ServicesProperties.BaseUrl+`/api/S3/download/${fileName}?carpeta=${carpeta}`, {
        responseType: 'blob', // Para recibir la respuesta como un blob (archivo binario)
      });

      // Crear una URL para el blob y descargar el archivo
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      //'derivacion_'+formData.nombreAlumno+'.pdf'
      link.setAttribute('download', 'derivacion_'+derivation.nombreAlumno+'.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
    }
  }
  function closeModal() {
    setIsOpen(false);
    onClose(); // Llamar a la función onClose para comunicar que se cerró el modal
  }

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
                  <h3 className="font-montserrat text-[20px] font-bold text-primary pt-3">DERIVACIÓN</h3>
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
                <div className="flex flex-col my-4">
                  <label className="font-semibold text-gray-700">Nombre del alumno:</label>
                  <textarea
                    name='studentAnnotations'
                    value={derivation.nombreAlumno}  
                    className='w-full rounded-md font-montserrat border-custom drop-shadow-md font-bold text-gray-500 px-3 py-2 mt-0 p-2' // Eliminar el margen superior (mt-0) y mantener el padding (p-2)
                    disabled={true}
                    rows={derivation.nombreAlumno.split('\n').length}
                    style={{ resize: 'none', textAlign: 'left' }} // Alinear el texto a la izquierda
                  />
                </div>
                <div className="flex flex-col my-4">
                  <label className="font-semibold text-gray-700">Nombre de la Unidad de Derivación:</label>
                  <textarea
                    name='studentAnnotations'
                    value={derivation.unitDerivationName}  
                    className='w-full rounded-md font-montserrat border-custom drop-shadow-md font-bold text-gray-500 px-3 py-2 mt-0 p-2' // Eliminar el margen superior (mt-0) y mantener el padding (p-2)
                    disabled={true}
                    rows={derivation.unitDerivationName.split('\n').length}
                    style={{ resize: 'none', textAlign: 'left' }} // Alinear el texto a la izquierda
                  />
                </div>

                <div className="flex flex-col my-4"> 
                  <label className="font-semibold text-gray-700">Motivo:</label>
                  <textarea
                    name='studentAnnotations'
                    value={derivation.reason} 
                    className='w-full h-full rounded-md resize-none 
                      outline-none px-3 py-2 mt-0 font-montserrat text-[90%] border-custom drop-shadow-md font-bold text-gray-500'
                    disabled={true}
                  />
                </div>
                
                <div className="flex flex-col my-4"> 
                  <label className="font-semibold text-gray-700">Comentario:</label>
                  <textarea
                    name='studentAnnotations'
                    value={derivation.comment} 
                    className='w-full h-full rounded-md resize-none 
                      outline-none px-3 py-2 mt-0 font-montserrat text-[90%] border-custom drop-shadow-md font-bold text-gray-500'
                    disabled={true}
                  />  
                </div>

                <div className="mt-4 flex justify-center space-x-16">
                  <Button onClick={descargarArchivo} variant="call-to-action" text="Descargar Ficha" />
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
  );
}
