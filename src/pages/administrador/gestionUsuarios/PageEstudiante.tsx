import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import DatosPersona from './DatosPersona'
import { UserProvider} from '../../../context/UsuarioNuevo'
import DatosCuenta from './DatosCuenta'
import DatosEncabezadoCuenta from './DatosEncabezadoCuenta'
import DatosEstudiante from './DatosEstudiante'


export default function PageEstudiante() {
  const { state } = useLocation();
  const { userData } = state;
  //console.log(userData);
  const navigate = useNavigate();
  const [fieldErrors, setFieldErrors] = useState({
    phone: '',
    pucpCode: '',
    institutionalEmail: '',
    name: '',
    lastName: '',
    specialityId: ''
  });


  return (
    <UserProvider user={userData}>
      <div className="flex w-full h-full">
        <div className="flex flex-col w-full h-full gap-4 px-4">
          <DatosEncabezadoCuenta rol='estudiante' fieldErrors={fieldErrors} setFieldErrors={setFieldErrors}/>
          <div className='flex flex-col gap-10 w-full'>
            <div className='flex flex-row gap-10 w-full'>
              <div className='flex flex-col gap-2 w-1/2 min-h-[240px] border-custom drop-shadow-md px-4 py-2'>
                <DatosPersona fieldErrors={fieldErrors} setFieldErrors={setFieldErrors}/>
              </div>
              <div className='flex flex-col gap-2 w-1/2 min-h-[240px] border-custom drop-shadow-md px-4 py-2'>
                <DatosCuenta fieldErrors={fieldErrors} setFieldErrors={setFieldErrors} />
              </div>
            </div>
            <div className='flex flex-col gap-2 w-full h-full border-custom drop-shadow-md px-4 py-2'>
              <DatosEstudiante fieldErrors={fieldErrors} setFieldErrors={setFieldErrors} />
            </div>
          </div>
        </div>
      </div>
    </UserProvider>
  );
}
