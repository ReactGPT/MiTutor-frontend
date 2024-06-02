import React from 'react'; 
import { useEffect, useState } from 'react'
import ResultadoCitaBlockAlumno from './ResultadoCitaBlockAlumno';
import ResultadoCitaBlock2 from './ResultadoCitaBlock2'; 
import { useLocation,useNavigate,useParams } from 'react-router-dom'; 
import { ListCita } from '../../../store/types/ListCita';
import FormularioDerivacion from './FormularioDerivacion'; 
import { useAuth } from '../../../context';

const PageResultadoCitaIndividual: React.FC = () =>{
    const navigate = useNavigate();
    const {state} = useLocation();
    const {cita} = state;
    //const {userData}=useAuth();
     
    const handleClickVerPerfil= ()=>{
        navigate("/PerfilAlumno",{state: {studentId: cita?.personId}});
    };
    const handleClickPlanAccion=()=>{
        navigate("/listadoPlanAccion", {state: {studentId: cita?.personId, programId: cita?.programId}});
    }

   return (
    <div className='w-full overflow-hidden'>
        <div className='max-h-[80vh] overflow-auto'>
            {cita && (
                <>
                <ResultadoCitaBlockAlumno 
                    className='gap-4 flex w-full h-[10%] min-h-[90px] max-h-[140px] py-4'
                    nombreAlumno={cita.name+' '+cita.lastName+' '+cita.secondLastName}
                    onClickVerPerfil={handleClickVerPerfil}
                    onClickPlanAccion={handleClickPlanAccion}
                />  
                <div className='flex w-full h-[90%] max-h-[90%] gap-4'>
                    <ResultadoCitaBlock2 cita={cita} className='flex w-[50%] max-h-[90vh] h-full flex-col gap-4 flex-grow' />
                    <div className='w-[50%] border-custom drop-shadow-md pb-10'> 
                        <FormularioDerivacion cita={cita} className='flex max-h-[90vh] h-full flex-col gap-4 flex-grow p-4 ' />{/*border-custom drop-shadow-md p-4  */}
                    </div>
                </div>
                </>
            )}
        </div>
    </div>
  )
}
//<div className='w-full flex items-center mb-5 '>
//<GoogleForm className='flex w-[50%] max-h-[80vh] h-full flex-col gap-4'/>
export default PageResultadoCitaIndividual
/*<GoogleForm className='flex w-[100%] max-h-[90vh] h-full flex-col gap-4' cita={citaModified}/> */
/*<ResultadoCitaBlock3 cita={citaModified} onChange={handleOnChangeCita} className='w-[50%] h-full border-custom drop-shadow-md p-4'/> */
//<FormularioDerivacion className='flex w-[100%] max-h-[90vh] h-full flex-col gap-4 border-custom drop-shadow-md p-4' cita={citaModified}/>