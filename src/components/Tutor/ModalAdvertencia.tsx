import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Button from '../Button';

interface ModalAdvertenciaProps {
  title: string;
  description: string;
  icon?: any;
  iconSize?: number,
  onClose: () => void;
  action: () => void;
}

export default function ModalAdvertencia({ title, description, icon, iconSize, onClose,action }: ModalAdvertenciaProps) {
  let iconClass = 'text-2xl';
  const Icon = icon;

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
              <div className="p-4">
                <div className="flex flex-col items-center justify-center w-80">
                  {icon && <Icon className={iconClass} size={iconSize}></Icon>}
                  <p className="font-montserrat text-[25px] font-bold text-primary my-3 text-center">{title}</p>
                  <p className="font-montserrat text-[18px] font-medium text-gray-700 mt-4 my-4 w-96 text-center">{description}</p>
                  <div className="flex justify-between items-center w-80 px-100 px-100 mt-3">
                    <Button text="&nbsp;&nbsp;&nbsp;&nbsp;Cancelar&nbsp;&nbsp;&nbsp;&nbsp;" onClick={onClose} variant='call-to-action' />
                    <Button text="&nbsp;&nbsp;&nbsp;&nbsp;Eliminar&nbsp;&nbsp;&nbsp;&nbsp;" onClick={action} variant='warning' />
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
