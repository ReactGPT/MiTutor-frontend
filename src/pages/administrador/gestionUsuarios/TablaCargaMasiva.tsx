import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';
import { Spinner } from '../../../components';
import CargaMasivaSearchBar from './CargaMasivaSearchBar';
import { useDataGrid } from '../../../context/UsersDataGridContext';

export default function TablaCargaMasiva() {
  const { rowData, loading } = useDataGrid();

  useEffect(() => {
    //console.log("llamada fetch prog tutoria");
    //fetchProgramaTutorias();
    //fetchUsers();
  }, []);


  const defaultColDef = {
    suppressHeaderMenuButton: true,
    flex: 1,
    sortable: true,
    resizable: true,
    cellStyle: {
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex'
    },
    //filter: 'agTextColumnFilter',
    floatingFilter: true,
  };

  const columnDefs: ColDef[] = [

    { headerName: 'Código', field: 'pucpCode', filter: 'agNumberColumnFilter', minWidth: 100 },
    { headerName: 'Nombres', field: 'persona.name', filter: 'agTextColumnFilter', minWidth: 150 },
    { headerName: 'Primer Apellido', field: 'persona.lastName', filter: 'agTextColumnFilter', minWidth: 150 },
    { headerName: 'Segundo Apellido', field: 'persona.secondLastName', filter: 'agTextColumnFilter', minWidth: 150 },
    { headerName: 'Correo', field: 'institutionalEmail', filter: 'agTextColumnFilter', minWidth: 300, maxWidth: 300 },
    { headerName: 'Teléfono', field: 'persona.phone', filter: 'agNumberColumnFilter', minWidth: 100, maxWidth: 100 },
    {
      headerName: 'Activo',
      field: 'isActive',
      filter: 'agSetColumnFilter',
      minWidth: 80, maxWidth: 80
    }
  ];

  return (
    <div className='flex w-full h-[80%] ag-theme-alpine items-center justify-center' style={{ marginTop: "20px" }}>
      {loading ? <Spinner size='lg' /> : <div className='w-full h-full'>
        <AgGridReact
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}
          rowData={rowData}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 15, 20]}
        />
      </div>}
    </div>
  )
}


/**
 * 
 * <div className='flex w-full h-[80%] ag-theme-alpine items-center justify-center' style={{ marginTop: "20px" }}>
          {loading ? <Spinner size='lg' /> : <div className='w-full h-full'>
            <AgGridReact
              defaultColDef={defaultColDef}
              columnDefs={columnDefs}
              rowData={rowData}
              pagination={true}
              paginationPageSize={10}
              paginationPageSizeSelector={[10, 15, 20]}
            />
          </div>}
        </div>
 * 
 */