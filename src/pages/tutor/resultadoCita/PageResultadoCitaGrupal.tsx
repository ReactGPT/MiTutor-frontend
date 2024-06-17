import React, { useEffect, useState, ChangeEvent} from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { Button } from '../../../components';
import { DetailsIcon, EditIcon } from '../../../assets';
import { Services as ServicesProperties } from '../../../config';
import { ListStudent2 } from '../../../store/types/ListStudent';
import ModalResultadoCita
 from '../../../components/Tutor/ModalResultadoCita';
const PageDetalleCitaGrupal: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { cita } = state;

  const [estudiantes, setEstudiantes] = useState<ListStudent2[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [originalEstudiantes, setOriginalEstudiantes] = useState<ListStudent2[]>([]); // Estado para guardar datos originales

  const [commentValue, setCommentValue] = useState('');
  const [commentValue2, setCommentValue2] = useState(''); 

  const [isModalOpenGuardar, setIsModalOpenGuardar] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${ServicesProperties.BaseUrl}/listarEstudiantePorIdCita/${cita.appointmentId}`);
        setEstudiantes(response.data.data);
        setCommentValue(response.data.data[0].message1);
        setCommentValue2(response.data.data[0].message2);
        setOriginalEstudiantes(response.data.data);  
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, [cita.appointmentId]);

  useEffect(()=>{
    console.log("cargaron",estudiantes);
  },[estudiantes])
  const handleCheckboxChange = (studentId: number, checked: boolean) => {
    if (!editMode) return; 
    setEstudiantes((prevData) =>
      prevData.map((student) => 
        student.studentId === studentId ? { ...student, asistio: checked } : student
      )
    );
    console.log(`Checkbox updated for studentId ${studentId}: ${checked}`);
    console.log(estudiantes);
  };

  const handleCancelar = () => {
    setCommentValue2(estudiantes[0].message1);
    setCommentValue(estudiantes[0].message2);
    setEstudiantes(originalEstudiantes); // Restaurar los datos originales
    setEditMode(false); // Salir del modo de edición
  };
    
  //Onchange
  const handleCommentChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setCommentValue(value);
  };
  const handleCommentChange2 = (e:ChangeEvent<HTMLTextAreaElement>) => {
      const { value } = e.target;
      setCommentValue2(value);
  };

  const handleGuardar = async () => {
    setIsModalOpenGuardar(!isModalOpenGuardar); 
    try {
      if (estudiantes.length > 0) {
        let response;
        estudiantes[0].message1 = commentValue ?? '';
        estudiantes[0].message2 = commentValue2 ?? '';
        if (estudiantes[0].appointmentResultId === 0) { 
          console.log(estudiantes[0].message1);
          // Operación de guardar
          response = await axios.post(ServicesProperties.BaseUrl+`/guardarAsistenciasCitaGrupal`,estudiantes);
          
          // Obtener los IDs devueltos por la API
          const nuevosIds = response.data; // Suponiendo que la API devuelve la lista de IDs en response.data
    
          // Actualizar los appointmentResultId en la lista de estudiantes
          const estudiantesActualizados = estudiantes.map((estudiante, index) => ({
            ...estudiante,
            appointmentResultId: nuevosIds[index], // Asignar el ID correspondiente de la lista de IDs
          }));
    
          // Actualizar los datos originales con los cambios guardados
          setOriginalEstudiantes(estudiantesActualizados);
          // Actualizar el estado de estudiantes
          setEstudiantes(estudiantesActualizados);


        } else {
          // Operación de actualizar:actualizarResultadoCitaGrupal 
          response = await axios.put(ServicesProperties.BaseUrl+`/actualizarResultadoCitaGrupal`,estudiantes);
          
          setOriginalEstudiantes(estudiantes);
        }
        // Salir del modo de edición
        setEditMode(false);
      } else {
        console.warn('No hay estudiantes para guardar o actualizar.');
      }
    } catch (error) {
      console.error('Error al guardar o actualizar datos:', error);
    }
  };
  
  const closeModal = () => {
    setIsModalOpenGuardar(false);
  };
    
  const toDetail = (student: ListStudent2) => {
    //Hacer una copia de appointment con los datos del alum y enviar a la pag sig
    //navigate('/programasDeTutoria/detalle-programa/alumno', { state: { student } });
  };

  const defaultColDef = {
    suppressMenu: true,
    flex: 1,
    sortable: true,
    resizable: true,
    minWidth: 100,
    cellStyle: {
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: editMode ? 'auto' : 'none', // Deshabilitar interacciones cuando no está en modo de edición
      backgroundColor: editMode ? 'white' : 'lightgray', // Cambiar el color de fondo según el modo de edición
    },
  };

  const columnDefs: ColDef[] = [
    {
      headerName: 'Código',
      field: 'pucpCode',
      minWidth: 100, 
      cellStyle: { textAlign: 'center' }
    },
    {
      headerName: 'Nombre',
      field: 'name',
      minWidth: 100, 
      cellStyle: { textAlign: 'center' }
    },
    {
      headerName: 'Primer Apellido',
      field: 'lastName',
      minWidth: 100, 
      cellStyle: { textAlign: 'center' }
    },
    {
      headerName: 'Segundo Apellido',
      field: 'secondLastName',
      minWidth: 100, 
      cellStyle: { textAlign: 'center' }
    },
    {
      headerName: 'Asistio',
      field: 'asistio',
      minWidth: 100, 
      cellRenderer: (params: { data: ListStudent2 }) => {
        const { data } = params;
        return (
          <input
            type="checkbox"
            checked={data.asistio}
            onChange={(e) => handleCheckboxChange(data.studentId, e.target.checked)}
            disabled={!editMode} // Deshabilitar checkbox si no está en modo de edición
          />
        );
      },
    },
  ];
  /*,{
      headerName: 'Ver más',
      minWidth: 100, 
      cellStyle: { textAlign: 'left' },
      cellRenderer: (params: any) => {
        return (
          <Button icon={DetailsIcon} onClick={() => toDetail(params.data)} />
        );
      },
    }*/
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col w-full h-fit bg-[rgba(255,255,255,0.5)] border-custom drop-shadow-md p-5">
        <div className="flex w-full h-full">
          <div className="flex flex-col w-full">
            <div className='flex w-full gap-5'>
              <div className='w-1/4'>
                <label className="font-semibold text-gray-700">Fecha</label>
                <textarea
                  name='studentAnnotations'
                  value={cita.creationDate}
                  className='w-full rounded-md font-montserrat border-custom drop-shadow-md font-bold text-gray-500 px-3 py-2 mt-0'
                  disabled={true}
                  rows={1}
                  style={{ resize: 'none', textAlign: 'left' }}
                />
              </div>
              <div className='w-1/4'>
                <label className="font-semibold text-gray-700">Hora</label>
                <textarea
                  name='studentAnnotations'
                  value={`${cita.startTime} - ${cita.endTime}`}
                  className='w-full rounded-md font-montserrat border-custom drop-shadow-md font-bold text-gray-500 px-3 py-2 mt-0'
                  disabled={true}
                  rows={1}
                  style={{ resize: 'none', textAlign: 'left' }}
                />
              </div>
              <div className='w-1/4'>
                <label className="font-semibold text-gray-700">Motivo</label>
                <textarea
                  name='studentAnnotations'
                  value={cita.reason}
                  className='w-full rounded-md font-montserrat border-custom drop-shadow-md font-bold text-gray-500 px-3 py-2 mt-0'
                  disabled={true}
                  rows={1}
                  style={{ resize: 'none', textAlign: 'left' }}
                />
              </div>
              <div className='w-1/4'>
                <label className="font-semibold text-gray-700">Tipo de Tutoría</label>
                <textarea
                  name='studentAnnotations'
                  value={cita.programName}
                  className='w-full rounded-md font-montserrat border-custom drop-shadow-md font-bold text-gray-500 px-3 py-2 mt-0'
                  disabled={true}
                  rows={1}
                  style={{ resize: 'none', textAlign: 'left' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-full gap-5 py-5">
        <div className="flex flex-col gap-5 w-1/3 h-full bg-[rgba(255,_255,_255,_0.50)] border-custom drop-shadow-md p-5 mt-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Comentarios</h1> 
          </div> 
          <div className='flex flex-col w-full pb-5'>
            <h3 className='font-montserrat text-lg font-bold text-primary w-full mb-2'>Comentario para los alumnos</h3>
            <div className='w-full'>
              <div className='relative w-full h-full'>
                <textarea
                  name='studentAnnotations'
                  value={commentValue}
                  placeholder='Comentario visible para el alumno'
                  onChange={handleCommentChange}
                  className='w-full h-full rounded-md resize-none outline-none px-3 py-2 mt-1 font-montserrat text-[90%] border-custom drop-shadow-md font-bold text-gray-500'
                  disabled={!editMode}
                />
              </div>
            </div>
          </div>
          <div className='flex flex-col w-full pb-5'>
            <h3 className='font-montserrat text-lg font-bold text-primary w-full mb-2'>Comentario Privado</h3>
            <div className='w-full'>
              <div className='relative w-full h-full'>
                <textarea
                  name='studentAnnotations'
                  value={commentValue2}
                  placeholder='Comentario visible para el alumno'
                  onChange={handleCommentChange2}
                  className='w-full h-full rounded-md resize-none outline-none px-3 py-2 mt-1 font-montserrat text-[90%] border-custom drop-shadow-md font-bold text-gray-500'
                  disabled={!editMode}
                />
              </div>
            </div>
          </div>
        </div>


        <div className="flex flex-col gap-5 w-2/3 h-full bg-[rgba(255,_255,_255,_0.50)] border-custom drop-shadow-md p-5 mt-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Asistencia</h1>
            {!editMode ? (
              <Button variant="primario" onClick={() => setEditMode(true)} text="Editar" />
            ) : (
              <div className='flex'>
                <Button variant="secundario" onClick={handleCancelar} text="Cancelar" className="mr-2"/>
                <Button variant="primario" onClick={handleGuardar} text="Guardar" />
              </div>
            )}
            
          </div>
          <div className='w-full h-full'>
            <div className="ag-theme-alpine w-full h-full">
              <AgGridReact
                defaultColDef={defaultColDef}
                columnDefs={columnDefs}
                rowData={estudiantes}
                rowHeight={60}
              />
            </div>
          </div>
        </div>
      </div>
      <div>{isModalOpenGuardar && <ModalResultadoCita onClose={closeModal} loading={false}/>}</div>
    </div>
  );
};

export default PageDetalleCitaGrupal;
