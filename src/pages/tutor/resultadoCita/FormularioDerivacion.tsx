import React, { useState, useEffect } from 'react';  
import axios from 'axios';
import ModalDerivacion from '../../../components/Tutor/ModalDerivacion';
import { ListCita } from '../../../store/types/ListCita';
import {Services as ServicesProperties} from '../../../config'; 
import { ListStudent } from '../../../store/types/ListStudent'; 
import { useEstudianteResultadoCita, useTutorResultadoCita, useUnidadesDerivacion } from '../../../store/hooks/useResultadoCita';
import { useForm } from 'react-form-ease'
import { Button } from '../../../components';
import { ListUnitDerivation } from '../../../store/types/ListUnitDerivation'; 

type InputProps = {
  className:string; 
  cita:ListCita;
} 

type Derivation = { 
  reason: string;
  comment: string;
  status: string;
  creationDate: string;
  unitDerivationId: number;
  userAccountId: number;
  appointmentId: number;
  isActive: boolean;
};

function FormularioDerivacion({className,cita}:InputProps){  
  //Traer datos del estudiante
  const { estudiante, fetchEstudiante } = useEstudianteResultadoCita(cita); 
  //Traer datos del profesor
  const { tutor, fetchTutor } = useTutorResultadoCita(1); 
  //Traer datos de Unidades Derivacion
  //const { unidadesDerivacion,fetchUnidadesDerivacion} = useUnidadesDerivacion();
  const [unidadesDerivacion, setUnidadesDerivacion] = useState<ListUnitDerivation[]>([]);

  useEffect(() => {
    fetchEstudiante() 
    fetchTutor() 
    //fetchUnidadesDerivacion()
    fetchData()
  }, []);

const transformToListUnitDerivation = (data: { name: string; unitDerivationId: number }[]): ListUnitDerivation[] => {
    return data.map(item => ({
        unitId: item.unitDerivationId,
        unitName: item.name
    }));
};

  const fetchData = async () => {
    try {
      const response = await axios.get(ServicesProperties.BaseUrl+'/listarUnidadesDerivacion');
      const transformedData = transformToListUnitDerivation(response.data.data);
      setUnidadesDerivacion(transformedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {  
    console.log(unidadesDerivacion)
  }, [unidadesDerivacion]);

// Variable para almacenar la unidad seleccionada
const [unidadSeleccionada, setUnidadSeleccionada] = useState('');

// Obtener la fecha actual en el formato YYYY-MM-DD
const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son base 0 en JavaScript
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const derivation: Derivation = { 
  reason: '',  
  comment: '',  
  status: 'Pendiente',  
  creationDate: getCurrentDate(),  
  unitDerivationId: 0,  
  userAccountId: 1,  
  appointmentId: 0,  
  isActive: true  
};

const crearDerivacion = async () => {
  try {
    const response = await axios.post(ServicesProperties.BaseUrl+'/crearDerivacion', derivation);
    console.log('Derivacion creada'); 
  } catch (error) {
    console.error('Error al crear derivacion', error);
  }
};

const { formData, updateForm,validateForm,errors} = useForm({
    data: { 
      nombreAlumno:'',
      codigo:'',
      correoAlumno:'',
      derivadoPor:'',
      cargo:'Tutor',
      correoTutor:'',
      unidadAlumno:'',
      fecha:getCurrentDate(),
      motivo:'',
      unidadDerivada:0 
    },
    validations: { 
      nombreAlumno: (value:any) => {
        if (!value) return 'Ingrese nombre correcto'
      },
      codigo: (value:any) => {
        if (!value) return 'Ingrese nombre correcto'
      },
      correoAlumno: (value:any) => {
        if (!value) return 'Please enter an email'
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) return 'Please enter a valid email'
      },
      derivadoPor: (value:any) => {
        if (!value) return 'Ingrese nombre correcto'
      },
      cargo: (value:any) => {
        if (!value) return 'Ingrese nombre correcto'
      },
      correoTutor: (value:any) => {
        if (!value) return 'Ingrese nombre correcto'
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) return 'Please enter a valid email'
      },
      unidadAlumno: (value:any) => {
        if (!value) return 'Ingrese nombre correcto'
      },
      fecha: (value:any) => {
        if (!value) return 'Ingrese nombre correcto'
      },
      motivo: (value:any) => {
        if (!value) return 'Ingrese un motivo'
      },
      unidadDerivada: (value:any) => {
        if (!value) return 'Seleccione una unidad de derivación'
      }
    }
  })

const handleunidadDerivada = (e:any) => {
  const unidadDerivadaValue = parseInt(e.target.value); 
  updateForm({ unidadDerivada: unidadDerivadaValue });
};

useEffect(() => {
  if (estudiante) {
    formData.nombreAlumno=estudiante.name+' '+estudiante.lastName+' '+estudiante.secondLastName
    formData.codigo=estudiante.pucpCode
    formData.correoAlumno=estudiante.institutionalEmail
    formData.unidadAlumno=estudiante.specialtyName
  }
}, [estudiante]);

useEffect(() => {
  if (tutor) {
    formData.derivadoPor=tutor.userAccount.persona.name+' '+tutor.userAccount.persona.lastName+' '+tutor.userAccount.persona.secondLastName
    formData.correoTutor=tutor.userAccount.institutionalEmail
  }
}, [tutor]);

const [isModalOpen, setIsModalOpen] = useState(false); 
    
  const openModal = () => {
    setIsModalOpen(true);
  };
    
  const closeModal = () => {
    setIsModalOpen(false);
  };

const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault()
  if (!validateForm()) return 
  //Setear datos de derivacion
  derivation.appointmentId=cita.appointmentId
  derivation.reason=formData.motivo
  derivation.status='Pendiente'
  derivation.unitDerivationId=formData.unidadDerivada 

  console.log(derivation)
  crearDerivacion()
  setIsModalOpen(true);
}

