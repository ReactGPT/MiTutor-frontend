import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

interface ModalResultadoCitaProps {
  onClose: () => void; // Tipo de onClose
  loading:boolean;
}

export default function ModalResultadoCita({ onClose,loading }: ModalResultadoCitaProps) {
  // Solo necesitas el estado isOpen dentro de ModalTutor
  const [isOpen, setIsOpen] = useState(true); // Inicializar el estado como true para abrir el modal por defecto

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
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  <div className=''>

                    <div className="absolute right-7 top-7">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        style={{ width: '40px', height: '49px', cursor: 'pointer' }}
                        className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 hover:stroke-red-500
                                                bg-[rgba(255,_255,_255,_0.50)] border-custom drop-shadow-md"
                        onClick={closeModal}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                      
                    </div>


                    <div className='flex-1 flex justify-center'>
                      <div className="w-10 h-10 bg-green-100 rounded-full flex justify-center pt-1 items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>

                      </div>

                    </div>
                    <div className='flex flex-1 justify-center '>
                      <p className="font-montserrat text-[20px] font-bold text-primary pt-3">
                        Cambios Registrados
                      </p>
                    </div>
                  </div>
                </Dialog.Title>
                <div className="mt-2">
                  {loading ? (
                    <div className='w-full flex justify-center items-center'>
                      <ClipLoader color="#3498db" loading={loading} size={60} />
                    </div>
                  ) : (
                    <p className='font-montserrat text-[15px] text-primary pt-3 text-center'>Los cambios se registraron con éxito</p>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
  );
}
