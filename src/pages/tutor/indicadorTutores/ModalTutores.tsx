import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '../../../components'; // Asegúrate de que la ruta del Button sea correcta
import { useNavigate } from 'react-router-dom';

interface Tutor {
    tutorId: number;
    userAccount: {
        institutionalEmail: string;
        persona: {
            name: string;
            lastName: string;
            secondLastName: string;
        };
    };
}

const ModalTutores: React.FC<{ isOpen: boolean, onClose: () => void, tutors: Tutor[] }> = ({ isOpen, onClose, tutors }) => {
    const navigate = useNavigate();

    const handleTutorClick = (tutor: Tutor) => {
        navigate('/tutor-detail', { state: { tutor } });
    };

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={onClose}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 " >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-blue-100 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-md w-full p-6">
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold text-gray-800 text-center">Listado de Tutores</h2>
                            </div>
                            <div className="overflow-auto max-h-96">
                                {tutors.length > 0 ? (
                                    <ul className="divide-y divide-gray-200">
                                        {tutors.map((tutor) => (
                                            <li
                                                key={tutor.tutorId}
                                                className="py-2 cursor-pointer hover:bg-gray-200"
                                                onClick={() => handleTutorClick(tutor)}
                                            >
                                                <h3 className="text-lg font-medium text-gray-800">
                                                    {tutor.userAccount.persona.name} {tutor.userAccount.persona.lastName} {tutor.userAccount.persona.secondLastName}
                                                </h3>
                                                <p className="text-gray-600">{tutor.userAccount.institutionalEmail}</p>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-600">No hay tutores disponibles.</p>
                                )}
                            </div>
                            <div className="flex items-center justify-center pt-5">
                                <Button text='Cerrar' onClick={onClose} />
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default ModalTutores;

