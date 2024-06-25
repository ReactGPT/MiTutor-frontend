import React, { useState } from 'react';
import { Button, Checkbox, Combobox, InputCell, Spinner, Toogle } from '../../../components';
import { SaveIcon, CloseIcon } from '../../../assets';
import { useUserContext } from '../../../context/UsuarioNuevo';
import { RootState } from '../../../store/store';
import { useUser } from '../../../store/hooks/useUser';
import { useNavigate } from 'react-router-dom';
import ModalSuccess from '../../../components/ModalSuccess';
import ModalError from '../../../components/ModalError';
import InputTutor from '../../../components/Tutor/InputTutor';
import InputAdmin from '../../../components/Administrador/InputAdmin';

function DatosCuenta() {
  const { user, onChangeUser } = useUserContext();

  return (
    <div className='flex flex-col w-full h-full'>
      <div className='flex flex-row justify-between max-h-[45px] w-full h-[30%]'>
        <h2 className='text-xl font-bold text-primary'>Datos Cuenta</h2>
      </div>
      <div className='flex flex-row w-full gap-2 h-[70%]'>
        <div className='flex flex-col w-[100%]'>
          <div className='flex flex-col gap-2'>
            <InputAdmin titulo="Correo Institucional" text={user?.institutionalEmail} name="institutionalEmail" placeholder='Ingresa el correo institucional' enable={true} onChange={{ tipo: 'object', onChange: onChangeUser }} />
            <InputAdmin titulo="Código PUCP" text={user?.pucpCode} name="pucpCode" placeholder='Ingresa el código PUCP' enable={true} onChange={{ tipo: 'object', onChange: onChangeUser }} />
            <div className='grid grid-cols-2 gap-4' style={{ width: "100%" }}>
              <InputAdmin titulo='Fecha Creación' placeholder={user?.creationDate ? new Date(user.creationDate).toLocaleDateString() : 'No disponible'} enable={false} onChange={{ tipo: 'object', onChange: onChangeUser }} />
              <InputAdmin titulo='Fecha Modificación' placeholder={user?.modificationDate ? new Date(user.modificationDate).toLocaleDateString() : 'No disponible'} enable={false} onChange={{ tipo: 'object', onChange: onChangeUser }} />
            </div>
            {user.id != -1 && <Toogle boxSize='w-[100%] gap-5 p-3' onChange={() => { onChangeUser("isActive", !user.isActive); }} value={user.isActive} text='Estado de Cuenta' />}
          </div>
        </div>
      </div>
    </div>
  );

}

export default DatosCuenta;