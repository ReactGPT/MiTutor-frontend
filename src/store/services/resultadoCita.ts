import axios from 'axios';
import { ListCita } from '../types/ListCita';
import { InitialData } from '../types/AppointmentResult';
import { ListStudent } from '../types/ListStudent';
import { ListUnitDerivation }from '../types/ListUnitDerivation';
import { Services as ServicesProperties} from '../../config'; 
import { Tutor } from '../types/Tutor';
import { Derivation } from '../types/Derivation';

async function getResultadoCita(cita : ListCita): Promise<InitialData> { 
  try{
      const response = await axios.get(ServicesProperties.BaseUrl+`/consultarResultadoCita?appointmentId=${cita.appointmentId}&studentId=${cita.personId}&tutoringProgramId=${cita.programId}`);  
      console.log("resultado cira", response.data)
      return response.data;
  }catch(error){
      throw new Error("Error en getListaDeCitasByTutorId");
  }

} 

async function updateResultadoCita(cita: InitialData) {
  try {
    const response = await fetch(ServicesProperties.BaseUrl+`/actualizarResultadoCita?id_appointmentResult=${cita.appointmentResult.appointmentResultId}&asistio=${cita.appointmentResult.asistio}&startTime=${cita.appointmentResult.startTime}&endTime=${cita.appointmentResult.endTime}`, {
      method: 'PUT'
    }); 
  } catch (error) {
    console.error('Error:', error);
  }
}


async function updateComentario(cita: InitialData) {
  try {
    const response = await fetch(ServicesProperties.BaseUrl+`/actualizarComentarioxID?id_comment=${cita.appointmentResult.comments[0].commentId}&message=${cita.appointmentResult.comments[0].message}`, {
      
      method: 'PUT', // Método de solicitud HTTP 
      });

      const response2 = await fetch(ServicesProperties.BaseUrl+`/actualizarComentarioxID?id_comment=${cita.appointmentResult.comments[1].commentId}&message=${cita.appointmentResult.comments[1].message}`, {
      
      method: 'PUT', // Método de solicitud HTTP 
      });  
  } catch (error) {
    console.error('Error:', error);
  }
} 

//DERIVACION
async function getEstudianteDatos(cita : ListCita): Promise<ListStudent> { 
  try{
      const response = await axios.get(ServicesProperties.BaseUrl+'/seleccionarEstudiantePorId/'+cita.personId);
      return response.data.data;
  }catch(error){
      throw new Error("Error en getEstudianteDatos");
  }

} 
//seleccionarTutorPorId
async function getTutorDatos(idTutor:number): Promise<Tutor> { 
  try{
      const response = await axios.get(ServicesProperties.BaseUrl+'/seleccionarTutorPorId/'+idTutor);
      return response.data.data;
  }catch(error){
      throw new Error("Error en getTutorDatos");
  }

} 
//unidades de derivacion
const transformToListUnitDerivation = (data: { name: string; unitDerivationId: number }[]): ListUnitDerivation[] => {
  return data.map(item => ({
      unitId: item.unitDerivationId,
      unitName: item.name
  }));
};
  
type UnidadesDerivacionResponse = {
  listaDeUnidades: ListUnitDerivation[];
};

async function getUnidadesDerivacion(): Promise<ListUnitDerivation[]> {

  try {
      const response = await axios.get(`${ServicesProperties.BaseUrl}/listarUnidadesDerivacion`); 
      const transformedData = transformToListUnitDerivation(response.data.data);
      return transformedData;
  }
  catch (error) {
      throw new Error("Error en getUnidadesDerivacion");
  }

}
//derivacion
async function getDerivacion(id_appointment: number): Promise<Derivation> {

  try {
      const response = await axios.get(`${ServicesProperties.BaseUrl}/seleccionarDerivacionByIdAppointment/`+id_appointment); 
      return response.data.data;
  }
  catch (error) {
      throw new Error("Error en getUnidadesDerivacion");
  }

}

export { getResultadoCita, updateResultadoCita, updateComentario, 
  getEstudianteDatos, getTutorDatos, getUnidadesDerivacion, getDerivacion};