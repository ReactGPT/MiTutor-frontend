import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

import Button from '../Button';

interface ModalTutorProps {
  onClose: () => void; // Tipo de onClose
}

export default function ModalTutor({ onClose }: ModalTutorProps) {
  // Solo necesitas el estado isOpen dentro de ModalTutor
  const [isOpen, setIsOpen] = useState(true); // Inicializar el estado como true para abrir el modal por defecto

  function closeModal() {
    setIsOpen(false);
    onClose(); // Llamar a la función onClose para comunicar que se cerró el modal
  }

  return (
    <>
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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  <div className='flex justify-center'>
                    <p className="font-montserrat text-[30px] font-bold text-primary pt-3">PLAN DE ACCIÓN</p>
                  </div>

                </Dialog.Title>
                <div className="mt-2">
                  <p>Nombre:</p>
                  <input type="text" className="w-full border rounded-md px-3 py-2 mt-1 font-montserrat text-[90%] bg-[rgba(255,_255,_255,_0.50)] border-custom drop-shadow-md font-bold "
                    placeholder='Plan para intercambio extranjero' />
                  <p className="mt-4">Descripción:</p>
                  <textarea className="w-full border rounded-md px-3 py-2 mt-1 font-montserrat text-[90%] bg-[rgba(255,_255,_255,_0.50)] border-custom drop-shadow-md font-bold resize-none" rows={4}
                    placeholder='Este plan está diseñado para poder ir de intercambio a España todo pagado.'></textarea>
                </div>
                <div className="mt-4 flex justify-center space-x-16">
                  <Button onClick={closeModal} variant="call-to-action" text="Cancelar" />
                  <Button onClick={() => null} variant="call-to-action" text="Crear Plan" />
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
