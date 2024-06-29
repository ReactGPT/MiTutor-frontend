import axios from 'axios';
import Institucion from '../types/Institucion';
import { Services } from '../../config';

type InstitucionDetailResponse={
  institucionList:Institucion[];
}

async function getInstitucionInfo():Promise<InstitucionDetailResponse>{
    try{
        const response = await axios({
            method: 'GET',
            url: `${Services.BaseUrl}/listarInstituciones`,
        });
        if(response.data.success===false){
            return {institucionList:[]};
        }
        const institucionList:Institucion[] = response.data.data.map((item:any)=>{
            return {
                institutionId: item.institutionId,
                name: item.name,
                address: item.address,
                district: item.district,
                institutionType: item.institutionType,
                logo: item.logo,
            }
        });
        return {institucionList};
    }
    catch(error){
        return {institucionList:[]};
    }
}

type ServiceResponse = {
    success: boolean;
    data?: any;
    message?: string;
}

async function actualizarInstitucion(institucion: Institucion): Promise<ServiceResponse> {
  const unit = {
    institutionId: institucion.institutionId,
    name: institucion.name,
    address: institucion.address,
    district: institucion.district,
    institutionType: institucion.institutionType,
    logo: institucion.logo,
  }
  console.log("institucion enviada",unit)
  try {
    const response = await axios({
      method: 'put',
      url: Services.BaseUrl + `/actualizarInstitucion`,
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

export { getInstitucionInfo, actualizarInstitucion }