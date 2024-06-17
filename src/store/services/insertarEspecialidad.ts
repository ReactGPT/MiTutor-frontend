// SERVICIO insertarSolicitudTutoria.ts
import axios from 'axios';
import { Services as ServicesProperties } from '../../config';

// Define la interfaz para los datos de la solicitud de tutoría
interface InsertartEspecialidadRequest {
  name: string;
  acronym : string;
  studentCount: number;
  Faculty:{FacultyId: number;}
  SpecialtyManager:{Id: number;}
}

async function insertarEspecialidad(data: InsertartEspecialidadRequest): Promise<void> {
  try {
    await axios.post(ServicesProperties.BaseUrl+'/api/Specialty/crearEspecialidad', data);
  } catch (error) {
    throw new Error('Error creando la especialidad.');
  }
}

// Exporta la función para ser utilizada en otros archivos
export { insertarEspecialidad as insertartEspecialidad };
