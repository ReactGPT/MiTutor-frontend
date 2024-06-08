import React, { useState } from 'react'
import { Button } from '../../../components'
import { User } from '../../../store/types/User'
import { useLocation } from 'react-router-dom'
import ModalConfirmation from '../../../components/ModalConfirmation'
import InputTutor from '../../../components/Tutor/InputTutor'
import DatosPersona from './DatosPersona'
import { UserProvider } from '../../../context/UsuarioNuevo'
import DatosCuenta from './DatosCuenta'


export default function PageUsuario() {
  const { state } = useLocation();
  const { userData } = state;
  console.log(userData);
  const [isOpenModalConfirmation, setIsOpenModalConfirmation] = useState<boolean>(false);

  return (
    <UserProvider user={userData}>
      <div className="flex w-full h-full justify-center items-center">

        <div className="flex w-2/3 h-full justify-center items-center">
          <div className="flex-col w-2/3 justify-center items-center gap-6">
            <h1 className="font-montserrat text-4xl font-bold text-primary">{`${userData.persona.name} ${userData.persona.lastName} ${userData.persona.secondLastName}`}</h1>
            <div className='flex relative z-10 flex-col gap-2 w-full min-h-[240px] h-[25%] border-custom drop-shadow-md px-4 py-2'>
              <DatosPersona />
            </div>
            <div className='flex relative z-10 flex-col gap-2 w-full min-h-[240px] h-[25%] border-custom drop-shadow-md px-4 py-2'>
              <DatosCuenta />
            </div>

          </div>
        </div>
      </div>
    </UserProvider>
  );
}
