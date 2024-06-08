import React from 'react';
import InputTutor from '../../../components/Tutor/InputTutor';
import TablaDetalle from '../../../components/Tutor/TablaDetalle';
import { useLocation, useNavigate } from "react-router-dom";
import { ListTutoringProgram } from '../../../store/types/ListTutoringProgram';
import { Label, TextInput, Textarea } from 'flowbite-react';

const PageDetalleProgramaTutoriaTutor: React.FC = () => {
  const location = useLocation();
  const data: ListTutoringProgram = location.state?.data;

  const navigate = useNavigate();

  const toDetail = () => {
    navigate('/programasDeTutoria/detalle-programa/alumno', { state: { data } });
  };

  return (
    <div className="flex flex-col w-full h-full">

      <div className="flex flex-col w-full h-fit bg-[rgba(255,255,255,0.5)] border-custom drop-shadow-md p-5" >
        <h1 className="text-3xl font-bold">Datos de Tutoría</h1>
        <div className="flex w-full h-full">
          <div className="flex flex-col w-full">
            <div className='flex w-full gap-5'>
              <div className='w-1/2'>
                <Label className="text-primary font-roboto">Nombre de Tutoría</Label>
                <TextInput value={data.programName} readOnly />
              </div>
              <div className='w-1/2'>
                <Label className="text-primary font-roboto">Unidad Académica</Label>
                <TextInput value={data.specialtyName ? data.specialtyName : data.facultyName} readOnly />
              </div>
            </div>
            <Label className="text-primary font-roboto">Descripción</Label>
            <Textarea className='min-h-16 max-h-16' value={data.description} readOnly />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 w-full h-3/4 bg-[rgba(255,_255,_255,_0.50)] border-custom drop-shadow-md p-5 mt-4">
        <h1 className="text-3xl font-bold">Alumnos inscritos</h1>
        <div className='w-full h-full'>
          <TablaDetalle onclick={toDetail} tutoringProgramId={data.tutoringProgramId} />
        </div>
      </div>

    </div>
  );
};

export default PageDetalleProgramaTutoriaTutor;