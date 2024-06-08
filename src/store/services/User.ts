import axios from 'axios';
import { Services as ServicesProperties } from '../../config';
import { User } from '../types/User';

type ServiceResponseUser = {
  userList: User[];
}

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

type ServiceResponse={
  sucess:boolean;
  data?:any;
  message?:string;
}

async function crearEditarUsuario(user: User): Promise<ServiceResponse> {
  try {
    const response = await axios({
      method: 'post',
      url: ServicesProperties.BaseUrl + `/crearUsuario`,
      headers: ServicesProperties.Headers,
      data: user
    });

    if(!response?.data.success){
      return {
          sucess:false,
          message:response?.data?.message
      };
  }
  return {
      sucess:response?.data.success,
      message:response?.data.message
  };;

  } catch (err: any) {
    console.error(err);
    throw new Error(err.message);
  }
}

export { getUsuarios, crearEditarUsuario }