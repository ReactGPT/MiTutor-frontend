import React, { useState } from 'react';
import { Button, Combobox } from '../../../components';
import { DerivationBienestar } from '../../../store/types/Derivation';
import { useAuth } from '../../../context';
import { TutorRoleDetails } from '../../../store/types';
import InputTutor from '../../../components/Tutor/InputTutor';
import TextAreaTutor from '../../../components/Tutor/TextAreaTutor';
import { useLocation } from 'react-router-dom';
import { CloseIcon, EditIcon, SaveIcon } from '../../../assets';

function PageDetalleDerivacion() {
  const { userData } = useAuth();
  const tutorId = (userData?.userInfo?.roles[0].details as TutorRoleDetails).tutorId;
  //Nombre del archivo
  const [fileName, setFileName] = useState('');
  const carpeta = "derivaciones";
  const { state } = useLocation();
  const { derivationData } = state;

  const statusOptions = [
    { id: 1, name: 'Pendiente' },
    { id: 2, name: 'Observado' },
    { id: 3, name: 'Atendido' },
  ];

  const handleGuadarDerivacion = async () => {
    //await actualizarDerivacion();
  };

  return (
    <div className='flex flex-col w-full h-full gap-4'>
      <div className='flex flex-row gap-4 justify-end'>
        <Button text='Editar' variant='primario' icon={EditIcon} iconSize={6} onClick={() => { }} />
        <Button text='Guardar' variant='call-to-action' icon={SaveIcon} iconSize={6} onClick={() => { }} />
      </div>
      <div className='grid grid-cols-2 grid-rows-2 gap-5'>
        <div className='flex flex-col gap-2 min-h-[240px] border-custom drop-shadow-md px-4 py-2'>
          <div className='flex flex-row justify-between max-h-[45px] w-full h-[30%]'>
            <h2 className='text-xl font-bold text-primary'>Datos del Alumno</h2>
          </div>
          <div className='flex flex-row w-full h-full gap-2 h-[70%]'>
            <div className='flex flex-col w-[100%]'>
              <div className='flex flex-col gap-2'>
                <InputTutor titulo="Código del alumno" name="persona.name" value={derivationData.codigoAlumno} texto='Ingresa los nombres' enable={false} readOnly={true}/>
                <InputTutor titulo="Nombres del alumno" name="persona.name" value={derivationData.nombreAlumno} texto='Ingresa los nombres' enable={false} readOnly={true}/>
                <InputTutor titulo="Correo del alumno" name="persona.name" value={derivationData.correoAlumno} texto='Ingresa los nombres' enable={false} readOnly={true}/>
                <InputTutor titulo="Programa de Tutoría" name="persona.name" value={derivationData.programName} texto='Ingresa los nombres' enable={false} readOnly={true}/>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-2 min-h-[240px] border-custom drop-shadow-md px-4 py-2 row-span-2 '>
          <div className='flex flex-row justify-between max-h-[45px] w-full h-[30%]'>
            <h2 className='text-xl font-bold text-primary'>Detalles de la Derivación</h2>
          </div>
          <div className='flex flex-row w-full h-full gap-2 h-[70%]'>
            <div className='flex flex-col w-[100%]'>
              <div className='flex flex-col gap-2'>
                <InputTutor titulo="Fecha de Creación" name="persona.name" value={derivationData.creationDate} enable={false} readOnly={true}/>
                <InputTutor titulo="Unidad de Derivación" name="persona.name" value={derivationData.unitDerivationName} texto='Ingresa los nombres' enable={false} readOnly={true}/>
                <TextAreaTutor titulo="Motivo de la Derivación" name="persona.name" value={derivationData.reason} texto='Ingresa los nombres' enable={false} readOnly={true}/>
                <TextAreaTutor titulo="Comentarios Adicionales" name="persona.name" value={derivationData.comment} texto='Ingresa los nombres' enable={false} readOnly={true}/>


                <TextAreaTutor titulo="Observaciones" name="persona.name" value={derivationData.observaciones} texto='Ingresa los nombres' enable={true} />
                <div className="drop-shadow-md flex space-x-5 height-100%"
                  style={{ display: "flex", height: "100%", flexDirection: "column" }}>
                  <div className='flex flex-col p-3'>
                    <label className="font-roboto text-base text-primary">Estado de la Solicitud de Derivación</label>
                    <Combobox name="Seleccione el estado"
                      buttonStyle='w-full h-full px-3 py-2 mt-1 font-roboto text-base bg-[rgba(255,_255,_255,_0.50)] border-custom drop-shadow-md font-normal'
                      noMt={true}
                      options={statusOptions}
                      value={statusOptions.find((item) => item.name === derivationData.status)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-2 min-h-[240px] border-custom drop-shadow-md px-4 py-2'>
          <div className='flex flex-row justify-between max-h-[45px] w-full h-[30%]'>
            <h2 className='text-xl font-bold text-primary'>Datos del Tutor</h2>
          </div>
          <div className='flex flex-row w-full h-full gap-2 h-[70%]'>
            <div className='flex flex-col w-[100%]'>
              <div className='flex flex-col gap-2'>
                <InputTutor titulo="Código" name="persona.name" value={derivationData.codigoTutor} texto='Ingresa los nombres' enable={false} readOnly={true}/>
                <InputTutor titulo="Nombres" name="persona.name" value={derivationData.nombreTutor} texto='Ingresa los nombres' enable={false} readOnly={true}/>
                <InputTutor titulo="Correo" name="persona.name" value={derivationData.correoTutor} texto='Ingresa los nombres' enable={false} readOnly={true}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageDetalleDerivacion;
