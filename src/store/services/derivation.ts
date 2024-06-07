import axios from 'axios'; 
import { Services as ServicesProperties } from '../../config';
import { message } from 'antd';
import { Derivation,ListDerivation } from '../types/Derivation';


type listaResponse = {
  listaDerivaciones: ListDerivation[];
};


async function getListaDerivacionesByTutorId(tutorId: number): Promise<listaResponse> {

    try {
        const response = await axios.get(ServicesProperties.BaseUrl+`/listarDerivationsByTutorId/${tutorId}`);
        const listaDerivaciones: ListDerivation[] = response.data.data.map((item: any) => {
            return { 
              derivationId:item.derivationId,
              reason: item.reason,
              comment: item.comment,
              status: item.status,
              creationDate: item.creationDate,
              unitDerivationName: item.unitDerivationName,
              nombreAlumno: item.nombreAlumno, 
              codigo: item.codigo,
              programName:item.programName
            };
        });  
        return { listaDerivaciones: listaDerivaciones };
    } catch (error) {
        throw new Error("Error en getListaDerivacionesByTutorId");
    }

}

export { getListaDerivacionesByTutorId};