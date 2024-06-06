//import reactLogo from './assets/react.svg';
//import viteLogo from '/vite.svg';
//import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';
import Button from '../Button';
import { DetailsIcon } from '../../assets';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ListStudent } from '../../store/types/ListStudent';
import { useNavigate } from "react-router-dom";
import { Services as ServicesProperties } from '../../config';

type TablaDetalleProps = {
  tutoringProgramId: number;
  onclick?: () => void;
};

const TablaDetalle: React.FC<TablaDetalleProps> = ({
  tutoringProgramId,
}) => {

  const [estudiantes, setEstudiantes] = useState<ListStudent[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${ServicesProperties.BaseUrl}/listarEstudiantesPorProgramaDeTutoria/${tutoringProgramId}`);
        setEstudiantes(response.data.data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, [tutoringProgramId]);

  const navigate = useNavigate();
  const toStudent = (data: any) => {
    navigate('/programasDeTutoria/detalle-programa/alumno', { state: { data } });
  };

  const defaultColDef = {
    suppressMenu: true,
    flex: 1,
    sortable: true,
    resizable: true,
    cellStyle: {
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
    },
  };

  const columnDefs: ColDef[] = [
    {
      headerName: 'Código',
      field: 'pucpCode',
      minWidth: 100,
      maxWidth: 100,
      cellStyle: { textAlign: 'left', justifyContent: 'left' }
    },
    {
      headerName: 'Nombre',
      field: 'name',
      minWidth: 100,
      maxWidth: 130,
      cellStyle: { textAlign: 'left', justifyContent: 'left' }
    },
    {
      headerName: 'Primer Apellido',
      field: 'lastName',
      minWidth: 100,
      maxWidth: 150,
      cellStyle: { textAlign: 'left', justifyContent: 'left' }
    },
    {
      headerName: 'Primer Apellido',
      field: 'secondLastName',
      minWidth: 100,
      maxWidth: 150,
      cellStyle: { textAlign: 'left', justifyContent: 'left' }
    },
    {
      headerName: 'Correo PUCP',
      field: 'institutionalEmail',
      minWidth: 200,
      maxWidth: 250,
      cellStyle: { textAlign: 'left', justifyContent: 'left' }
    },
    {
      headerName: 'Ver más',
      minWidth: 100,
      maxWidth: 100,
      cellStyle: { textAlign: 'left', justifyContent: 'left' },
      cellRenderer: (rowData: any) => {
        return (<Button icon={DetailsIcon} onClick={() => {
          toStudent({ ...rowData.data });
        }} />);
      },
      //cellRendererParams: { icon: DetailsIcon, variant: 'primario', onClick: toStudent },

    }
  ];

  // const rowData3 = [
  //   {
  //     Código: '20206759',
  //     Estudiante: 'Perez Aliaga, Alonso Fernando',
  //     Correo_PUCP: 'alonso.berrospi@pucp.edu.pe'
  //   },
  //   {
  //     Código: '20206523',
  //     Estudiante: 'Espinoza Suarez, Lucia Alejandra',
  //     Correo_PUCP: 'lucia.espinoza@pucp.edu.pe'
  //   },
  //   {
  //     Código: '20204748',
  //     Estudiante: 'Cruz Soto, Juan Carlos',
  //     Correo_PUCP: 'cruz.juan@pucp.edu.pe'
  //   },
  // ];

  return (
    <div className="flex py-5">
      <div
        className="ag-theme-alpine"
        style={{ height: '300px', width: '100%' }}
      >
        <AgGridReact
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}
          rowData={estudiantes}
          rowHeight={60}
        />
      </div>
    </div>
  );
};

export default TablaDetalle;