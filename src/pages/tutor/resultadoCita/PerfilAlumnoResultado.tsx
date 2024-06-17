import { useState,useEffect } from 'react';
import Button from '../../../components/Button';
import InputTutor from '../../../components/Tutor/InputTutor';
import image from '../../../assets/Tutor/no-avatar.webp';
import ModalDesactivar from '../../../components/Tutor/ModalDesactivar';
import { Label } from 'flowbite-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ListStudent } from '../../../store/types/ListStudent';
import { useDerivacion, useEstudianteResultadoCita, useTutorResultadoCita, useUnidadesDerivacion } from '../../../store/hooks/useResultadoCita';


const PagePerfilAlumnoResultado: React.FC = () =>{
  const navigate = useNavigate();
  const {state} = useLocation();
  const {cita} = state;

  const [isModalOpen, setIsModalOpen] = useState(false);

  //Traer datos del estudiante
  const { estudiante, fetchEstudiante } = useEstudianteResultadoCita(cita); 

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);
 
  useEffect(() => {
    fetchEstudiante()   
  }, []);
  const goToHistoricoCitas = () => {
    //navigate('/programasDeTutoria/detalle-programa/alumno/historicoCitas', { state: { data } });
  };

  const handleClickPlanAccion=()=>{
    navigate("/listadoPlanAccion", {state: {studentId: estudiante?.studentId, programId: cita.programId}});
  }

  return (
    <div className="flex w-full h-full justify-center items-center">

      <div className="flex w-2/3 h-full justify-center items-center">
        <div className="flex-col w-2/3 justify-center items-center gap-6">
          <h1 className="font-montserrat text-4xl font-bold text-primary">{`${estudiante?.name} ${estudiante?.lastName} ${estudiante?.secondLastName}`}</h1>
          <InputTutor titulo="Código" texto={estudiante?.pucpCode} enable={false} />
          <InputTutor titulo="Correo Electrónico" texto={estudiante?.institutionalEmail} enable={false} />
          <InputTutor titulo="Telefono" texto={estudiante?.phone} enable={false} />
          <InputTutor titulo="Facultad" texto={estudiante?.facultyName} enable={false} />
          <InputTutor titulo="Especialidad" texto={estudiante?.specialtyName} enable={false} />
        </div>
      </div>

      <div className="flex w-1/3 h-full items-center">
        <div className="flex flex-col gap-5">
          <img src={image} alt="Imagen Alumno" className="w-[200px] h-[200px] rounded-full" />
          <ul className="flex flex-col items-center w-full">
            <li className='mb-4'>
              <Button onClick={openModal} variant="call-to-action" text="Plan de Acción" />
            </li>
            {/*<li className='mb-4'>
              <Button onClick={() => { }} variant="call-to-action" text="Archivos" />
            </li>*/}
            <li className='mb-4'>
              <Button onClick={goToHistoricoCitas} variant="call-to-action" text="Historico de Citas" />
            </li>
          </ul>
        </div>
      </div>
      {isModalOpen && <ModalDesactivar onClose={closeModal} />}
    </div>
  );
};

export default PagePerfilAlumnoResultado;