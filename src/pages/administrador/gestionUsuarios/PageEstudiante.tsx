import React, { useState } from 'react'
import { Button } from '../../../components'
import { User } from '../../../store/types/User'
import { useLocation, useNavigate } from 'react-router-dom'
import ModalConfirmation from '../../../components/ModalConfirmation'
import InputTutor from '../../../components/Tutor/InputTutor'
import DatosPersona from './DatosPersona'
import { UserProvider, useUserContext } from '../../../context/UsuarioNuevo'
//import { StudentProvider, useStudentContext } from '../../../context/EstudianteNuevo'
import DatosCuenta from './DatosCuenta'
import { useUser } from '../../../store/hooks/useUser'
import ModalSuccess from '../../../components/ModalSuccess'
import ModalError from '../../../components/ModalError'
import { Spinner } from 'flowbite-react'
import { CloseIcon, SaveIcon } from '../../../assets'
import DatosEncabezadoCuenta from './DatosEncabezadoCuenta'
import DatosEstudiante from './DatosEstudiante'


export default function PageEstudiante() {
  const { state } = useLocation();
  const { userData } = state;
  //console.log(userData);
  const navigate = useNavigate();


  return (
    <UserProvider user={userData}>
      <div className="flex w-full h-full">
        <div className="flex flex-col w-full h-full gap-4 px-4">
          <DatosEncabezadoCuenta rol='estudiante'/>
          <div className='flex flex-col gap-10 w-full'>
            <div className='flex flex-row gap-10 w-full'>
              <div className='flex flex-col gap-2 w-1/2 min-h-[240px] border-custom drop-shadow-md px-4 py-2'>
                <DatosPersona />
              </div>
              <div className='flex flex-col gap-2 w-1/2 min-h-[240px] border-custom drop-shadow-md px-4 py-2'>
                <DatosCuenta />
              </div>
            </div>
            <div className='flex flex-col gap-2 w-full h-full border-custom drop-shadow-md px-4 py-2'>
              <DatosEstudiante />
            </div>
          </div>
        </div>
      </div>
    </UserProvider>
  );
}