return (  
    <div className={className}> 
      <h3 className='font-montserrat text-lg font-bold text-primary w-full'>Derivación Estudiantil</h3>
      <form noValidate onSubmit={handleSubmit}>
        <div className='mb-5'>
          <label className='block mb-2 from-label'>Nombre de Alumno:</label>
          <input type='text' 
            className='w-full p-2 border border-gray-300 rounded'
            onChange={(e) => updateForm({ nombreAlumno: e.target.value })} 
            value={formData.nombreAlumno} 
            disabled
          />
          <p>{errors?.nombreAlumno}</p>
        </div>
        <div className='mb-5'>
          <label className='block mb-2 from-label'>Código:</label>
          <input type='text' 
            className='w-full p-2 border border-gray-300 rounded'
            onChange={(e) => updateForm({ codigo: e.target.value })} 
            value={formData.codigo} 
            disabled
          />
          <p>{errors?.codigo}</p>
        </div>
        <div className='mb-5'>
          <label className='block mb-2 from-label'>Correo Electrónico del Alumno:</label>
          <input type='email'
            className='w-full p-2 border border-gray-300 rounded' 
            onChange={(e) => updateForm({ correoAlumno: e.target.value })} 
            value={formData.correoAlumno} 
            disabled
          />
          <p>{errors?.correoAlumno}</p>
        </div>
        <div className='mb-5'>
          <label className='block mb-2 from-label'>Derivado Por:</label>
          <input type='text' 
            className='w-full p-2 border border-gray-300 rounded'
            onChange={(e) => updateForm({ derivadoPor: e.target.value })} 
            value={formData.derivadoPor} 
            disabled
          />
          <p>{errors?.derivadoPor}</p>
        </div> 
        <div className='mb-5'>
          <label className='block mb-2 from-label'>Cargo:</label>
          <input type='text' 
            className='w-full p-2 border border-gray-300 rounded'
            onChange={(e) => updateForm({ cargo: e.target.value })} 
            value={formData.cargo} 
            disabled
          />
          <p>{errors?.cargo}</p>
        </div> 
        <div className='mb-5'>
          <label className='block mb-2 from-label'>Correo electrónico de quien deriva:</label>
          <input type='text' 
            className='w-full p-2 border border-gray-300 rounded'
            onChange={(e) => updateForm({ correoTutor: e.target.value })} 
            value={formData.correoTutor} 
            disabled
          />
          <p>{errors?.correoTutor}</p>
        </div> 
        <div className='mb-5'>
          <label className='block mb-2 from-label'>Unidad de la persona que Deriva:</label>
          <input type='text' 
            className='w-full p-2 border border-gray-300 rounded'
            onChange={(e) => updateForm({ unidadAlumno: e.target.value })} 
            value={formData.unidadAlumno} 
            disabled
          />
          <p>{errors?.unidadAlumno}</p>
        </div> 
        <div className='mb-5'>
          <label className='block mb-2 from-label'>Fecha Derivación:</label>
          <input type='text' 
            className='w-full p-2 border border-gray-300 rounded'
            onChange={(e) => updateForm({ fecha: e.target.value })} 
            value={formData.fecha} 
            disabled
          />
          <p>{errors?.fecha}</p>
        </div> 
        <div className='mb-5'>
          <label className='block mb-2 from-label'>Motivo de Derivación:</label>
          <input type='text' 
            className='w-full p-2 border border-gray-300 rounded'
            onChange={(e) => updateForm({ motivo: e.target.value })} 
            value={formData.motivo} 
          />
          <p>{errors?.motivo}</p>
        </div> 
        
        <label className='block mb-2 from-label'>Unidad a Derivar:</label>
        <select
          value={formData.unidadDerivada}
          onChange={handleunidadDerivada}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
        <option value="">Selecciona una unidad</option>
        {unidadesDerivacion.map((unidadesDerivacion, index) => (
          <option key={unidadesDerivacion.unitId} value={unidadesDerivacion.unitId}>
            {unidadesDerivacion.unitName}
          </option>
        ))}
      </select>
      <p>{errors?.unidadDerivada}</p>
      <div>
        <Button variant='call-to-action' text='Enviar' onClick={()=>{}}/>
      </div>  
      </form>
      
      <div>{isModalOpen && <ModalDerivacion onClose={closeModal} />}</div>
    </div>
    
  );
};

export default FormularioDerivacion;