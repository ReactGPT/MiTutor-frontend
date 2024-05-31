import { useState,useEffect } from 'react';
import Button from '../../../components/Button';
import InputTutor from '../../../components/Tutor/InputTutor';
import imagenTutor from '../../../assets/Tutor/usuario.jpg';
import ModalTutor from '../../../components/Tutor/ModalTutor';
import ModalDesactivar from '../../../components/Tutor/ModalDesactivar';
import { useLocation } from 'react-router-dom';
import { ListStudent } from '../../../store/types/ListStudent'; 
import axios from 'axios';
import image from '../../../assets/Tutor/no-avatar.webp';
import {Services as ServicesProperties} from '../../../config';
import { Label } from 'flowbite-react';
import { useAuth } from '../../../context';
const PageMiPerfilAlumno = () => {
  const {userData}= useAuth();
  const {state} = useLocation();
  const studentId = !!state?state.studentId:userData.userInfo?.id.toString();
      
  const [student, setStudent] = useState<ListStudent>();
  
  // Trae los datos de estudiante
  const fetchData = async () => {
    try {
      const response = await axios.get(ServicesProperties.BaseUrl+'/seleccionarEstudiantePorId/' + studentId);
      const data = response.data.data;
      setStudent(data);  
    } catch (error) {
      console.error('Error Datos del estudiante:', error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []); // Verificar el valor actualizado de student

  useEffect(() => {
    console.log('Student actualizado:', student);
  }, [student]);

  return (
    
    <div className="w-full h-full flex">
      <div className="w-1/2 flex flex-col">
        <div className="flex justify-center">
          <h1 className="font-montserrat text-[50px] font-bold text-primary pt-12">{student?.name+' '+student?.lastName+' '+student?.secondLastName}</h1>
        </div>
        <div className="flex-1 pt-12">
          <ul className="px-11">
          <Label value="Codigo:" className="text-primary font-roboto" />
            <InputTutor texto={student?.pucpCode} enable={false} />
            <Label value="Correo:" className="text-primary font-roboto" />
            <InputTutor texto={student?.institutionalEmail} enable={false} />
            <Label value="Telefono:" className="text-primary font-roboto" />
            <InputTutor texto={student?.phone} enable={false} />
            <Label value="Facultad:" className="text-primary font-roboto" />
            <InputTutor texto={student?.facultyName} enable={false} />
            <Label value="Especialidad:" className="text-primary font-roboto" />
            <InputTutor texto={student?.specialtyName} enable={false} />
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
                  <Button onClick={() => null}  variant="primario" text="Plan de Acción" />
                </li>
                <li className='mb-4'>
                  <Button onClick={() => null}  variant="primario" text="Archivos" />
                </li>
                <li className='mb-4'>
                  <Button onClick={() => null}  variant="primario" text="Historico de Citas" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
       
    </div>
  );
};

export default PageMiPerfilAlumno;