import React, { useEffect } from 'react'
import { useTutoringProgramContext } from '../../../context/ProgramaTutoriaNuevo';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';

type InputProps= {
    className:string;
}
import { Checkbox } from '../../../components';

const defaultColDef = {
    suppressHeaderMenuButton: true,
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

function DatosTutoresSeleccionados({className}:InputProps) {
    //const {tutoringProgram,onChangeTutoringProgram} = useTutoringProgramContext();
    // useEffect(()=>{
    //     console.log(tutoringProgram);
    // },[tutoringProgram])
    
    const columnDefs: ColDef[] = [
        
        { headerName: 'Nombres Apellidos', field: 'nombre' },
        { headerName: 'Tipo Tutor',field: 'descripcion_tipo'},
        {
            headerName:'',
            field:'',
            maxWidth:60,
            minWidth:40,
            cellRenderer: (row:any)=>{
                console.log(row);
                return (
                    <Checkbox value={true} onChange={()=>{}}/>
                )
            },
            
        }

    ];
    return (
    <div className={className}>
        <h2 className='text-xl w-full h-[15%] min-h-[50px] font-bold text-primary'>Tutores Seleccionados</h2>
      <div className='flex w-full h-full min-h-[250px] ag-theme-alpine'>
        <div className='w-full h-full'>
            <AgGridReact
                defaultColDef={defaultColDef}
                columnDefs={columnDefs}
                rowData={[{
                    id:1,
                    nombre:"Juanito Flores",
                    descripcion_tipo:"TPO"
                }]}
            />
        </div>
      </div>
    </div>
  )
}

export default DatosTutoresSeleccionados