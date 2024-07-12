import React, { ChangeEvent, useEffect, useState } from 'react';
import ModalBase from './Tutor/ModalBase';
import Button from './Button';
import ModalSuccess from './ModalSuccess';
import ModalError from './ModalError';
import { Dialog } from '@headlessui/react';
import IconAlertCircle from '../assets/svg/IconAlertCircle';
import { useAppointment } from '../store/hooks/useAppointment';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context';
import { useNotification } from '../store/hooks/useNotification';

interface ButtonModalCancelarCitaProps {
  appointmentId: number;
  redirectUrl?: string;
  onCancelAppointment?: () => void;
}

const ButtonModalCancelarCita: React.FC<ButtonModalCancelarCitaProps> = (
  { appointmentId, redirectUrl, onCancelAppointment }
) => {
  const { userData } = useAuth();
  const userAcountId = userData?.userInfo?.id || 0;

  const { notificarCancelarCita } = useNotification(userAcountId);

  const navigate = useNavigate();
  //console.log(appointmentId);
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
  const redirect = () => {
    if (redirectUrl)
      navigate(redirectUrl);
  };
  //
  const { cancelCita, loading, error } = useAppointment();
  //
  const handleCancelarCita = async () => {
    try {
      const isCancelled = await cancelCita(appointmentId);
      if (isCancelled) {
        handleCloseModal();
        handleOpenSuccessModal();
        await notificarCancelarCita(appointmentId);
        redirect();
      }
      else throw new Error("No se pudo cancelar la cita.");
    } catch (error) {
      handleCloseModal();
      handleOpenErrorModal();
    }
  };
  //
  const onAcceptCancel = () => {
    if (onCancelAppointment) onCancelAppointment();
    setIsSuccessModalOpen(false);
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
          <Button text='Sí, cancelar' onClick={handleCancelarCita} disabled={loading} />
          <Button variant='primario' text='Volver' onClick={handleCloseModal} />
        </div>
      </ModalBase >
      <ModalSuccess
        isOpen={isSuccessModalOpen}
        onClose={onAcceptCancel}
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