import React from 'react';
import { AddCircleIcon } from '../../../assets';
import Button from '../../../components/Button';
import { useNavigate } from 'react-router-dom';
const PageInicioTutor = () => {
  const navigate = useNavigate();
  
  const cita={
    id:1,
    date:"08/10/2024",
    startTime:"09:00",
    endTime:"10:00",
    reason:"Futuro Laboral",
    studentProgramId:5,
    studentProgramName:"Programa Vocacional",
    isInPerson:true,
    attendanceId:2,
    studentAnnotations:"El alumnno...zzzz",
    privateAnnotation:"Tomar en cuenta ....zzz",
    student:{
        id:3,
        nombre:"Renato Suarez Campos"
    },
    derivation:{
        reason:"No cumple sus compromisos",
        comment:"No es mi área de especialidad"
    }
  }
  const handleTestNavigation= ()=>{
    navigate("/resultadoCitaIndividual",{state:{cita: cita}});
  }


  return (
    <div className="w-full h-full">
      <Button onClick={handleTestNavigation} icon={AddCircleIcon}/>
    </div>
  );
};

export default PageInicioTutor;