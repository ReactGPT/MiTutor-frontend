import { useState } from 'react';
import { getResultadoCita,updateResultadoCita,updateComentario } from '../services/resultadoCita';
import { ListCita } from '../types/ListCita';
import { InitialData } from '../types/AppointmentResult';

type ResultadoCitaHooksReturn = {
    resultadoCita: InitialData|null;
    loading: boolean;
    error: any;
    fetchResultadoCita: () => Promise<void>;
};

function useResultadoCita(cita : ListCita): ResultadoCitaHooksReturn { 
    const [resultadoCita, setResultadoCita] = useState<InitialData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null); 

    const fetchResultadoCita = async () => {
        try{
            const data = await getResultadoCita(cita);
            setResultadoCita(data);
            setLoading(false);
        }catch(error){
            setError("Error en useCita");
            setLoading(false);
        }
    }

    return { resultadoCita, loading, error, fetchResultadoCita };

}

function useUpdateResultadoCita(cita: InitialData) {
  try {
    updateResultadoCita(cita);
    console.log('Resultado Cita actualizada con éxito');
  } catch (error) {
    console.error('Error al actualizar el resultado de cita:', error);
  }
}

function useUpdateComentario(cita: InitialData) {
  try {
    updateComentario(cita);
    console.log('Comentario actualizada con éxito');
  } catch (error) {
    console.error('Error al actualizar comentarios:', error);
  }
}

export {useResultadoCita,useUpdateResultadoCita,useUpdateComentario};