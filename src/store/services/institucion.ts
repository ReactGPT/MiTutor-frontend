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
            url: `${Services.BaseUrl}/listarInstitucion`,
        });
        if(response.data.success===false){
            return {institucionList:[]};
        }
        const institucionList:Institucion[] = response.data.data.map((item:any)=>{
            return {
                institutionId: item.id,
                name: item.name,
                address: item.address,
                district: item.district,
                institutionType: item.institutionType,
                logo: 'image/png;base64,' + item.logo,
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
    id: institucion.institutionId,
    name: institucion.name,
    address: institucion.address,
    district: institucion.district,
    institutionType: institucion.institutionType,
    logo: institucion.logo.split(',')[1],
    isActive: true,
  }
  // console.log("institucion enviada",unit)
  try {
    const response = await axios({
      method: 'post',
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