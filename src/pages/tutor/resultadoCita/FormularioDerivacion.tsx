import React, { useState, useEffect, ChangeEvent } from 'react';  
import axios from 'axios';
import ModalDerivacion from '../../../components/Tutor/ModalDerivacion';
import { ListCita } from '../../../store/types/ListCita';
import { Services as ServicesProperties} from '../../../config'; 
import { ListStudent } from '../../../store/types/ListStudent'; 
import { useDerivacion, useEstudianteResultadoCita, useTutorResultadoCita, useUnidadesDerivacion } from '../../../store/hooks/useResultadoCita';
import { string,useForm } from 'react-form-ease'
//import { useForm } from "react-hook-form"
import { Button } from '../../../components';
import { ListUnitDerivation } from '../../../store/types/ListUnitDerivation'; 
import { Derivation } from '../../../store/types/Derivation';
import { useRef } from 'react'; 
import jsPDF from 'jspdf';

type InputProps = {
  className:string; 
  cita:ListCita;
} 
 
function FormularioDerivacion({className,cita}:InputProps){  
  //Traer datos del estudiante
  const { estudiante, fetchEstudiante } = useEstudianteResultadoCita(cita); 
  //Traer datos del profesor
  const { tutor, fetchTutor } = useTutorResultadoCita(1); 
  //Traer datos de Unidades Derivacion
  const { unidadesDerivacion,fetchUnidadesDerivacion} = useUnidadesDerivacion();
  //Traer datos de la derivacion por id_appointment
  const { derivation, fetchDerivation, setDerivacion, setDerivacionId } = useDerivacion(cita.appointmentId); 
  //Nombre del archivo
  const [fileName, setFileName] = useState('');
  const carpeta="derivaciones";

  useEffect(() => {
    fetchEstudiante() 
    fetchTutor() 
    fetchDerivation()
    fetchUnidadesDerivacion() 
  }, []);

  // Obtener la fecha actual en el formato YYYY-MM-DD
  const getCurrentDate = () => {
    const date = new Date(); const year = date.getFullYear(); 
    const month = String(date.getMonth() + 1).padStart(2, '0'); const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const derivacion: Derivation = { 
    derivationId: 0,
    reason: '',  
    comment: '',  
    status: 'Pendiente',  
    creationDate: getCurrentDate(),  
    unitDerivationId: 0,  
    userAccountId: 1,  
    appointmentId: 0,  
    isActive: true  
  };
  
  useEffect(() => {  
    console.log("la derivacion:",derivation)
    if(derivation==null){
      setDerivacion(derivacion);  
    }
    setFileName(`derivacion_${derivation?.derivationId}.pdf`);
  }, [derivation]);
 
  const [derivacionCreada, setDerivacionCreada] = useState(false);
   
  useEffect(() => {
    // Lógica para actualizar el nombre del archivo después de crear la derivación
    if (derivacionCreada) { 
      setFileName(`derivacion_${derivation?.derivationId}.pdf`);
      console.log(fileName);
    }
  }, [derivacionCreada]); 

  useEffect(() => {
    // Lógica para actualizar el nombre del archivo después de crear la derivación
    if (derivacionCreada) { 
      console.log(fileName);
      enviarPDFAlServidor();
    }
  }, [fileName]); 

  const crearDerivacion = async () => {
    try {
      const response = await axios.post(ServicesProperties.BaseUrl+'/crearDerivacion', derivation);
      console.log('Derivacion creada',response.data); 
      setDerivacionId(response.data.data); 
      setDerivacionCreada(true);
    } catch (error) {
      console.error('Error al crear derivacion', error);
    }
  };

  const actualizarDerivacion = async () => {
    try {
      const response = await axios.put(ServicesProperties.BaseUrl+'/actualizarDerivacion', derivation);
      console.log('Derivacion actualizada');
      enviarPDFAlServidor();
    } catch (error) {
      console.error('Error al actualizar derivacion', derivation);
    }
  };

  //FORMULARIO
  const { formData, updateForm,validateForm,errors,resetForm} = useForm({ 
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
      comentario:'',
      unidadDerivada:0
    },
    validations: { 
      nombreAlumno: (value) => {
        if (!value) return 'Ingrese nombre correcto'
      },
      codigo: (value) => {
        if (!value) return 'Ingrese nombre correcto'
      },
      correoAlumno: (value) => {
        if (!value) return 'Please enter an email'
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) return 'Please enter a valid email'
      },
      derivadoPor: (value) => {
        if (!value) return 'Ingrese nombre correcto'
      },
      cargo: (value) => {
        if (!value) return 'Ingrese nombre correcto'
      },
      correoTutor: (value) => {
        if (!value) return 'Ingrese nombre correcto'
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) return 'Please enter a valid email'
      },
      unidadAlumno: (value) => {
        if (!value) return 'Ingrese nombre correcto'
      },
      fecha: (value) => {
        if (!value) return 'Ingrese nombre correcto'
      },
      motivo: (value) => {
        if (!value) return 'Ingrese un motivo'  
      }, 
      unidadDerivada: (value) => {
        if (!value) return 'Seleccione una unidad de derivación'
      }
    }
  })

  const handleunidadDerivada = (e:ChangeEvent<HTMLSelectElement>) => {
    const unidadDerivadaValue = parseInt(e.target.value); 
    updateForm({ unidadDerivada: unidadDerivadaValue });
  };
  
  useEffect(() => {
    if (tutor) {
      formData.derivadoPor=tutor.userAccount.persona.name+' '+tutor.userAccount.persona.lastName+' '+tutor.userAccount.persona.secondLastName
      formData.correoTutor=tutor.userAccount.institutionalEmail
    }
    
    if(derivation){
      formData.motivo=derivation.reason 
      formData.unidadDerivada=derivation.unitDerivationId
      formData.comentario=derivation.comment
    }  

    if (estudiante) {
      formData.nombreAlumno=estudiante.name+' '+estudiante.lastName+' '+estudiante.secondLastName
      formData.codigo=estudiante.pucpCode
      formData.correoAlumno=estudiante.institutionalEmail
      formData.unidadAlumno=estudiante.specialtyName
    }
  }, [tutor,derivation,estudiante]);

  
  
  //MODAL DERIVACION
  const [isModalOpen, setIsModalOpen] = useState(false);   
  const closeModal = () => {
    setIsModalOpen(false);
  };

  //PDF 
  function generarPDF() { 
    
    // Crear un nuevo documento PDF
    const doc = new jsPDF(); 
    // Agregar contenido al PDF utilizando los datos del formulario
    doc.setFont('helvetica', 'bold');
    doc.text(`Fecha:`, 10, 10);  
    doc.setFont('helvetica', 'normal');
    doc.text(`${formData.fecha}`, 30, 10);

    doc.setFont('helvetica', 'bold');
    doc.text(`CÓDIGO DEL ALUMNO:`, 10, 30);
    doc.setFont('helvetica', 'normal');
    doc.text(`${formData.codigo}`, 75, 30);

    doc.setFont('helvetica', 'bold');
    doc.text(`Nombre de Alumno:`, 10, 50);
    doc.setFont('helvetica', 'normal');
    doc.text(`${formData.nombreAlumno}`, 65, 50);

    doc.setFont('helvetica', 'bold');
    doc.text(`Celular:`, 10, 70);
    doc.setFont('helvetica', 'normal');
    doc.text(`${estudiante?.phone}`, 35, 70);

    doc.setFont('helvetica', 'bold');
    doc.text(`Correo electrónico del alumno:`, 10, 90);
    doc.setFont('helvetica', 'normal');
    doc.text(`${formData.correoAlumno}`, 100, 90);

    doc.setFont('helvetica', 'bold');
    doc.text(`Derivado por:`, 10, 110);
    doc.setFont('helvetica', 'normal');
    doc.text(`${formData.derivadoPor}`, 50, 110);

    doc.setFont('helvetica', 'bold');
    doc.text(`Cargo:`, 10, 130);
    doc.setFont('helvetica', 'normal');
    doc.text(`${formData.cargo}`, 30, 130);

    doc.setFont('helvetica', 'bold');
    doc.text(`Correo electrónico de quien deriva:`, 10, 150);
    doc.setFont('helvetica', 'normal');
    doc.text(`${formData.correoTutor}`, 110, 150);

    doc.setFont('helvetica', 'bold');
    doc.text(`Unidad de la persona que deriva:`, 10, 170);
    doc.setFont('helvetica', 'normal');
    doc.text(`${formData.unidadAlumno}`, 100, 170);

    doc.setFont('helvetica', 'bold');
    doc.text(`A QUÉ SERVICIO SE LE DERIVA:`, 10, 190);
    doc.setFont('helvetica', 'normal');
    doc.text(`${unidadesDerivacion[formData.unidadDerivada-1].unitName}`, 100, 190);

    doc.setFont('helvetica', 'bold');
    doc.text(`MOTIVO DE DERIVACIÓN:`, 10, 210);
    doc.setFont('helvetica', 'normal');
    doc.text(`${formData.motivo}`, 10, 220);

    doc.setFont('helvetica', 'bold');
    doc.text(`COMENTARIO OPCIONAL:`, 10, 240);
    doc.setFont('helvetica', 'normal');
    doc.text(`${formData.comentario}`, 10, 250);

    //doc.setFont('helvetica', 'bold');
    //doc.text(`ANTECEDENTES DE IMPORTANCIA:`, 10, 240);
  
    // Obtener el Blob del PDF generado
    const pdfBlob = doc.output('blob');
  
    // Devolver el Blob
    return pdfBlob;
  }

  // Función para enviar el PDF al servidor
  const enviarPDFAlServidor = async () => {    
    // Generar el PDF desde los datos del formulario
    const pdfData = generarPDF(); 
    // Crear un objeto FormData
    const formData2 = new FormData();
    formData2.append('file', pdfData, fileName);

    try { 
      // Enviar el PDF al servidor 
      const response = await axios.post(`https://localhost:44369/api/Archivos/uploadAutomatic?fileName=${fileName}&carpeta=${carpeta}`, formData2, {
      headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': '*/*'
        }
      });

      console.log('PDF enviado correctamente al servidor:', response.data, fileName);
    } catch (error) {
      console.error('Error al enviar el PDF al servidor:', error);
    }
  }

  async function descargarArchivo() {
    try {
      const response = await axios.get(`https://localhost:44369/api/Archivos/download/${fileName}?carpeta=${carpeta}`, {
        responseType: 'blob', // Para recibir la respuesta como un blob (archivo binario)
      });
  
      // Crear una URL para el blob y descargar el archivo
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      //'derivacion_'+formData.nombreAlumno+'.pdf'
      link.setAttribute('download', 'derivacion_'+formData.nombreAlumno+'.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
    }
  }

  //BOTON DE CANCELAR GUARDAR EDITAR
  const handleSubmit = async ()=>{
    //e.preventDefault()
    if (!validateForm()) return 
    //Setear datos de derivacion
    if(derivation){
      derivation.appointmentId=cita.appointmentId
      derivation.reason=formData.motivo
      derivation.comment=formData.comentario
      derivation.status='Pendiente'
      derivation.unitDerivationId=formData.unidadDerivada
    }

    if(derivation?.derivationId==0){  
      crearDerivacion() 
    }else{ 
      actualizarDerivacion()
    }

    setEnableAttendance(!enableAttendance);
    console.log("Formulario enviado:", formData);
    setIsModalOpen(true);
  }
  const [enableAttendance,setEnableAttendance] = useState<boolean>(false);
  
  const handleCancelar = () => { 
    /*updateForm({comentario:derivation?.comment}); 
    updateForm({unidadDerivada:derivation?.unitDerivationId});*/
     
    if(derivation){   
      formData.comentario=derivation.comment;
      formData.unidadDerivada=derivation.unitDerivationId; 
      formData.motivo=derivation.reason;
       
    } 
 
    setEnableAttendance(!enableAttendance); 
  }; 
  
  return (  
    <div className={className}> 
      <div className='w-full flex items-center mb-5 '>
        <h3 className='font-montserrat text-lg font-bold text-primary w-full'>Derivación Estudiantil</h3>
        <div className='flex items-center gap-4'>
          <Button variant='primario' onClick={handleCancelar} text={enableAttendance ? 'Cancelar' : 'Editar'}  /> 
          <div style={{ display: enableAttendance ? 'inline-block' : 'none' }}>
            <Button variant='secundario' onClick={handleSubmit} text='Guardar' />
          </div> 
        </div>
      </div>
      <form noValidate>
        <div className='mb-5'>
          <label className='block mb-2 from-label'>Motivo de Derivación:</label> 
          <textarea
            name='studentAnnotations'
            value={formData.motivo} 
            onChange={(e) => updateForm({ motivo: e.target.value })}
            className={`w-full h-16 rounded-md resize-none 
              outline-none px-3 py-2 mt-1 font-montserrat text-[90%] border-custom drop-shadow-md font-bold 
              ${enableAttendance ? 'text-sm':'text-gray-500'}`}
            disabled={!enableAttendance}
          />

          {enableAttendance && <p>{errors?.motivo}</p>}
        </div> 
        <div className='mb-5'>
          <label className='block mb-2 from-label'>Comentario Opcional:</label> 
          <textarea
            name='studentAnnotations'
            value={formData.comentario} 
            onChange={(e) => updateForm({ comentario: e.target.value })}
            className={`w-full h-16 rounded-md resize-none 
              outline-none px-3 py-2 mt-1 font-montserrat text-[90%] border-custom drop-shadow-md font-bold 
              ${enableAttendance ? 'text-sm':'text-gray-500'}`}
            disabled={!enableAttendance}
          />

        </div> 
 
        <label className='block mb-2 from-label'>Unidad a Derivar:</label>
        <select
          value={formData.unidadDerivada}
          onChange={handleunidadDerivada}
          disabled={!enableAttendance}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        > 
        <option value="">Selecciona una unidad</option>
        {unidadesDerivacion.map((unidadesDerivacion, index) => (
          <option value={unidadesDerivacion.unitId}>
            {unidadesDerivacion.unitName}
          </option>
        ))}
      </select>
      <p>{errors?.unidadDerivada}</p> 
      </form>
        <div style={{ display: (derivation?.derivationId !== 0 ? 'block' : 'none') }}>
          <Button variant='secundario' onClick={descargarArchivo} text='Descargar Ficha' disabled={enableAttendance}/>
        </div>
      <div>{isModalOpen && <ModalDerivacion onClose={closeModal} />}</div>
    </div>
    
  );
};

export default FormularioDerivacion;

//<option value="">Selecciona una unidad</option>

/*const transformToListUnitDerivation = (data: { name: string; unitDerivationId: number }[]): ListUnitDerivation[] => {
    return data.map(item => ({
        unitId: item.unitDerivationId,
        unitName: item.name
    }));
};

  const fetchData = async () => {
    try {
      const response = await axios.get(ServicesProperties.BaseUrl+'/listarUnidadesDerivacion');
      const transformedData = transformToListUnitDerivation(response.data.data);
      //setUnidadesDerivacion(transformedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
*/
/*<div className='mb-5'>
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
        </div>  */