import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { Button } from '../../../components';
import { DetailsIcon, EditIcon } from '../../../assets';
import { Services as ServicesProperties } from '../../../config';
import { ListStudent2 } from '../../../store/types/ListStudent';

const PageDetalleCitaGrupal: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { cita } = state;

  const toDetail = (student: ListStudent2) => {
    //Hacer una copia de appointment con los datos del alum y enviar a la pag sig
    //navigate('/programasDeTutoria/detalle-programa/alumno', { state: { student } });
  };

  const [estudiantes, setEstudiantes] = useState<ListStudent2[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${ServicesProperties.BaseUrl}/listarEstudiantePorIdCita/${cita.appointmentId}`);
        setEstudiantes(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, [cita.appointmentId]);

  const handleCheckboxChange = (studentId: number, checked: boolean) => {
    setEstudiantes((prevData) =>
      prevData.map((student) => 
        student.studentId === studentId ? { ...student, asistio: checked } : student
      )
    );
    console.log(`Checkbox updated for studentId ${studentId}: ${checked}`);
    console.log(estudiantes);
  };

  const defaultColDef = {
    suppressMenu: true,
    flex: 1, // Ajustar columnas para ocupar el espacio disponible
    sortable: true,
    resizable: true,
    minWidth: 100,
    cellStyle: {
      textAlign: 'center', // Cambiar el alineamiento del texto a la izquierda
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
          />
        );
      },
    },{
      headerName: 'Ver más',
      minWidth: 100, 
      cellStyle: { textAlign: 'left' },
      cellRenderer: (params: any) => {
        return (
          <Button icon={DetailsIcon} onClick={() => toDetail(params.data)} />
        );
      },
    },
  ];

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

      <div className="flex flex-col gap-5 w-full h-3/4 bg-[rgba(255,_255,_255,_0.50)] border-custom drop-shadow-md p-5 mt-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Participantes</h1>
          <Button icon={EditIcon} onClick={() => {}} />
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
  );
};

export default PageDetalleCitaGrupal;
