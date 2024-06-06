import axios from 'axios';
import { Services as ServicesProperties } from '../../config';

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
    tutoringProgramId: number;
    programName: string;
  };
}

// Define la interfaz para la respuesta del servidor
interface ApiResponse {
  success: boolean;
  data: Tutor[];
}

async function listarTutoresTipo(idProgram: number): Promise<Tutor[]> {
  try {
    const response = await axios.get<ApiResponse>(`${ServicesProperties.BaseUrl}/listarTutoresPorPrograma/${idProgram}`);
    return response.data.data;
  } catch (error) {
    throw new Error('Error fetching tutors');
  }
}

export { listarTutoresTipo };
