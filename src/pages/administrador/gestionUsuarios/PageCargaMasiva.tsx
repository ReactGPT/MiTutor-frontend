import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import CargaMasivaSearchBar from './CargaMasivaSearchBar';
import { DataGridProvider } from '../../../context/UsersDataGridContext';
import TablaCargaMasiva from './TablaCargaMasiva';

export default function PageCargaMasiva() {

  useEffect(() => {
  }, []);

  return (
    <DataGridProvider >
      <div className='flex w-full h-full flex-col space-y-10'>
        <div className='flex w-full h-[25%]'>
          <CargaMasivaSearchBar rol='usuario' />
        </div>
        <TablaCargaMasiva />
      </div>
    </DataGridProvider>
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