import React, { useState } from 'react';
import { Button, Combobox, InputCell, Spinner } from '../../../components';
import { SaveIcon, CloseIcon } from '../../../assets';
import { useUserContext } from '../../../context/UsuarioNuevo';
import { RootState } from '../../../store/store';
import { useUser } from '../../../store/hooks/useUser';
import { useNavigate } from 'react-router-dom';
import ModalSuccess from '../../../components/ModalSuccess';
import ModalError from '../../../components/ModalError';
import InputTutor from '../../../components/Tutor/InputTutor';

function DatosCuenta() {
  const { user, onChangeUserObject } = useUserContext();

  return (
    < div className='flex flex-col w-full h-full' >
      <div className='flex flex-row justify-between max-h-[45px] w-full h-[30%]'>
        <h2 className='text-xl font-bold text-primary'>Datos de la Cuenta</h2>
      </div>
      <div className='flex flex-row w-full h-full gap-2 h-[70%]'>
        <div className='flex flex-col w-[30%]'>
          <div className='flex flex-col gap-2'>
            <InputTutor titulo="Correo Institucional" value={user?.institutionalEmail} enable={false} />
            <InputTutor titulo="Código PUCP" value={user?.pucpCode} enable={false} />
          </div>
        </div>
      </div>
    </div>
  );

}

export default DatosCuenta