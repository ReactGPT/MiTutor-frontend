import React, { useEffect, useState } from 'react'
import ResultadoCitaBlock1 from './ResultadoCitaBlock1';
import ResultadoCitaBlock2 from './ResultadoCitaBlock2';
import ResultadoCitaBlock3 from './ResultadoCitaBlock3';
import { useLocation,useNavigate,useParams } from 'react-router-dom';
import { Appointment } from '../../../store/types';
type Student = {
    id:number;
    nombre:string;
}


type Derivation= {
    id?:number;
    reason:string;
    comment:string;
}


type ResultadoCitaProps = {
    
    cita:Appointment;
    
}

const AppointmentAttendanceOptions=[
    {
        id:1,
        nombre:"Falta"
    },
    {
        id:2,
        nombre:"Asistido"
    },
    {
        id:3,
        nombre:"Estado3"
    },
    {
        id:4,
        nombre:"Estado4"
    }
]


function pageResultadoCitaIndividual() {
    const navigate = useNavigate();
    const {state} = useLocation();
    const {cita} = state;
    const [citaModified,setCitaModified] = useState<Appointment>(cita);
    const handleOnChangeCita = (name:string,value:any)=>{
        setCitaModified({...citaModified,
            [name]:value
        })
    }
    //const [testValue,setTestValue] = useState<any>(state)
    /*useEffect(()=>{
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
                comment:""
            }
        }
        !!!state && setTestValue({
            cita:{...cita}
        })
    },[]);*/
    useEffect(()=>{
        //console.log(paramName);
        setCitaModified({...cita})
    },[])
    const handleClickVerPerfil= ()=>{
        //navigate("/");
    };
    const handleClickPlanAccion=()=>{
        //navigate("/");
    }
  return (
    <div className='flex flex-col w-full h-full gap-4'>
        <ResultadoCitaBlock1 
            className='gap-4 flex w-full h-[10%] min-h-[90px] max-h-[140px] py-4'
            nombreAlumno={citaModified?.student?.nombre}
            onClickVerPerfil={handleClickVerPerfil}
            onClickPlanAccion={handleClickPlanAccion}
            />
        <div className='flex w-full h-full max-h-[90%] gap-4'>
            <ResultadoCitaBlock2 cita={citaModified} onChangeCita={handleOnChangeCita} className='flex w-[50%] h-full flex-col gap-2'/>
            <ResultadoCitaBlock3 className='flex w-[50%] h-full border-custom drop-shadow-md p-4'/>
        </div>
    </div>
  )
}

export default pageResultadoCitaIndividual