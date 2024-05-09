import { Button } from '../../../components';
import { EyeIcon, MagnifyGlass } from '../../../assets';
//import imagenTutor from "../../../../../../../../src/assets/Tutor/usuario.jpg";
import { NavLink } from 'react-router-dom';

type InputProps = {
    className:string;
    nombreAlumno:string;
    onClickVerPerfil:()=>void;
    onClickPlanAccion:()=>void;
}

function ResultadoCitaBlockAlumno({className,nombreAlumno,onClickVerPerfil,onClickPlanAccion}:InputProps) {
  return (
    <div className={className}>
        <div className='flex w-[50%] h-full items-center border-custom drop-shadow-md px-4 justify-between'>
            <span className=' truncate flex flex-row gap-2'>
                <h3 className='font-montserrat text-lg font-bold text-primary'>Alumno :</h3>
                <h3 className='font-montserrat text-lg font-semibold text-primary block truncate'>{nombreAlumno}</h3>
            </span>
        <div className="flex">
          <NavLink to={'/PerfilAlumno'}>
            {/* <img src={null} alt="Imagen Tutor" className="w-[40px] h-[40px] rounded-full" /> */}
          </NavLink>
        </div>
        </div>
        <div className='flex w-[50%] h-full justify-end items-center px-2 gap-4'>
            <Button icon={EyeIcon} iconSize={4} variant='primario' text='Ver Perfil' onClick={onClickVerPerfil}/>
            <Button icon={MagnifyGlass} iconSize={4} variant='call-to-action' text='Plan de Acción' onClick={onClickPlanAccion}/>
        </div>
    </div>
  )
}

export default ResultadoCitaBlockAlumno