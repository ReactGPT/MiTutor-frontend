import React, { ChangeEvent, useEffect, useState } from 'react';
import ModalBase from './Tutor/ModalBase';
import Button from './Button';
import ModalSuccess from './ModalSuccess';
import ModalError from './ModalError';
import { Dialog } from '@headlessui/react';
import IconAlertCircle from '../assets/svg/IconAlertCircle';

interface ButtonModalCancelarCitaProps {

}

const ButtonModalCancelarCita: React.FC<ButtonModalCancelarCitaProps> = (
  { }
) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  //
  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  //
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
  //
  const handleOpenSuccessModal = () => {
    setIsSuccessModalOpen(true);
  };
  const handleOpenErrorModal = () => {
    setIsErrorModalOpen(true);
  };
  //
  const handleCancelarCita = () => {
    //TODO: falta cancelar la cita
    try {
      throw new Error();
      handleCloseModal();
      handleOpenSuccessModal();
    }
    catch {
      handleCloseModal();
      handleOpenErrorModal();
    }
  };
  //
  return (
    <>
      <Button onClick={handleOpenModal} text='Cancelar cita' variant='warning' />
      <ModalBase isOpen={isOpen} onClose={handleCloseModal}>
        <div className="flex flex-col items-center justify-center gap-4 p-5">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
            <IconAlertCircle className="h-6 w-6 text-yellow-500" aria-hidden="true" />
          </div>
          <div className="text-center">
            <Dialog.Title as="h3" className="text-lg leading-6 font-semibold text-gray-900">
              ¿Desea cancelar la cita?
            </Dialog.Title>
            <div>
              <p className="text-sm text-gray-500">
                No podrá revertir esta acción.
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center pt-5 gap-5">
          <Button text='Sí, cancelar' onClick={handleCancelarCita} />
          <Button variant='primario' text='Volver' onClick={handleCloseModal} />
        </div>
      </ModalBase >
      <ModalSuccess
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        message="Se canceló la cita exitosamente."
      />
      <ModalError
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        message="Ha ocurrido un error."
      />
    </>
  );
};

export default ButtonModalCancelarCita;