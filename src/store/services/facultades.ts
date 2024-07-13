import axios from 'axios';
import Facultad from '../types/Facultad';
import { number } from 'react-form-ease';
import { Services } from '../../config';

type FacultyDetailResponse = {
  facultadList: Facultad[];
};

async function getFacultadInfo(): Promise<FacultyDetailResponse> {
  try {
    const response = await axios({
      method: 'GET',
      url: `${Services.BaseUrl}/api/Faculty/listarFacultadesTodos`,
    });
    if (response.data.success === false) {
      return { facultadList: [] };
    }
    const facultadList: Facultad[] = response.data.data.map((item: any) => {
      return {
        id: item.facultyId,
        name: item.name,
        acronym: item.acronym,
        numberStudents: item.numberOfStudents,
        numberTutors: item.numberOfTutors,
        isActive: item.isActive,
        facultyManager: item.facultyManager,
        bienestarManager: item.bienestarManager,
        personalApoyo: item.personalApoyo,
        specialties: item.specialties,
        tutoringPrograms: item.tutoringPrograms,
      };
    });
    return { facultadList };
  }
  catch (error) {
    console.log("error");
    return { facultadList: [] };
  }
}

type ServiceResponse = {
  success: boolean;
  data?: any;
  message?: string;
};

async function eliminarFacultad(id: number): Promise<ServiceResponse> {
  try {
    const response = await axios({
      method: 'delete',
      url: `${Services.BaseUrl}/api/Faculty/eliminarFacultad/${id}`,
      // headers: Services.Headers,
    });

    if (!response?.data.success) {
      return {
        success: false,
        message: response?.data?.message,
      };
    }
    return {
      success: response?.data.success,
      message: response?.data.message
    };

  } catch (err: any) {
    console.log(id);
    console.error(err);
    throw new Error(err.message);
  }
}

async function actualizarFacultad(facultad: Facultad): Promise<ServiceResponse> {
  const facultadBody = {
    ...facultad,
    facultyId: facultad.id,
  };
  try {
    console.log("desde fac axios", facultadBody);
    const response = await axios.put(`${Services.BaseUrl}/api/Faculty/actualizarFacultades`, facultadBody);
    console.log("desde fac axios", facultadBody, response);
    if (!response?.data.success) {
      return {
        success: false,
        message: response?.data?.message
      };
    }
    return {
      success: response?.data.success,
      message: response?.data.message
    };
  } catch (error) {
    console.log("error");
    console.error('Error updating facultad:', error);
    throw new Error('Error en updateFacultad');
  }
}

async function crearFacultad(facultad: Facultad): Promise<ServiceResponse> {
  try {
    const response = await axios({
      method: 'post',
      url: Services.BaseUrl + `/api/Faculty/crearFacultad`,
      headers: Services.Headers,
      data: facultad
    });

    if (!response?.data.success) {
      return {
        success: false,
        message: response?.data?.message
      };
    }
    return {
      success: response?.data.success,
      message: response?.data.message
    };

  } catch (err: any) {
    console.error(err);
    throw new Error(err.message);
  }
}

export { getFacultadInfo, eliminarFacultad, actualizarFacultad, crearFacultad };
