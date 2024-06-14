import React, { useState } from 'react';
import { Button, Combobox, InputCell, Spinner } from '../../../components';
import { SaveIcon, CloseIcon } from '../../../assets';
import { useUserContext } from '../../../context/UsuarioNuevo';
import { useUser } from '../../../store/hooks/useUser';
import { useNavigate } from 'react-router-dom';
import ModalSuccess from '../../../components/ModalSuccess';
import ModalError from '../../../components/ModalError';
import InputTutor from '../../../components/Tutor/InputTutor';
import InputAdmin from '../../../components/Administrador/InputAdmin';

function DatosPersona() {
  const { user, onChangeUser } = useUserContext();

  const handleClick = () => {
    console.log(user);
  }

  return (
    <div className='flex flex-col w-full h-full'>
      <div className='flex flex-row justify-between max-h-[45px] w-full h-[30%]'>
        <h2 className='text-xl font-bold text-primary'>Datos Personales</h2>
      </div>
      <div className='flex flex-row w-full h-full gap-2 h-[70%]'>
        <div className='flex flex-col w-[100%]'>
          <div className='flex flex-col gap-2'>
            <InputAdmin titulo="Nombres" name="persona.name" text={user.persona.name} placeholder='Ingresa los nombres' enable={true} onChange={{tipo: 'object', onChange: onChangeUser }}/>

            <div className='grid grid-cols-2 gap-4' style={{ width: "100%" }} >
              <InputAdmin titulo="Primer Apellido" name="persona.lastName" text={user?.persona.lastName} placeholder='Ingresa el primer apellido'  enable={true} onChange={{tipo: 'object', onChange: onChangeUser }}/>
              <InputAdmin titulo="Segundo Apellido" name="persona.secondLastName" text={user?.persona.secondLastName} placeholder='Ingresa el segundo apellido' enable={true} onChange={{tipo: 'object', onChange: onChangeUser }}/>
            </div>
            <InputAdmin titulo="Teléfono" name="persona.phone" placeholder='Ingresa el número de teléfono' text={user?.persona.phone} enable={true} onChange={{tipo: 'object', onChange: onChangeUser }} type='number'/>
            <button onClick={handleClick}> HolA</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DatosPersona