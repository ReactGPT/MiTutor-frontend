import axios from 'axios';
import { Services as ServicesProperties } from '../../config';

type Availability = {
  availabilityTutorId: number;
  availabilityDate: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
};

type AvailabilityResponse = {
  data: Availability[];
};

async function getAvailabilityByTutorId(tutorId: number): Promise<Availability[]> {
  try {
    const response = await axios.get<AvailabilityResponse>(`${ServicesProperties.BaseUrl}/listarDisponibilidadPorTutor/${tutorId}`);
    const availabilityList: Availability[] = response.data.data.map((item: any) => ({
      availabilityTutorId: item.availabilityTutorId,
      availabilityDate: item.availabilityDate,
      startTime: item.startTime,
      endTime: item.endTime,
      isActive: item.isActive,
    }));

    return availabilityList;
  } catch (error) {
    throw new Error("Error en getAvailabilityByTutorId");
  }
}

async function insertarDisponibilidad(availability: Availability): Promise<void> {
  try {
    await axios.post(ServicesProperties.BaseUrl+'/insertarDisponibilidad', availability);
  } catch (error) {
    throw new Error("Error en insertarDisponibilidad");
  }
}

async function eliminarDisponibilidad(availabilityTutorId: number): Promise<void> {
  try {
    await axios.delete(`${ServicesProperties.BaseUrl}/eliminarDisponibilidad/${availabilityTutorId}`);
  } catch (error) {
    throw new Error("Error en eliminarDisponibilidad");
  }
}

export { getAvailabilityByTutorId, insertarDisponibilidad, eliminarDisponibilidad };
