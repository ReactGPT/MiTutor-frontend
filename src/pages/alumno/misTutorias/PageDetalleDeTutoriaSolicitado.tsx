import TextBox from "../../../components/TextBox";
import { Button } from "../../../components";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import SimpleCard from "../../../components/Tutor/SimpleCard";
import { da } from "date-fns/locale";
import { programaDeTutoriaAlumno } from "../../../store/types/ListTutoringProgram";
import { useTutoresPorTutoriayAlumno } from "../../../store/hooks/useListarTutoresPorAlumno";
import { useState, useEffect } from "react";
import React from 'react';
import { Spinner } from "../../../components";
import { useAuth } from "../../../context";

enum Estado {
  SIN_TUTOR = "SIN_TUTOR",
  SOLICITUD_PENDIENTE = "SOLICITUD_PENDIENTE",
  TUTOR_ASIGNADO = "TUTOR_ASIGNADO"
}

const PageDetalleDeTutoriaSolicitado = () => {
  const { userData } = useAuth();
  const studentId = userData?.userInfo?.id || 0;

  const location = useLocation();
  const data = location.state.data;

  const { listaDeTutores, estado, fetchTutoresPorTutoria, loading } = useTutoresPorTutoriayAlumno(data.tutoringProgramId, studentId);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTutoresPorTutoria();
  }, []);

  const goToTutorPlan = () => {
    navigate('/misTutorias/detalle/planesDeAccion', { state: { programId: data.tutoringProgramId, tutorId: listaDeTutores[0].tutorId } });
  };

  const goToTutorList = () => {
    const tutoriaData = { tutoringProgramId: data.tutoringProgramId };
    navigate('/solicitarTutor', { state: { tutoriaData } });
  };

  const goToSolicitarCita = () => {
    const datos = { tutoringProgram: data, tutor: listaDeTutores[0] };
    navigate('/misTutorias/detalle/solicitarCita', { state: { datos } });
  };

  let componenteActual: JSX.Element;

  useEffect(() => {
    fetchTutoresPorTutoria();
  }, []);

  switch (estado) {
    case Estado.SIN_TUTOR:
      componenteActual = <SimpleCard content="" title="Sin Tutor Asignado" subContent="" />;
      break;
    case Estado.SOLICITUD_PENDIENTE:
      componenteActual = <SimpleCard content="Docente a tiempo completo" title={`${listaDeTutores[0].tutorName} ${listaDeTutores[0].tutorLastName} ${listaDeTutores[0].tutorSecondLastName}`} subContent="PENDIENTE" />;
      break;
    case Estado.TUTOR_ASIGNADO:
      componenteActual = <SimpleCard content="Docente a tiempo completo" title={`${listaDeTutores[0].tutorName} ${listaDeTutores[0].tutorLastName} ${listaDeTutores[0].tutorSecondLastName}`} subContent="" />;
      break;
    default:
      componenteActual = <div className="w-full h-[90%] flex items-center justify-center"> <Spinner size="xl" /> </div>;
  }

  return (
    <div className="w-full h-full flex flex-col gap-5">

      {/*Datos Tutoria*/}
      <div className="w-full h-[44%] p-4 border-custom shadow-custom bg-[rgba(255,_255,_255,_0.50)] font-roboto">
        <span className="font-montserrat text-2xl font-bold text-primary">Datos Tutoria</span>

        <div className="w-full flex gap-5">
          <TextBox className="w-full" nombre='Nombre' contenido={data.programName} />
          <TextBox className="w-full" nombre='Facultad' contenido={data.facultyName} />
          <TextBox className="w-full" nombre='Especialidad' contenido={data.specialtyName} />
        </div>

        <div className="w-full flex">
          <TextBox className="w-1/2" nombre='Descripcion' contenido={data.programDescription} />
        </div>

        <div className="w-full flex items-center justify-center p-2">
          <Button onClick={goToSolicitarCita} variant="primario" text="Solicitar cita" disabled={estado != Estado.TUTOR_ASIGNADO} />
        </div>

      </div>

      <div className="w-full flex h-[56%] gap-5">
        {/*tutor*/}
        <div className="flex flex-col w-[30%] h-full p-4 border-custom shadow-custom bg-[rgba(255,_255,_255,_0.50)] font-roboto">
          <div className="flex">
            <span className="font-montserrat text-2xl font-bold text-primary">Tutor</span>
            <div className="w-full h-full flex justify-end">
              <Button onClick={goToTutorList} variant="primario" text="Solicitar tutor" disabled={estado == Estado.TUTOR_ASIGNADO || estado == Estado.SOLICITUD_PENDIENTE} />
            </div>
          </div>
          <div className="w-full h-full flex justify-center items-center">
            {
              loading ?
                <div className="w-full h-[90%] flex items-center justify-center">
                  <Spinner size="xl" />
                </div>
                :
                componenteActual
            }
          </div>
        </div>

        {/*Plan de Accion*/}
        <div className="flex flex-col w-[70%] h-full p-4 border-custom shadow-custom bg-[rgba(255,_255,_255,_0.50)] font-roboto">
          <span className="font-montserrat text-2xl font-bold text-primary">Plan de Acción</span>
          <div className="w-full h-full"></div>
          <div className="w-full flex items-center justify-center">
            <Button onClick={goToTutorPlan} text="Ver plan de accion" disabled={estado != Estado.TUTOR_ASIGNADO} />
          </div>
        </div>

      </div>
    </div>

  );
};

export default PageDetalleDeTutoriaSolicitado;