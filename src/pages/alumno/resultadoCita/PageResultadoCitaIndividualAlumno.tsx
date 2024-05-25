import { useEffect, useState } from 'react'

import { useLocation,useNavigate,useParams } from 'react-router-dom';
import { Appointment } from '../../../store/types';
import ResultadoCitaBlockAlumno from '../../tutor/resultadoCita/ResultadoCitaBlockAlumno';
import ResultadoCitaBlock2 from '../../tutor/resultadoCita/ResultadoCitaBlock2';
import ResultadoCitaBlock3 from '../../tutor/resultadoCita/ResultadoCitaBlock3';
import { Button, InputCell } from '../../../components';
import ResultadoCardInformacionAlumno from './ResultadoCardInformacionAlumno.tsx';
import InputTutor from '../../../components/Tutor/InputTutor';
import InputAlumno from '../InputAlumno.tsx';
import { ListCita } from '../../../store/types/ListCita.ts';

type Student = {
    id:number;
    nombre:string;
}


type Derivation= {
    id?:number;
    reason:string;
    comment:string;
}


// type ResultadoCitaProps = {
    
//     cita:Appointment;
    
// }

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

const mock_appointment:Appointment= {
    "id": 1,
    "date": "2024-05-23",
    "startTime": "09:00",
    "endTime": "10:30",
    "reason": "Math Tutoring Session",
    "studentProgramId": 101,
    "studentProgramName": "Advanced Math Program",
    "isInPerson": true,
    "attendanceId": 2024,
    "studentAnnotations": "Student needs extra help with calculus.",
    "privateAnnotation": "Consider additional resources for improvement.",
    "student": {
        "id": 1001,
        "nombre": "Jane"
    },
    "derivation": {
        "id": 5631,
        "comment": "",
        reason: ""
    }
}

function PageResultadoCitaIndividualAlumno() {
    const navigate = useNavigate();
    const {state} = useLocation();
    const cita= state;
    const [citaModified,setCitaModified] = useState<ListCita>(cita);
     
    const handleOnChangeCita = (name:string,value:any)=>{
        if(citaModified){
            setCitaModified({...citaModified,
                [name]:value
            })
        }
    }
     
    useEffect(()=>{
        console.log(citaModified);
    },[citaModified])


    const handleClickVerPerfil= ()=>{
        navigate("/PerfilAlumno");
    };
    const handleClickPlanAccion=()=>{
        //navigate("/");
    }

  return (
    <div className='w-full overflow-hidden '>
        <div className='h-full overflow-auto flex flex-col gap-5'>
            
            {citaModified && (
                <>
                <div className='h-fit bg-gradient-to-r from-slate-200/50 to-blue-50 p-10 rounded-xl border-custom border border-secondary flex flex-col '>
                    <h2 className='text-3xl font-bold text-primary'>Datos Generales</h2>
                    <div className='grid grid-cols-3 grid-rows-2  gap-10 h-full pt-5'>
                     
                        <div className=' gap-2'>
                            <label className="text-xl font-medium text-primary">Estado</label>
                            <InputAlumno className='flex-1' disabled={true} value={citaModified.cita.appointmentStatus}/>
                        </div>
                     
                        <div className='gap-2'>
                            <label className="text-xl font-medium text-primary">Fecha</label>
                            <InputAlumno className='flex-1' disabled={true} value={citaModified.cita.startTime}/>
                        </div>
                     
                        <div className='gap-2'>
                            <label className="text-xl font-medium text-primary">Hora</label>
                            <InputAlumno className='flex-1' disabled={true} value={`${citaModified.cita.startTime} - ${citaModified.cita.endTime}`}/>
                        </div>
                     
                        <div className='gap-2'>
                            <label className="text-xl font-medium text-primary">Motivo</label>
                            <InputAlumno className='flex-1' disabled={true} value={citaModified.cita.reason}/>
                        </div>
                     
                        <div className='gap-2'>
                            <label className="text-xl font-medium text-primary">Programa de Tutoría</label>
                            <InputAlumno className='flex-1'disabled={true} value={citaModified.cita.programName}/>
                        </div>
                     
                        <div className='gap-2'>
                            <label className="text-xl font-medium text-primary">Modalidad</label>
                            <InputAlumno className='flex-1'disabled={true} value={citaModified.cita.isInPerson ? 'Presencial' : 'Virtual'}/>
                        </div>
                        <div className='gap-2'>
                            <label className="text-xl font-medium text-primary">Sesión</label>
                            <InputAlumno className='flex-1'disabled={true} value={citaModified.cita.isInPerson ? 'Oficina del Profesor' : 'Link de Zoom'}/>
                        </div>
                        
                       <div className=' row-start-2 col-start-3 row-span-2 mt-auto '>
                        <Button text='Ver perfil' variant='primario' className='w-full flex justify-center font-bold text-blue-600' onClick={handleClickVerPerfil}/>
                       </div>
                    </div>
                </div>
                <div className='gap-10 grid ma grid-cols-[repeat(auto-fit,minmax(min(15rem,100%),1fr))] mx-auto w-full '>
                
                <ResultadoCardInformacionAlumno cardTitle='Tutor' />
                <ResultadoCardInformacionAlumno cardTitle='Comentario del Tutor'emptyMessage='Por el momento, no hay comentarios del docente. Regresa más tarde.'/>
                <ResultadoCardInformacionAlumno cardTitle='Documentos'  emptyMessage='Por el momento no hay documentos. Regresa más tarde.'/>
                 
                    
                </div>
                </>
            )}
        </div>
    </div>
  )
}



export default PageResultadoCitaIndividualAlumno

 