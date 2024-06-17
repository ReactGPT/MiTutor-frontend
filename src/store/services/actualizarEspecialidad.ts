import axios from 'axios';
import { Services as ServicesProperties } from '../../config';

interface ActualizarEspecialidadRequest {
  SpecialtyId: number;
  Name: string;
  Acronym : string;
  IsActive: boolean;
  SpecialtyManager: { Id: number };
}

async function actualizarEspecialidad(data: ActualizarEspecialidadRequest): Promise<void> {
  console.log("ID:"+ data.SpecialtyId)
  try {
    const res = await axios.post(ServicesProperties.BaseUrl+'/api/Specialty/modificarEspecialidad', data);
    console.log({res})
  } catch (error) {
    throw new Error('Error al modificar la especialidad.');
  }
}

// Exporta la función para ser utilizada en otros archivos
export { actualizarEspecialidad  };
