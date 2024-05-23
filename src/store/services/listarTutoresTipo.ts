import axios from 'axios';

// Define la interfaz para los datos de tutor
interface Tutor {
  tutorId: number;
  meetingRoom: string;
  isActive: boolean;
  userAccount: {
    id: number;
    institutionalEmail: string;
    pucpCode: string;
    isActive: boolean;
    persona: {
      id: number;
      name: string;
      lastName: string;
      secondLastName: string;
      phone: string | null;
      isActive: boolean;
    };
  };
  faculty: {
    facultyId: number;
    name: string;
  };
  tutoringProgram: {
    programName: string;
  };
}

// Define la interfaz para la respuesta del servidor
interface ApiResponse {
  success: boolean;
  data: Tutor[];
}

// Función para listar los tutores
async function listarTutoresTipo(): Promise<Tutor[]> {
  try {
    // Realiza la solicitud HTTP para obtener la lista de tutores
    const response = await axios.get<ApiResponse>('https://localhost:44369/listarTutoresTipo');
    // Devuelve los datos de los tutores desde la respuesta
    return response.data.data;
  } catch (error) {
    // Si hay un error, lánzalo para que sea manejado en el componente
    throw new Error('Error fetching tutors');
  }
}

// Exporta la función para ser utilizada en otros archivos
export { listarTutoresTipo };
