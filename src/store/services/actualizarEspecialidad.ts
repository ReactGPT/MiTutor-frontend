import axios from 'axios';
import { Services as ServicesProperties } from '../../config';

interface ActualizarEspecialidadRequest {
  SpecialtyId: number;
  Name: string;
  Acronym: string;
  IsActive: boolean;
  SpecialtyManager: { Id: number; };
}

async function actualizarEspecialidad(data: ActualizarEspecialidadRequest): Promise<void> {
  console.log("ID:" + data.SpecialtyId);
  try {
    const res = await axios.post(ServicesProperties.BaseUrl + '/api/Specialty/modificarEspecialidad', data);
    console.log({ res });
  } catch (error) {
    throw new Error('Error al modificar la especialidad.');
  }
}

async function eliminarEspecialidad(specialtyId: number): Promise<void> {
  try {
    const res = await axios.put(`${ServicesProperties.BaseUrl}/api/Specialty/eliminarEspecialidad/?SpecialtyId=${specialtyId}`);
    console.log({ res });
  } catch (error) {
    throw new Error('Error al eliminar la especialidad.');
  }
}

// Exporta la función para ser utilizada en otros archivos
export { actualizarEspecialidad, eliminarEspecialidad };
