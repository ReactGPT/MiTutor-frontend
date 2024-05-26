// SERVICIO insertarSolicitudTutoria.ts
import axios from 'axios';

// Define la interfaz para los datos de la solicitud de tutoría
interface TutorStudentProgramData {
  studentId: number;
  programId: number;
  tutorStudentProgram: {
    motivo: string;
    tutorId: number;
  };
}

async function insertarSolicitudTutoria(data: TutorStudentProgramData): Promise<void> {
  try {
    await axios.post('https://localhost:44369/crearTutorStudentProgram', data);
  } catch (error) {
    throw new Error('Error creando el tutor-student program');
  }
}

// Exporta la función para ser utilizada en otros archivos
export { insertarSolicitudTutoria };
