import { useState } from 'react';
import Button from '../../../components/Button';
import InputTutor from '../../../components/Tutor/InputTutor';
import image from '../../../assets/Tutor/no-avatar.webp';
import ModalDesactivar from '../../../components/Tutor/ModalDesactivar';
import { Label } from 'flowbite-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ListStudent } from '../../../store/types/ListStudent';


const PagePerfilAlumnoTutor = () => {
  const location = useLocation();
  const data: ListStudent = location.state?.data;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const navigate = useNavigate();

  const goToHistoricoCitas = () => {
    navigate('/programasDeTutoria/detalle-programa/alumno/historicoCitas', { state: { data } });
  };

  const goToArchivos = () => {
    if (data.studentId) {
      navigate('/programasDeTutoria/detalle-programa/alumno/archivos', { state: { userDataId: data.studentId, data } });
    } 
  };

  const handleClickPlanAccion=()=>{
    //navigate("/listadoPlanAccion", {state: {studentId: data.studentId, programId: data. cita?.programId}});
  }

  return (
    <div className="flex w-full h-full justify-center items-center">

      <div className="flex w-2/3 h-full justify-center items-center">
        <div className="flex-col w-2/3 justify-center items-center gap-6">
          <h1 className="font-montserrat text-4xl font-bold text-primary">{`${data.name} ${data.lastName} ${data.secondLastName}`}</h1>
          <InputTutor titulo="Código" texto={data.pucpCode} enable={false} />
          <InputTutor titulo="Correo Electrónico" texto={data.institutionalEmail} enable={false} />
          <InputTutor titulo="Telefono" texto={data.phone} enable={false} />
          <InputTutor titulo="Facultad" texto={data.facultyName} enable={false} />
          <InputTutor titulo="Especialidad" texto={data.specialtyName} enable={false} />
        </div>
      </div>

      <div className="flex w-1/3 h-full items-center">
        <div className="flex flex-col gap-5">
          <img src={image} alt="Imagen Alumno" className="w-[200px] h-[200px] rounded-full" />
          <ul className="flex flex-col items-center w-full">
            {/*<li className='mb-4'>
              <Button onClick={openModal} variant="call-to-action" text="Plan de Acción" />
            </li>*/}
            <li className='mb-4'>
              <Button onClick={goToArchivos} variant="call-to-action" text="Archivos" />
            </li>
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

export default PagePerfilAlumnoTutor;