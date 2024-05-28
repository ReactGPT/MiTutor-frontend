import { useState } from 'react';
import { getResultadoCita,updateResultadoCita,updateComentario, getEstudianteDatos, getTutorDatos, getUnidadesDerivacion } from '../services/resultadoCita';
import { ListCita } from '../types/ListCita';
import { InitialData } from '../types/AppointmentResult';
import { ListStudent } from '../types/ListStudent';
import { Tutor } from '../types/Tutor';
import { ListUnitDerivation }from '../types/ListUnitDerivation';

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

//DERIVACION

//ALUMNO DATOS
type EstudianteHooksReturn = {
  estudiante: ListStudent|null;
  loading: boolean;
  error: any;
  fetchEstudiante: () => Promise<void>;
};

function useEstudianteResultadoCita(cita : ListCita): EstudianteHooksReturn { 
  const [estudiante, setEstudiante] = useState<ListStudent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null); 

  const fetchEstudiante = async () => {
      try{
          const data = await getEstudianteDatos(cita);
          setEstudiante(data);
          setLoading(false);
      }catch(error){
          setError("Error en useEstudiante");
          setLoading(false);
      }
  }

  return { estudiante, loading, error, fetchEstudiante };

}

//TUTOR DATOS
type TutorHooksReturn = {
  tutor: Tutor|null;
  loading: boolean;
  error: any;
  fetchTutor: () => Promise<void>;
};

function useTutorResultadoCita(idTutor: number): TutorHooksReturn { 
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null); 

  const fetchTutor = async () => {
      try{
          const data = await getTutorDatos(idTutor);
          setTutor(data);
          setLoading(false);
      }catch(error){
          setError("Error en useEstudiante");
          setLoading(false);
      }
  }

  return { tutor, loading, error, fetchTutor };

}
//UNIDADES DERIVACION
type UnidadesDerivacionHookReturnType =  {
  unidadesDerivacion:ListUnitDerivation[];
  fetchUnidadesDerivacion: ()=>Promise<void>;   
  isLoading: boolean;
  error: Error | null;
};
  
function useUnidadesDerivacion(): UnidadesDerivacionHookReturnType{
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null); 
  const [unidadesDerivacion,setUnidadesDerivacion] = useState<ListUnitDerivation[]>([]);
  const fetchUnidadesDerivacion = async () => {
      setIsLoading(true);
      try {
          const response = await getUnidadesDerivacion();
          setUnidadesDerivacion(response);
          
      } catch (err:any) {
          setError(err);
      } finally {
          setIsLoading(false);
      }
  };
   
  return { fetchUnidadesDerivacion,unidadesDerivacion,isLoading, error };

}

export {useResultadoCita,useUpdateResultadoCita,useUpdateComentario,useEstudianteResultadoCita,useTutorResultadoCita,useUnidadesDerivacion};