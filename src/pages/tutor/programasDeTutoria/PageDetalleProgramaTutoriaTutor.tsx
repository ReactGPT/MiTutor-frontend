import React from 'react';
import InputTutor from '../../../components/Tutor/InputTutor';
import TablaDetalle from '../../../components/Tutor/TablaDetalle';
import { useNavigate } from "react-router-dom";

const PageDetalleProgramaTutoriaTutor: React.FC = () => {
  const navigate = useNavigate();
  const toDetail = () => {
    navigate('/miPerfil');
  };

  return (
    <div className="w-full h-full">
      <div className="w-full flex bg-[rgba(255,255,255,0.5)] border-custom drop-shadow-md p-5" style={{ display: "flex", width: "100%", flexDirection: "column" }}>
        <h1 className="text-3xl font-bold">Datos del Programa de Tutoría</h1>
        <div style={{ display: "flex", width: "100%", flexDirection: "row" }}>
          <div className="w-1/4 h-full flex-basis='50%' flex-shrink='0'">
            <InputTutor titulo="Nombre de Tutoría" texto="Programa de Camchimos Ciencias" enable={false} />
            <InputTutor titulo="Unidad Académica" texto="Facultad Ciencia e Ingeniería" enable={false} />
          </div>
          <div className="flex-grow">
            <InputTutor titulo="Descripcion" texto="Tutoría dirigida a los alumnos de primeros ciclos recién ingresados." enable={false} />
          </div>
        </div>
      </div>
      <div className="w-full flex bg-[rgba(255,_255,_255,_0.50)] border-custom drop-shadow-md p-5 mt-4"
        style={{ display: "flex", width: "100%", flexDirection: "column" }}>
        <h1 className="text-3xl font-bold">Alumnos de la tutoría</h1>
        <div>
          <TablaDetalle onclick={toDetail} />
        </div>
      </div>
    </div>
  );
};

export default PageDetalleProgramaTutoriaTutor;