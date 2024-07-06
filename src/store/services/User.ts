import axios from 'axios';
import { Services as ServicesProperties } from '../../config';
import { User } from '../types/User';

type ServiceResponseUser = {
  userList: User[];
};

async function getUsuarios(): Promise<ServiceResponseUser> {

  try {
    const response = await axios({
      method: 'get',
      url: ServicesProperties.BaseUrl + `/listarUsuarios`,
      headers: ServicesProperties.Headers
    });

    if (!response.data.success) {
      // Si la llamada no es exitosa, devolvemos una lista vacía
      return { userList: [] };
    }

    // Mapeamos la respuesta para obtener la lista de usuarios
    const userList: User[] = response.data.data.map((item: any) => {
      return {
        id: item.id,
        institutionalEmail: item.institutionalEmail,
        pucpCode: item.pucpCode,
        isActive: item.isActive,
        creationDate: item.creationDate,
        modificationDate: item.modificationDate,
        persona: {
          id: item.persona.id,
          name: item.persona.name,
          lastName: item.persona.lastName,
          secondLastName: item.persona.secondLastName,
          phone: item.persona.phone,
          isActive: item.persona.isActive
        },
        roles: item.roles,
        isVerified: item.isVerified
      };
    });

    // Devolvemos la lista de usuarios
    return { userList: userList };

  } catch (err: any) {
    console.error(err);
    throw new Error(err.message);
  }

}

async function getUsuariosSinAdminSinAlumnos(): Promise<ServiceResponseUser> {

  try {
    const response = await axios({
      method: 'get',
      url: ServicesProperties.BaseUrl + `/listarUsuariosSinAdminSinAlumnos`,
      headers: ServicesProperties.Headers
    });

    if (!response.data.success) {
      // Si la llamada no es exitosa, devolvemos una lista vacía
      return { userList: [] };
    }

    // Mapeamos la respuesta para obtener la lista de usuarios
    const userList: User[] = response.data.data.map((item: any) => {
      return {
        id: item.id,
        institutionalEmail: item.institutionalEmail,
        pucpCode: item.pucpCode,
        isActive: item.isActive,
        creationDate: item.creationDate,
        modificationDate: item.modificationDate,
        persona: {
          id: item.persona.id,
          name: item.persona.name,
          lastName: item.persona.lastName,
          secondLastName: item.persona.secondLastName,
          phone: item.persona.phone,
          isActive: item.persona.isActive
        },
        roles: item.roles,
        isVerified: item.isVerified
      };
    });

    // Devolvemos la lista de usuarios
    return { userList: userList };

  } catch (err: any) {
    console.error(err);
    throw new Error(err.message);
  }

}

async function getUsuariosSinEstudiantes(): Promise<ServiceResponseUser> {

  try {
    const response = await axios({
      method: 'get',
      url: ServicesProperties.BaseUrl + `/listarUsuariosSinAlumnos`,
      headers: ServicesProperties.Headers
    });

    if (!response.data.success) {
      // Si la llamada no es exitosa, devolvemos una lista vacía
      return { userList: [] };
    }

    // Mapeamos la respuesta para obtener la lista de usuarios
    const userList: User[] = response.data.data.map((item: any) => {
      return {
        id: item.id,
        institutionalEmail: item.institutionalEmail,
        pucpCode: item.pucpCode,
        isActive: item.isActive,
        creationDate: item.creationDate,
        modificationDate: item.modificationDate,
        persona: {
          id: item.persona.id,
          name: item.persona.name,
          lastName: item.persona.lastName,
          secondLastName: item.persona.secondLastName,
          phone: item.persona.phone,
          isActive: item.persona.isActive,
          usuario: item.persona.usuario
        },
        roles: item.roles,
        isVerified: item.isVerified
      };
    });

    // Devolvemos la lista de usuarios
    return { userList: userList };

  } catch (err: any) {
    console.error(err);
    throw new Error(err.message);
  }

}

async function getUsuariosSinRoles(): Promise<ServiceResponseUser> {
  try {
    const response = await axios({
      method: 'get',
      url: ServicesProperties.BaseUrl + `/listarUsuariosSinRoles`,
      headers: ServicesProperties.Headers
    });

    if (!response.data.success) {
      return { userList: [] };
    }

    const userList: User[] = response.data.data.map((item: any) => {
      return {
        id: item.id,
        institutionalEmail: item.institutionalEmail,
        pucpCode: item.pucpCode,
        isActive: item.isActive,
        creationDate: item.creationDate,
        modificationDate: item.modificationDate,
        persona: {
          id: item.persona.id,
          name: item.persona.name,
          lastName: item.persona.lastName,
          secondLastName: item.persona.secondLastName,
          phone: item.persona.phone,
          isActive: item.persona.isActive,
          usuario: item.persona.usuario
        },
        roles: item.roles,
        isVerified: item.isVerified
      };
    });

    return { userList: userList };

  } catch (err: any) {
    console.error(err);
    throw new Error(err.message);
  }
}

