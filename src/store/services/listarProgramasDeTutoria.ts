import axios from 'axios';
import { Services as ServicesProperties } from '../../config';

// Define la interfaz para los datos del programa de tutoría
export interface TutoringProgram {
  TutoringProgramId: number;
  ProgramName: string;
  Description: string;
  FaceToFace: boolean;
  Virtual: boolean;
  GroupBased: boolean;
  IndividualBased: boolean;
  Optional: boolean;
  Mandatory: boolean;
  MembersCount: number;
  Duration: string; // Asumiendo que se recibe como string desde la API
  IsActive: boolean;
}

// Define la interfaz para la respuesta del servidor
interface ApiResponse {
  success: boolean;
  data: TutoringProgram[];
}

// Configura Axios para usar la URL base del backend
const api = axios.create({
  baseURL: ServicesProperties.BaseUrl+'/api', // Asegúrate de que esta URL es correcta
});

// Función para listar los programas de tutoría
async function listarProgramasDeTutoria(): Promise<TutoringProgram[]> {
  try {
    // Realiza la solicitud HTTP para obtener la lista de programas de tutoría
    const response = await api.get<ApiResponse>('/tutoringprogram/listarProgramasDeTutoria');
    // Devuelve los datos de los programas desde la respuesta
    return response.data.data;
  } catch (error) {
    // Si hay un error, lánzalo para que sea manejado en el componente
    throw new Error('Error fetching tutoring programs');
  }
}

// Exporta la función y el tipo para ser utilizados en otros archivos
export { listarProgramasDeTutoria };
