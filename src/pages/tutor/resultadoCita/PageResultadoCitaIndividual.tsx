import { useEffect, useState } from 'react'
import ResultadoCitaBlockAlumno from './ResultadoCitaBlockAlumno';
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


function PageResultadoCitaIndividual() {
    const navigate = useNavigate();
    const {state} = useLocation();
    const {cita} = state;
    const [citaModified,setCitaModified] = useState<Appointment>(cita);
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
        navigate("/listadoPlanAccion", {state: {studentProgramId: citaModified?.studentProgramId}});
    }

  return (
    <div className='w-full overflow-hidden'>
        <div className='max-h-[80vh] overflow-auto'>
            {citaModified && (
                <>
                <ResultadoCitaBlockAlumno 
                    className='gap-4 flex w-full h-[10%] min-h-[90px] max-h-[140px] py-4'
                    nombreAlumno={citaModified?.student?.nombre}
                    onClickVerPerfil={handleClickVerPerfil}
                    onClickPlanAccion={handleClickPlanAccion}
                />  
                <div className='flex w-full h-[90%] max-h-[90%] gap-4'>
                    <ResultadoCitaBlock2 cita={citaModified} onChangeCita={handleOnChangeCita} className='flex w-[50%] h-full flex-col gap-4'/>
                    <ResultadoCitaBlock3 cita={citaModified} onChange={handleOnChangeCita} className='w-[50%] h-full border-custom drop-shadow-md p-4'/>
                </div>
                </>
            )}
        </div>
    </div>
  )
}

export default PageResultadoCitaIndividual

 