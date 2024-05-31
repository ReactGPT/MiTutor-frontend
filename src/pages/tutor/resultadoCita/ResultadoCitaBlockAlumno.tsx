import { Button } from '../../../components';
import { EyeIcon, MagnifyGlass } from '../../../assets';
//import imagenTutor from "../../../../../../../../src/assets/Tutor/usuario.jpg";
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../context';
type InputProps = {
    className:string;
    nombreAlumno:string;
    onClickVerPerfil:()=>void;
    onClickPlanAccion:()=>void;
}

function ResultadoCitaBlockAlumno({className,nombreAlumno,onClickVerPerfil,onClickPlanAccion}:InputProps) {
  
  return (
    <div className={className}>  
          <div className="flex w-[50%] bg-[rgba(255,255,255,0.5)] border-custom drop-shadow-md p-5 justify-between" style={{ height: '15%' }}> 
            <div className="flex items-center">
                <span className="font-montserrat text-lg font-bold text-primary mr-2">Alumno:</span>
                <span className="font-montserrat text-lg mr-2">{nombreAlumno}</span>
            </div>   
              <div className="flex"/>
                <NavLink to={'/PerfilAlumno'}>
                  {/* <img src={null} alt="Imagen Tutor" className="w-[40px] h-[40px] rounded-full" /> */}
                </NavLink> 
        </div>
        <div className='flex w-[50%] h-full justify-end px-2 gap-4'>
            <Button icon={EyeIcon} iconSize={4} variant='primario' text='Ver Perfil' onClick={onClickVerPerfil}/>
            <Button icon={MagnifyGlass} iconSize={4} variant='call-to-action' text='Plan de Acción' onClick={onClickPlanAccion}/>
        </div>
    </div>
  )
}

export default ResultadoCitaBlockAlumno