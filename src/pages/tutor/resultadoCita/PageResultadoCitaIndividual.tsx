import React from 'react'; 
import { useEffect, useState } from 'react'
import ResultadoCitaBlockAlumno from './ResultadoCitaBlockAlumno';
import ResultadoCitaBlock2 from './ResultadoCitaBlock2';
import ResultadoCitaBlock3 from './ResultadoCitaBlock3';
import { useLocation,useNavigate,useParams } from 'react-router-dom';
//import { Appointment } from '../../../store/types/Appointment';
import { ListCita } from '../../../store/types/ListCita';
import GoogleForm from './GoogleFormEmbed';

const PageResultadoCitaIndividual: React.FC = () =>{
    const navigate = useNavigate();
    const {state} = useLocation();
    const {cita} = state;
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
        navigate("/listadoPlanAccion");
    }

  return (
    <div className='w-full overflow-hidden'>
        <div className='max-h-[80vh] overflow-auto'>
            {citaModified && (
                <>
                <ResultadoCitaBlockAlumno 
                    className='gap-4 flex w-full h-[10%] min-h-[90px] max-h-[140px] py-4'
                    nombreAlumno={citaModified.name+' '+citaModified.lastName+' '+citaModified.secondLastName}
                    onClickVerPerfil={handleClickVerPerfil}
                    onClickPlanAccion={handleClickPlanAccion}
                />  
                <div className='flex w-full h-[90%] max-h-[90%] gap-4'>
                    <ResultadoCitaBlock2 cita={citaModified} onChangeCita={handleOnChangeCita} className='flex w-[50%] max-h-[90vh] h-full flex-col gap-4'/>
                    <div className='w-[50%] h-[100%] overflow-y-auto'>
                        <GoogleForm className='flex w-[100%] max-h-[90vh] h-full flex-col gap-4'/>
                    </div>
                </div>
                </>
            )}
        </div>
    </div>
  )
}
//<GoogleForm className='flex w-[50%] max-h-[80vh] h-full flex-col gap-4'/>
export default PageResultadoCitaIndividual
/*<ResultadoCitaBlock3 cita={citaModified} onChange={handleOnChangeCita} className='w-[50%] h-full border-custom drop-shadow-md p-4'/> */