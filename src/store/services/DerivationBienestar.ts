import axios from 'axios';
import { Services as ServicesProperties } from '../../config';
import { DerivationBienestar } from '../types/Derivation';

type DerivationBienestarResponse = {
  listaDerivaciones: DerivationBienestar[];
};

async function getListaDerivacionesPorResponsableBienestar(idResponsableBienestar: number): Promise<DerivationBienestarResponse> {
  try {
    const response = await axios.get(ServicesProperties.BaseUrl + `/listarDerivacionesPorResponsableBienestar/${idResponsableBienestar}`);
    const listaDerivaciones: DerivationBienestar[] = response.data.data.map((item: any) => {
      return {
        derivationId: item.derivationId,
        reason: item.reason,
        comment: item.comment,
        status: item.status,
        creationDate: item.creationDate,
        unitDerivationName: item.unitDerivationName,
        idUsuarioAlumno: item.idUsuarioAlumno,
        correoAlumno: item.correoAlumno,
        nombreAlumno: item.nombreAlumno,
        codigoAlumno: item.codigoAlumno,
        idTutor: item.idTutor,
        idUsuarioTutor: item.idUsuarioTutor,
        correoTutor: item.correoTutor,
        nombreTutor: item.nombreTutor,
        codigoTutor: item.codigoTutor,
        programName: item.programName,
        observaciones: item.observaciones
      };
    });
    return { listaDerivaciones: listaDerivaciones };
  } catch (error) {
    throw new Error("Error en getListaDerivacionesPorResponsableBienestar");
  }
}

async function actualizarDerivacionResponsableBienestar(derivation: DerivationBienestar): Promise<void> {
    try {
      const response = await axios.put(ServicesProperties.BaseUrl + '/actualizarDerivacionResponsableBienestar', derivation);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error("Error en actualizarDerivacionResponsableBienestar");
    }
  }
  
  export { getListaDerivacionesPorResponsableBienestar, actualizarDerivacionResponsableBienestar };