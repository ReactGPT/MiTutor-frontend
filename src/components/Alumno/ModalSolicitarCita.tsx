import React, { ChangeEvent, useEffect, useState } from 'react';
import { SlotInfo } from 'react-big-calendar';
import ModalBase from '../Tutor/ModalBase';
import Button from '../Button';
import { Datepicker, Label, Select, TextInput } from 'flowbite-react';
import { useAppointment } from '../../store/hooks/useAppointment';
import ModalSuccess from '../ModalSuccess';
import ModalError from '../ModalError';
import { useAuth } from '../../context';

type MakeAppointment = {
  startTime: string;
  endTime: string;
  creationDate: string;
  reason: string;
  isInPerson: boolean;
  classroom: string;
};

interface ModalSolicitarCitaProps {
  isOpen: boolean;
  onClose: () => void;
  slotInfo: SlotInfo | null;
  refreshCalendar: () => void;
  tutorId: number;
  tutoringProgram: any;
}

const ModalSolicitarCita: React.FC<ModalSolicitarCitaProps> = (
  { isOpen, onClose, slotInfo, refreshCalendar, tutorId, tutoringProgram }
) => {
  const { userData } = useAuth();
  const studentId = userData?.userInfo?.id || 0;
  //
  const faceToFace: boolean = tutoringProgram.faceToFace;
  const virtual: boolean = tutoringProgram.virtual;
  const tutoringProgramId = tutoringProgram.tutoringProgramId;
  //
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
  const handleOpenSuccessModal = () => {
    setIsSuccessModalOpen(true);
  };
  const handleOpenErrorModal = () => {
    setIsErrorModalOpen(true);
  };
  //

  const { addNewAppointment, loading, error } = useAppointment();

  const [appointment, setAppointment] = useState<MakeAppointment>({
    startTime: "",
    endTime: "",
    creationDate: "",
    reason: "Razon Generica",
    isInPerson: true,
    classroom: "",
  });

  const handleModalidadChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newIsInPerson = e.target.value === "presencial";
    setAppointment((prevAppointment) => ({
      ...prevAppointment,
      isInPerson: newIsInPerson,
    }));
  };

  useEffect(() => {
    if (slotInfo) {
      setAppointment((prevAppointment) => ({
        ...prevAppointment,
        startTime: slotInfo?.start.toTimeString().split(' ')[0] || '',
        endTime: slotInfo?.end.toTimeString().split(' ')[0] || '',
        creationDate: slotInfo?.start.toLocaleDateString() || '',
      }));
    }
  }, [slotInfo]);

  const handleAddAppointment = async () => {
    try {
      await addNewAppointment({
        appointment,
        idProgramTutoring: tutoringProgramId,
        idTutor: tutorId,
        idStudent: [studentId],
      });
      refreshCalendar();
      onClose();
      handleOpenSuccessModal();
    } catch (error) {
      handleOpenErrorModal();
    }
  };

  return (
    <>
      <ModalBase isOpen={isOpen} onClose={onClose}>
        <div className="flex flex-col gap-5 p-5 border-custom bg-[rgba(255,255,255,0.50)]">
          <h3 className="text-3xl font-semibold font-roboto text-primary pr-5">
            Reservar Cita
          </h3>
          <div>
            <Label value="Fecha" className='font-roboto text-primary' />
            <Datepicker value={slotInfo?.start.toLocaleDateString()} disabled />
          </div>
          <div className="flex gap-5 items-center justify-between">
            <div>
              <Label value="Desde" className='font-roboto text-primary' />
              <TextInput type="time" value={slotInfo?.start.toTimeString().split(' ')[0]} disabled />
            </div>
            <div>
              <Label value="Hasta" className='font-roboto text-primary' />
              <TextInput type="time" value={slotInfo?.end.toTimeString().split(' ')[0]} disabled />
            </div>
          </div>
          <div>
            <Label value="Modalidad" className='font-roboto text-primary' />
            {faceToFace && virtual &&
              <>
                <Select id="modalidad" onChange={handleModalidadChange} required>
                  <option value="presencial">Presencial</option>
                  <option value="virtual">Virtual</option>
                </Select>
              </>
            }
            {faceToFace && !virtual &&
              <TextInput value="Presencial" disabled />
            }
            {!faceToFace && virtual &&
              <TextInput value="Virtual" disabled />
            }
          </div>
          <div className="flex gap-5 items-center justify-center">
            <Button
              text="Reservar Cita"
              variant="call-to-action"
              onClick={handleAddAppointment}
            />
            <Button
              text="Cancelar"
              variant="warning"
              onClick={onClose}
            />
          </div>
        </div>
      </ModalBase>
      <ModalSuccess
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        message="Se registró la cita exitosamente."
      />
      <ModalError
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        message="Ha ocurrido un error."
      />
    </>
  );
};

export default ModalSolicitarCita;