import axios from 'axios';
import { Services as ServicesProperties } from '../../config';

// Define la interfaz para los datos de la persona
export interface Persona {
  Name: string;
  LastName: string;
}

// Define la interfaz para los datos del administrador de facultad
export interface FacultyManager {
  FacultyManagerId: number;
  InstitutionalEmail: string;
  PUCPCode: string;
  Persona: Persona;
}

// Define la interfaz para los datos de la facultad
export interface Faculty {
  FacultyId: number;
  Name: string;
  Acronym: string;
  NumberOfStudents: number;
  NumberOfTutors: number;
  FacultyManager: FacultyManager;
  // IsActive: boolean;
}

// Define la interfaz para la respuesta del servidor
interface ApiResponse {
  success: boolean;
  data: Faculty[];
}

// Configura Axios para usar la URL base del backend
const api = axios.create({
  baseURL: ServicesProperties.BaseUrl+'/api', // Asegúrate de que esta URL es correcta
});
// Función para listar las facultades
async function listarFacultades(): Promise<Faculty[]> {
  try {
    // Realiza la solicitud HTTP para obtener la lista de facultades
    const response = await api.get<ApiResponse>('/Faculty/listarFacultades');
    // Devuelve los datos de las facultades desde la respuesta
    return response.data.data;
  } catch (error) {
    // Si hay un error, lánzalo para que sea manejado en el componente
    throw new Error('Error fetching faculties');
  }
}

// Exporta la función y el tipo para ser utilizados en otros archivos
export { listarFacultades };
