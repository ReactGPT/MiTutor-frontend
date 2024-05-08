import { useState } from 'react';
import Button from '../../../components/Button';
import InputTutor from '../../../components/Tutor/InputTutor';
import imagenTutor from '/src/assets/Tutor/usuario.jpg';
import ModalDesactivar from '../../../components/Tutor/ModalDesactivar';


const PageMiPerfilTutor = () => {
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
          <h1 className="font-montserrat text-[50px] font-bold text-primary pt-12">Juanita Chávez</h1>
        </div>
        <div className="flex-1 pt-12">
          <ul className="px-11">
            <InputTutor texto="Codigo: " />
            <InputTutor texto="Correo: " />
            <InputTutor texto="Teléfono: " />
            <InputTutor texto="Facultad: " />
            <InputTutor texto="Especialidad: " />
          </ul>
        </div>
      </div>
      <div className="w-1/2">
        <div className="flex justify-center">
          <img src={imagenTutor} alt="Imagen Tutor" className="w-[200px] h-[200px] rounded-full mt-16" />
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

export default PageMiPerfilTutor;