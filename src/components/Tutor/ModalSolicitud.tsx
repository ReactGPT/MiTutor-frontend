import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Button from '../Button';
import ModalConfirmacion from './ModalConfirmacion';

interface ModalSolicitudProps {
  onClose: () => void;
  content: React.ReactNode;
  motivo: string;
  setMotivo: (motivo: string) => void;
  handleSolicitarTutor: () => void;
}

export default function ModalSolicitud({ onClose, content, motivo, setMotivo, handleSolicitarTutor }: ModalSolicitudProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [confirmacionOpen, setConfirmacionOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
    onClose();
  };

  const handleSolicitarClick = () => {
    handleSolicitarTutor();
    //setIsOpen(false); // Cerramos el modal principal
    setConfirmacionOpen(true); // Abrimos el modal de confirmación
  };

  const handleAceptarClick = () => {
    //setConfirmacionOpen(false); // Cerramos el modal de confirmación 
  };

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
                  <div>
                    <div className="relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        style={{ width: '40px', height: '49px', cursor: 'pointer' }}
                        className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 hover:stroke-red-500 bg-[rgba(255,255,255,0.50)] border-custom drop-shadow-md"
                        onClick={closeModal}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <div className="flex flex-1 justify-center">
                      <p className="font-montserrat text-[20px] font-bold text-primary pt-3 text-center">
                        ¿Por qué razón desea solicitar al tutor?
                      </p>
                    </div>
                    <div className="flex flex-1 justify-center">
                      <p className="font-montserrat text-[12px] font-medium text-primary text-center">
                        {content}
                      </p>
                    </div>
                  </div>
                </Dialog.Title>
                <div className="mt-2">
                  <textarea
                    rows={4}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    style={{ resize: 'none' }}
                    placeholder="Escriba el motivo"
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                  />
                </div>
                <div className="mt-4 flex justify-end">
                  <Button onClick={handleSolicitarClick} text="Solicitar Tutor" />
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      {/*<ModalConfirmacion show={confirmacionOpen} onClose={handleAceptarClick} />*/}
    </>
  );
}
