import React, { useState } from 'react'
import { Button } from '../../../components'
import { User } from '../../../store/types/User'
import { TutoringProgramProvider } from '../../../context/ProgramaTutoriaNuevo'
import { useLocation } from 'react-router-dom'
import ModalConfirmation from '../../../components/ModalConfirmation'
import InputTutor from '../../../components/Tutor/InputTutor'


export default function PageUsuario() {
  const { state } = useLocation();
  const { userData } = state;

  const [isOpenModalConfirmation, setIsOpenModalConfirmation] = useState<boolean>(false);

  return (
    <div className="flex w-full h-full justify-center items-center">

      <div className="flex w-2/3 h-full justify-center items-center">
        <div className="flex-col w-2/3 justify-center items-center gap-6">
          <h1 className="font-montserrat text-4xl font-bold text-primary">{`${userData?.userInfo?.personInfo.name} ${userData?.userInfo?.personInfo.lastName} ${userData?.userInfo?.personInfo.secondLastName}`}</h1>
          <InputTutor titulo="Código" texto={userData?.userInfo?.pucpCode} enable={false} />
          <InputTutor titulo="Correo Electrónico" texto={userData?.email} enable={false} />
          <InputTutor titulo="Telefono" texto={userData?.userInfo?.personInfo.phone} enable={false} />
          <InputTutor titulo="Facultad" texto="FALTA" enable={false} />
          <InputTutor titulo="Especialidad" texto="FALTA" enable={false} />
        </div>
      </div>

      <div className="flex w-1/3 h-full justify-center items-center">
        <div className="flex w-full">
          {userData ?
            <img src={userData?.imageUrl} alt="Imagen Tutor" className="w-[200px] h-[200px] rounded-full" />
            :
            <img src={image} alt="Imagen Alumno" className="w-[200px] h-[200px] rounded-full" />
          }
        </div>
      </div>

    </div>

  );
}
