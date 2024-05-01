import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

import Button from '../Button';

interface ModalDesactivarProps {
    onClose: () => void; // Tipo de onClose
}

export default function ModalDesactivar({ onClose }: ModalDesactivarProps) {
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
                                    <div>
                                        <div className="relative ">
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
                                            <div className="w-10 h-10 bg-red-100 rounded-full flex justify-center pt-1">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    fill="none" viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="red"
                                                    style={{ width: '32px', height: '32px' }}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </div>

                                        </div>
                                        <div className='flex flex-1 justify-center '>
                                            <p className="font-montserrat text-[20px] font-bold text-primary pt-3">
                                                ¿Estás seguro de desactivar el plan?
                                            </p>
                                        </div>
                                    </div>



                                </Dialog.Title>
                                <div className="mt-2">

                                    <textarea className="w-full border rounded-md px-3 py-2 mt-1 font-montserrat text-[90%] bg-[rgba(255,_255,_255,_0.50)] border-custom drop-shadow-md font-bold resize-none" rows={4}
                                        placeholder='Se desactivara el plan de acción y sus compromisos. Estos ya no serán visibles para el alumno.'></textarea>
                                </div>
                                <div className="mt-4 flex justify-center space-x-16">
                                    <Button onClick={closeModal} variant="call-to-action" text="Cancelar" />
                                    <Button onClick={() => null} variant="call-to-action" text="Aceptar" />
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
