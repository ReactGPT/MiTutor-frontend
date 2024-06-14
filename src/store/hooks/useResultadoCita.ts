import { useState, useEffect } from 'react';
import { getResultadoCita,updateResultadoCita,updateComentario,
   getEstudianteDatos, getTutorDatos, getUnidadesDerivacion, getDerivacion,insertResultadoCita } from '../services/resultadoCita';
import { ListCita } from '../types/ListCita';
import { InitialData } from '../types/AppointmentResult';
import { ListStudent } from '../types/ListStudent';
import { Tutor } from '../types/Tutor';
import { ListUnitDerivation }from '../types/ListUnitDerivation';
import { Derivation } from '../types/Derivation';

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


    useEffect(() => {
      if (!resultadoCita) {
        // Inicializar la derivación con valores predeterminados si es null
        setResultadoCita({
          appointmentResult: {
            appointmentResultId: 0, // Actualiza con un ID real o deja 0 para no asignado
            asistio: true, // Actualiza según el estado real del appointment
            startTime: '', // Actualiza con una hora real o deja vacío
            endTime: '', // Actualiza con una hora real o deja vacío
            isActive: true, // Actualiza según el estado real del appointment
            comments: [
              {
                commentId: 0,
                message: '',
                isActive: true,
                appointmentResultId: 0,
                privacyTypeId: 1
              },
              {
                commentId: 0,
                message: '',
                isActive: true,
                appointmentResultId: 0,
                privacyTypeId: 2
              }
            ]
          },
          studentId: cita.personId, // Actualiza con un ID real o deja 0 para no asignado
          tutoringProgramId: cita.programId, // Actualiza con un ID real o deja 0 para no asignado
          appointmentId: cita.appointmentId // Actualiza con un ID real o deja 0 para no asignado
        });
        console.log(resultadoCita);
      }
    }, [resultadoCita]);

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
//insertarResultadoCita
async function useInsertarResultadoCita(cita: InitialData) {
  try {
    const id_appointmentResult= await insertResultadoCita(cita);
    console.log('Resultado Cita insertado con éxito');
    return id_appointmentResult;
  } catch (error) {
    console.error('Error al actualizar el resultado de cita:', error);
  }
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
type DerivacionHooksReturn = {
  derivation: Derivation|null;
  loading: boolean;
  error: any;
  fetchDerivation: () => Promise<void>;
  setDerivacion: (derivation: Derivation) => void;
  setDerivacionId: (id: number) => void;
};

function useDerivacion(id_appointment:number): DerivacionHooksReturn { 
  const [derivation, setDerivacion] = useState<Derivation | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null); 

  // Obtener la fecha actual en el formato YYYY-MM-DD
  const getCurrentDate = () => {
    const date = new Date(); const year = date.getFullYear(); 
    const month = String(date.getMonth() + 1).padStart(2, '0'); const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (!derivation) {
      // Inicializar la derivación con valores predeterminados si es null
      setDerivacion({
        derivationId: 0,
        reason: '',
        comment: '',
        status: 'Pendiente',
        creationDate: getCurrentDate(),
        unitDerivationId: 0,
        userAccountId: 1,
        appointmentId: 0,
        isActive: true
      });
    }
  }, [derivation]);

  const fetchDerivation = async () => {
      try{
          const data = await getDerivacion(id_appointment);
          setDerivacion(data);
          setLoading(false);
          console.log("la derivacion:",derivation)
      }catch(error){
          setError("Error en useDerivacion");
          setLoading(false);
      }
  }

  const setDerivacionId = (id: number) => {
    if (derivation) {
      // Crear una nueva instancia de Derivation con el ID actualizado
      const updatedDerivation: Derivation = { ...derivation, derivationId: id };
      setDerivacion(updatedDerivation);
    }
  };

  return { derivation, loading, error, setDerivacion, fetchDerivation,setDerivacionId };

}

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

export {useResultadoCita,useUpdateResultadoCita,useUpdateComentario,
  useEstudianteResultadoCita,useTutorResultadoCita,useUnidadesDerivacion,
  useDerivacion,useInsertarResultadoCita};