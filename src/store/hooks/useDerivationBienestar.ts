import { useState } from 'react';
import { getListaDerivacionesPorResponsableBienestar, actualizarDerivacionResponsableBienestar } from '../services/DerivationBienestar';
import { DerivationBienestar } from '../types/Derivation';

type DerivationBienestarHookReturn = {
  derivaciones: DerivationBienestar[];
  loading: boolean;
  error: any;
  fetchDerivaciones: () => Promise<void>;
  updateDerivacion: (derivacion: DerivationBienestar) => Promise<void>;
};

function useDerivationBienestar(idResponsableBienestar: number): DerivationBienestarHookReturn {
  const [derivaciones, setDerivaciones] = useState<DerivationBienestar[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const fetchDerivaciones = async () => {
    try {
      const data = await getListaDerivacionesPorResponsableBienestar(idResponsableBienestar);
      setDerivaciones(data.listaDerivaciones);
      console.log(data.listaDerivaciones);
      setLoading(false);
    } catch (error) {
      setError("Error en useDerivationBienestar");
      setLoading(false);
    }
  }

  const updateDerivacion = async (derivacion: DerivationBienestar) => {
    try {
      setLoading(true);
      await actualizarDerivacionResponsableBienestar(derivacion);
      // Actualizamos la lista local después de la actualización exitosa
      setDerivaciones(prevDerivaciones =>
        prevDerivaciones.map(d =>
          d.derivationId === derivacion.derivationId ? derivacion : d
        )
      );
      setLoading(false);
    } catch (error) {
      setError("Error al actualizar la derivación");
      setLoading(false);
    }
  }

  return { derivaciones, loading, error, fetchDerivaciones, updateDerivacion };
}

export { useDerivationBienestar };