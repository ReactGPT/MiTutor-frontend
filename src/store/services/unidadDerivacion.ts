import axios from 'axios';
import { UnidadDerivacion } from '../types/UnidadDerivacion';
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

export { getUnidadInfo }