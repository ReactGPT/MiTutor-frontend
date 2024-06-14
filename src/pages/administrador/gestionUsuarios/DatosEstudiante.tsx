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
import InputAdmin from '../../../components/Administrador/InputAdmin';
import { useAppSelector } from '../../../store/hooks';

function DatosEstudiante() {
  const { user, onChangeUser } = useUserContext();
  const { facultyList, specialityList } = useAppSelector((state: RootState) => state.parameters);

  const handleClick = () => {
    console.log(user);
  }

  return (
    <div className='flex flex-col w-full h-full'>
      <div className='flex flex-row justify-between w-full'>
        <h2 className='text-xl font-bold text-primary'>Datos Estudiante</h2>
      </div>
      <div className='flex flex-row gap-10 w-full '>
        <div className='flex flex-col w-1/2 p-3'>
          <label className="font-roboto text-base text-primary">Facultad</label>
          <Combobox name="estudiante.facultyId"
            buttonStyle='w-full h-full px-3 py-2 mt-1 font-roboto text-base bg-[rgba(255,_255,_255,_0.50)] border-custom drop-shadow-md font-normal'
            noMt={true}
            options={facultyList}
            onChange={(value: any) => {
              onChangeUser("estudiante.facultyId", value.id);
            }}
            value={user.estudiante?.facultyId === -1 ? null : facultyList.find((item) => item.id === user.estudiante?.facultyId)}
            text='Facultad' />
        </div>
        <div className='flex flex-col w-1/2 p-3'>
          <label className="font-roboto text-base text-primary">Especialidad</label>
          <Combobox name="estudiante.specialityId"
            buttonStyle='w-full h-full mt-1 font-roboto text-base bg-[rgba(255,_255,_255,_0.50)] border-custom drop-shadow-md font-normal'
            noMt={true}
            options={specialityList}
            onChange={(value: any) => {
              onChangeUser("estudiante.specialityId", value.id);
            }}
            value={user.estudiante?.specialityId === -1 ? null : specialityList.find((item) => item.id === user.estudiante?.specialityId)}
            text='Especialidad' />
        </div>
      </div>
    </div>
  )
}

export default DatosEstudiante