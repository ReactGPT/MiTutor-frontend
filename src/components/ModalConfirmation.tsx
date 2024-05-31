import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Button from './Button';
import IconAlertCircle from '../assets/svg/IconAlertCircle';
import IconCheckCircle from '../assets/svg/IconCheckCircle';

interface ModalConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  isAcceptAction: boolean;
}

const ModalConfirmation: React.FC<ModalConfirmationProps> = ({ isOpen, onClose, onConfirm, message, isAcceptAction }) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={onClose}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="flex flex-col items-center justify-center gap-4">
                <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${isAcceptAction ? 'bg-green-100' : 'bg-red-100'} sm:mx-0 sm:h-10 sm:w-10`}>
                  {isAcceptAction ? (
                    <IconCheckCircle className="h-6 w-6 text-green-600" aria-hidden="true" />
                  ) : (
                    <IconAlertCircle className="h-6 w-6 text-red-600" aria-hidden="true" />
                  )}
                </div>
                <div className="text-center">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-semibold text-gray-900">
                    Confirmación
                  </Dialog.Title>
                  <div>
                    <p className="text-sm text-gray-500">
                      {message}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center pt-5 space-x-4">
                <Button text='Cancelar' onClick={onClose} />
                <Button text='Confirmar' onClick={onConfirm} />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalConfirmation;
