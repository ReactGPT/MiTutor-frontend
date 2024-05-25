import axios from 'axios';

// Define la interfaz para los datos de la solicitud
export interface Solicitud {
  Codigo: number;
  Nombres: string;
  Especialidad: string;
  Tutor: string;
  FechaSolicitud: Date;
  Estado: string;
}

// Define la interfaz para la respuesta del servidor
interface ApiResponse {
  success: boolean;
  data: Solicitud[];
}

// Configura Axios para usar la URL base del backend
const api = axios.create({
  baseURL: 'https://localhost:7286/api',
});

// Función para listar las solicitudes por facultad
async function listarSolicitudes(facultyId: number): Promise<Solicitud[]> {
  try {
    const response = await api.get<ApiResponse>(`/tutorstudentprogram/listarSolicitudesPorFacultad/${facultyId}`);
    return response.data.data;
  } catch (error) {
    throw new Error('Error fetching solicitudes');
  }
}

// Exporta la función y el tipo para ser utilizados en otros archivos
export { listarSolicitudes };
