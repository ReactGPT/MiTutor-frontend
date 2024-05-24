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

// Función para insertar una solicitud de tutoría
async function insertarSolicitudTutoria(data: TutorStudentProgramData): Promise<void> {
  try {
    // Realiza la solicitud HTTP para insertar la solicitud de tutoría
    await axios.post('https://localhost:44369/crearTutorStudentProgram', data);
    // Si la solicitud se realiza con éxito, no es necesario devolver nada
  } catch (error) {
    // Si hay un error, lánzalo para que sea manejado en el componente
    throw new Error('Error creando el tutor-student program');
  }
}

// Exporta la función para ser utilizada en otros archivos
export { insertarSolicitudTutoria };
