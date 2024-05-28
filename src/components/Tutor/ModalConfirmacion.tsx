import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Button from '../Button';

interface ModalConfirmacionProps {
  show: boolean;
  onClose: () => void;
}

export default function ModalConfirmacion({ show, onClose }: ModalConfirmacionProps) {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => {}} // Deshabilitamos el cierre automático al hacer clic fuera del modal
      >
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
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="font-montserrat text-[20px] font-bold text-primary">
                      Solicitud Enviada
                    </p>
                    <p className="font-montserrat text-[16px] text-primary pt-3">
                      Debe esperar a que la solicitud sea confirmada para poder solicitar citar al tutor
                    </p>
                  </div>
                </div>
              </Dialog.Title>
              <div className="mt-4 flex justify-center space-x-16">
                <Button onClick={onClose} variant="call-to-action" text="Aceptar" />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
