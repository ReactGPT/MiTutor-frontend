import React from 'react';
import InputTutor from '../../../components/Tutor/InputTutor';
import TablaDetalle from '../../../components/Tutor/TablaDetalle';
import { useLocation, useNavigate } from "react-router-dom";
import { ListTutoringProgram } from '../../../store/types/ListTutoringProgram';
import TextAreaTutor from '../../../components/Tutor/TextAreaTutor';

const PageDetalleProgramaTutoriaTutor: React.FC = () => {
  const location = useLocation();
  const data: ListTutoringProgram = location.state?.data;

  const navigate = useNavigate();

  const toDetail = () => {
    navigate('/programasDeTutoria/detalle-programa/alumno', { state: { data } });
  };

  return (
    <div className="w-full h-full">
      <div className="w-full flex bg-[rgba(255,255,255,0.5)] border-custom drop-shadow-md p-5" style={{ display: "flex", width: "100%", flexDirection: "column" }}>
        <h1 className="text-3xl font-bold">Datos del Programa de Tutoría</h1>
        <div style={{ display: "flex", width: "100%", flexDirection: "row" }}>
          <div className="w-2/5 h-full flex-basis='50%' flex-shrink='0'">
            <InputTutor titulo="Nombre de Tutoría" texto={data.programName} enable={false} />
            <InputTutor titulo="Unidad Académica" texto={data.specialtyName ? data.specialtyName : data.facultyName} enable={false} />
          </div>
          <div className="flex-grow">
            <TextAreaTutor titulo="Descripcion" texto={data.description} enable={false} />
          </div>
        </div>
      </div>
      <div className="w-full flex bg-[rgba(255,_255,_255,_0.50)] border-custom drop-shadow-md p-5 mt-4"
        style={{ display: "flex", width: "100%", flexDirection: "column" }}>
        <h1 className="text-3xl font-bold">Alumnos de la tutoría</h1>
        <div>
          <TablaDetalle onclick={toDetail} tutoringProgramId={data.tutoringProgramId} />
        </div>
      </div>
    </div>
  );
};

export default PageDetalleProgramaTutoriaTutor;