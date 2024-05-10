import { useState } from 'react';
import Button from '../../../components/Button';
import InputTutor from '../../../components/Tutor/InputTutor';
import image from '/src/assets/Tutor/no-avatar.webp';
import ModalDesactivar from '../../../components/Tutor/ModalDesactivar';
import { Label } from 'flowbite-react';
import { useLocation } from 'react-router-dom';
import { ListStudent } from '../../../store/types/ListStudent';


const PagePerfilAlumnoTutor = () => {
  const location = useLocation();
  const data: ListStudent = location.state?.data;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full h-full flex">
      <div className="w-1/2 flex flex-col">
        <div className="flex justify-center">
          <h1 className="font-montserrat text-[50px] font-bold text-primary pt-12">{`${data.name} ${data.lastName} ${data.secondLastName}`}</h1>
        </div>
        <div className="flex-1 pt-12">
          <ul className="px-11">
            <Label value="Codigo:" className="text-primary font-roboto" />
            <InputTutor texto={data.pucpCode} enable={false} />
            <Label value="Correo:" className="text-primary font-roboto" />
            <InputTutor texto={data.institutionalEmail} enable={false} />
            <Label value="Telefono:" className="text-primary font-roboto" />
            <InputTutor texto={data.phone} enable={false} />
            <Label value="Facultad:" className="text-primary font-roboto" />
            <InputTutor texto={data.facultyName} enable={false} />
            <Label value="Especialidad:" className="text-primary font-roboto" />
            <InputTutor texto={data.specialtyName} enable={false} />
          </ul>
        </div>
      </div>
      <div className="w-1/2">
        <div className="flex justify-center">
          <img src={image} alt="Imagen Tutor" className="w-[200px] h-[200px] rounded-full mt-16" />
        </div>
        <div>
          <div className="flex justify-center">
            <h2 className="font-montserrat text-[35px] font-bold text-primary pt-12">Resultados</h2>
          </div>
          <div className="flex justify-center">
            <div className="space-x-4 pt-5">
              <ul className="flex flex-col items-center w-full">
                <li className='mb-4'>
                  {/* Botón que abre el modal */}
                  <Button onClick={openModal} variant="call-to-action" text="Plan de Acción" />
                </li>
                <li className='mb-4'>
                  <Button onClick={() => null} variant="call-to-action" text="Archivos" />
                </li>
                <li className='mb-4'>
                  <Button onClick={() => null} variant="call-to-action" text="Historico de Citas" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <ModalDesactivar onClose={closeModal} />}
    </div>
  );
};

export default PagePerfilAlumnoTutor;