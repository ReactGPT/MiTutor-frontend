import axios from 'axios';
import { Services as ServicesProperties } from '../../config';

// Define la interfaz para los datos del alumno
export interface Alumno {
  AlumnoId: number;
  Name: string;
  LastName: string;
  SecondLastName: string;
  StudentCode: string;
}

// Define la interfaz para la respuesta del servidor
interface ApiResponse {
  success: boolean;
  data: Alumno[];
}

// Configura Axios para usar la URL base del backend
const api = axios.create({
  baseURL: ServicesProperties.BaseUrl+'/api', // Asegúrate de que esta URL es correcta
});

// Función para listar los alumnos por nombre o código
async function listarAlumnosPorNombreCodigo(nombreCodigo: string): Promise<Alumno[]> {
  try {
    // Realiza la solicitud HTTP para obtener la lista de alumnos
    const response = await api.get<ApiResponse>(`/alumno/listarAlumnosPorNombreCodigo/${nombreCodigo}`);
    // Devuelve los datos de los alumnos desde la respuesta
    return response.data.data;
  } catch (error) {
    // Si hay un error, lánzalo para que sea manejado en el componente
    throw new Error('Error fetching students');
  }
}

// Exporta la función y el tipo para ser utilizados en otros archivos
export { listarAlumnosPorNombreCodigo };
