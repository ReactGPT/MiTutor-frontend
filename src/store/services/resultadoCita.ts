import axios from 'axios';
import { ListCita } from '../types/ListCita';
import { InitialData } from '../types/AppointmentResult';
 

async function getResultadoCita(cita : ListCita): Promise<InitialData> { 
  try{
      const response = await axios.get(`https://localhost:44369/consultarResultadoCita?appointmentId=${cita.appointmentId}&studentId=${cita.personId}&tutoringProgramId=${cita.programId}`);  
 
      return response.data;
  }catch(error){
      throw new Error("Error en getListaDeCitasByTutorId");
  }

} 

async function updateResultadoCita(cita: InitialData) {
  try {
    const response = await fetch(`https://localhost:44369/actualizarResultadoCita?id_appointmentResult=${cita.appointmentResult.appointmentResultId}&asistio=${cita.appointmentResult.asistio}&startTime=${cita.appointmentResult.startTime}&endTime=${cita.appointmentResult.endTime}`, {
      method: 'PUT'
    }); 
  } catch (error) {
    console.error('Error:', error);
  }
}


async function updateComentario(cita: InitialData) {
  try {
    const response = await fetch(`https://localhost:44369/actualizarComentarioxID?id_comment=${cita.appointmentResult.comments[0].commentId}&message=${cita.appointmentResult.comments[0].message}`, {
      
      method: 'PUT', // Método de solicitud HTTP 
      });

      const response2 = await fetch(`https://localhost:44369/actualizarComentarioxID?id_comment=${cita.appointmentResult.comments[1].commentId}&message=${cita.appointmentResult.comments[1].message}`, {
      
      method: 'PUT', // Método de solicitud HTTP 
      });  
  } catch (error) {
    console.error('Error:', error);
  }
} 


export { getResultadoCita, updateResultadoCita, updateComentario};