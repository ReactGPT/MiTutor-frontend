import React, { useState, useEffect } from 'react'; 
import FormfacadeEmbed from "@formfacade/embed-react"; 
import axios from 'axios';
import ModalDerivacion from '../../../components/Tutor/ModalDerivacion';
import { ListCita } from '../../../store/types/ListCita';
import {Services as ServicesProperties} from '../../../config'; 
import { ListStudent } from '../../../store/types/ListStudent'; 

type InputProps = {
  className:string; 
  cita:ListCita;
} 
function GoogleForm({className,cita}:InputProps){  
  const [student, setStudent] = useState<ListStudent>();
  
  const fetchData = async () => {
    try {
      const response = await axios.get(ServicesProperties.BaseUrl+'/seleccionarEstudiantePorId/' + cita.personId);
      const data = response.data.data;
      setStudent(data);  
    } catch (error) {
      console.error('Error Datos del estudiante:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    console.log('Student actualizado:', student);
  }, [student]);

  useEffect(() => { // Cargar los datos predeterminados cuando el componente se monte 
    const interval = setInterval(() => {
      const inputElement1 = document.querySelector('input[name="entry.915213797"]');
      const inputElement2 = document.querySelector('input[name="entry.437483400"]');
      
      if (inputElement1) {
        inputElement1.value = `${cita.name} ${cita.lastName} ${cita.secondLastName}`;   
        inputElement1.readOnly = true;

       //inputElement2.value = `${student?.pucpCode}`;   
        //inputElement2.readOnly = true;
      }
    },0); // Revisa cada 100ms si el formulario ha cargado
 
  }, []); 
 
  const [isModalOpen, setIsModalOpen] = useState(false); 
    
  const openModal = () => {
    setIsModalOpen(true);
  };
    
  const closeModal = () => {
    setIsModalOpen(false);
  };

  async function onSubmitForm(){ 
    //aca llama al servicio
    setIsModalOpen(true);
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbyRW0w8YFDBjmYyuLBpfk8sfPqNKTkkfsnd87CO6aOjtAudDhCvdAMVhemiC9CTWkkb_Q/exec';
 
    try{
      const response = await axios.get(scriptUrl);  
      console.log(response) 
    }catch(error){
        throw new Error("Error en datos");
    }
  }   

  return (  
    <div className={className}>  
      {!isModalOpen ? (
        <FormfacadeEmbed
          formFacadeURL= "https://formfacade.com/include/102689651376161215250/form/1FAIpQLSfIzrqfZ-ghfsMGvIjad-xJn9NZhqTYp69JI8oeJQsVB9g4Aw/classic.js/?div=ff-compose"
          onSubmitForm={onSubmitForm} 
        />
      ) : (
        <div>
          <div>{isModalOpen && <ModalDerivacion onClose={closeModal} />}</div>
        </div>
      )}
    </div>
  );
};

export default GoogleForm;



//cita.name+' '+cita.lastName+' '+cita.secondLastName