import axios from 'axios';
import UnidadDerivacion from '../types/UnidadDerivacion';
import { Services } from '../../config';

type UnidadDetailResponse={
  unidadList:UnidadDerivacion[];
}

async function getUnidadInfo():Promise<UnidadDetailResponse>{
    try{
        const response = await axios({
            method: 'GET',
            url: `${Services.BaseUrl}/listarUnidades`,
        });
        if(response.data.success===false){
            return {unidadList:[]};
        }
        const unidadList:UnidadDerivacion[] = response.data.data.map((item:any)=>{
            return {
                unidadDerivacionId: item.unitDerivationId,
                nombre: item.name,
                siglas: item.acronym,
                responsable: item.responsible,
                email: item.email,
                telefono: item.phone,
                estado: item.isActive,
                fechaCreacion: item.creationDate.split('T')[0],
                esPadre: item.isParent,
            }
        });
        return {unidadList};
    }
    catch(error){
        return {unidadList:[]};
    }
}

async function getSubUnidadInfo(idUnidad:number):Promise<UnidadDetailResponse>{
    try{
        const response = await axios({
            method: 'GET',
            url: `${Services.BaseUrl}/listarSubUnidadesPorUnidad?unidadId=${idUnidad}`,
        });
        if(response.data.success===false){
            return {unidadList:[]};
        }
        const unidadList:UnidadDerivacion[] = response.data.data.map((item:any)=>{
            return {
                unidadDerivacionId: item.unitDerivationId,
                nombre: item.name,
                siglas: item.acronym,
                responsable: item.responsible,
                email: item.email,
                telefono: item.phone,
                estado: item.isActive,
                fechaCreacion: item.creationDate.split('T')[0],
                esPadre: item.isParent,
            }
        });
        return {unidadList};
    }
    catch(error){
        return {unidadList:[]};
    }
}

type ServiceResponse = {
    success: boolean;
    data?: any;
    message?: string;
}

async function eliminarUnidad(id: number): Promise<ServiceResponse> {
  try {
    const response = await axios({
      method: 'delete',
      url: `${Services.BaseUrl}/eliminarUnidadDerivacion/${id}`,
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

async function crearUnidad(unidad: UnidadDerivacion): Promise<ServiceResponse> {
  const unit = {
    unitDerivationId: unidad.unidadDerivacionId,
    name: unidad.nombre,
    acronym: unidad.siglas,
    responsible: unidad.responsable,
    isActive: true,
    email: unidad.email,
    phone: unidad.telefono,
    creationDate: unidad.fechaCreacion || "2021-09-01T00:00:00.000Z",
    isParent: true,
    parentId: 0
  }
  try {
    const response = await axios({
      method: 'post',
      url: Services.BaseUrl + `/crearUnidadDerivacion`,
      headers: Services.Headers,
      data: unit
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

async function actualizarUnidad(unidad: UnidadDerivacion): Promise<ServiceResponse> {
  const unit = {
    unitDerivationId: unidad.unidadDerivacionId,
    name: unidad.nombre,
    acronym: unidad.siglas,
    responsible: unidad.responsable,
    isActive: unidad.estado,
    email: unidad.email,
    phone: unidad.telefono,
    creationDate: unidad.fechaCreacion || "2021-09-01T00:00:00.000Z",
    isParent: true,
    parentId: 0,
    managerId: 0
  }
  console.log("unidad enviada",unit)
  try {
    const response = await axios({
      method: 'put',
      url: Services.BaseUrl + `/actualizarUnidadDerivacion`,
      headers: Services.Headers,
      data: unit
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

async function crearSubUnidad(unidad: UnidadDerivacion): Promise<ServiceResponse> {
  const unit = {
    unitDerivationId: unidad.unidadDerivacionId,
    name: unidad.nombre,
    acronym: unidad.siglas,
    responsible: unidad.responsable,
    isActive: true,
    email: unidad.email,
    phone: unidad.telefono,
    creationDate: unidad.fechaCreacion || "2021-09-01T00:00:00.000Z",
    isParent: true,
    parentId: unidad.parentId
  }
  try {
    console.log("antes de axios", unit);
    const response = await axios({
      method: 'post',
      url: Services.BaseUrl + `/crearSubUnidadDerivacion`,
      headers: Services.Headers,
      data: unit
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

export { getUnidadInfo, getSubUnidadInfo, eliminarUnidad, crearUnidad, actualizarUnidad, crearSubUnidad }