async function getStudents(): Promise<ServiceResponseUser> {

  try {
    const response = await axios({
      method: 'get',
      url: ServicesProperties.BaseUrl + `/listarEstudiantesTodo`,
      headers: ServicesProperties.Headers
    });

    if (!response.data.success) {
      // Si la llamada no es exitosa, devolvemos una lista vacía
      return { userList: [] };
    }

    // Mapeamos la respuesta para obtener la lista de usuarios
    const userList: User[] = response.data.data.map((item: any) => {
      return {
        id: item.personId,
        institutionalEmail: item.institutionalEmail,
        pucpCode: item.pucpCode,
        isActive: item.userIsActive,
        creationDate: item.creationDate,
        modificationDate: item.modificationDate,
        persona: {
          id: item.personId,
          name: item.name,
          lastName: item.lastName,
          secondLastName: item.secondLastName,
          phone: item.phone,
          isActive: item.personIsActive
        },
        estudiante: {
          isRisk: item.isRisk,
          specialityId: item.specialityId,
          specialtyName: item.specialtyName,
          specialtyAcronym: item.specialtyAcronym,
          facultyId: item.facultyId,
          facultyName: item.facultyName,
          facultyAcronym: item.facultyAcronym,
        }
      };
    });

    // Devolvemos la lista de students
    return { userList: userList };

  } catch (err: any) {
    console.error(err);
    throw new Error(err.message);
  }

}



type ServiceResponse = {
  sucess: boolean;
  data?: any;
  message?: string;
};

async function crearEditarUsuario(user: User): Promise<ServiceResponse> {
  try {
    const response = await axios({
      method: 'post',
      url: ServicesProperties.BaseUrl + `/crearUsuario`,
      headers: ServicesProperties.Headers,
      data: user
    });

    if (!response?.data.success) {
      return {
        sucess: false,
        message: response?.data?.message
      };
    }
    return {
      sucess: response?.data.success,
      message: response?.data.message
    };

  } catch (err: any) {
    console.error(err);
    throw new Error(err.message);
  }
}


async function crearEditarAlumno(user: User): Promise<ServiceResponse> {
  try {
    const response = await axios({
      method: 'post',
      url: ServicesProperties.BaseUrl + `/crearEstudiante`,
      headers: ServicesProperties.Headers,
      data: {
        "personId": user.id,
        "name": user.persona.name,
        "lastName": user.persona.lastName,
        "secondLastName": user.persona.secondLastName,
        "phone": user.persona.phone,
        "personIsActive": user.persona.isActive,
        "isRisk": user.estudiante?.isRisk,
        "specialityId": user.estudiante?.specialityId,
        "specialtyName": "",
        "specialtyAcronym": "",
        "facultyId": user.estudiante?.facultyId,
        "facultyName": "",
        "facultyAcronym": "",
        "institutionalEmail": user.institutionalEmail,
        "userIsActive": user.isActive,
        "pucpCode": user.pucpCode,
        "creationDate": "2024-06-13T20:29:30.403Z", //se inserta en bd
        "modificationDate": "2024-06-13T20:29:30.403Z" //se inserta en bd
      }
    });

    if (!response?.data.success) {
      return {
        sucess: false,
        message: response?.data?.message
      };
    }

    return {
      sucess: response?.data.success,
      message: response?.data.message
    };

  } catch (err: any) {
    console.error(err);
    throw new Error(err.message);
  }
}


async function eliminarUsuario(id: number): Promise<ServiceResponse> {
  try {
    const response = await axios({
      method: 'post',
      url: ServicesProperties.BaseUrl + `/eliminarUsuario?id=${id}`,
      headers: ServicesProperties.Headers
    });

    if (!response?.data.success) {
      return {
        sucess: false,
        message: response?.data?.message
      };
    }
    return {
      sucess: response?.data.success,
      message: response?.data.message
    };

  } catch (err: any) {
    console.error(err);
    throw new Error(err.message);
  }
}

async function validarCodigoPUCP(pucpCode: string): Promise<ServiceResponse> {

  try {
    const response = await axios({
      method: 'get',
      url: ServicesProperties.BaseUrl + `/validarCodigoUusario?code=${pucpCode}`,
      headers: ServicesProperties.Headers
    });

    if (!response.data.success) {
      return {
        sucess: false,
        message: response?.data?.message
      };
    }
    else {
      return {
        sucess: true,
        message: response?.data?.message
      };
    }

  } catch (err: any) {
    console.error(err);
    throw new Error(err.message);
  }
}

export { getUsuarios, getUsuariosSinRoles, getUsuariosSinEstudiantes, crearEditarUsuario, eliminarUsuario, getStudents, crearEditarAlumno, validarCodigoPUCP, getUsuariosSinAdminSinAlumnos }

