import { AgGridReact } from 'ag-grid-react';
import React from 'react'
import DeleteIcon from '../../../assets/svg/DeleteIcon';
import { ColDef } from 'ag-grid-community';
import { Tutor } from '../../../store/types';
import { Spinner } from '../../../components';


type InputProps={
    className:string;
    tutores:Tutor[];
    loadingTutores:boolean;
    setTutorSelectedForDelete:(tutor:Tutor)=>void;
}

function TutoresTable({className,tutores,loadingTutores,setTutorSelectedForDelete}:InputProps) {
  
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
        floatingFilter: true,
    };
    const columnDefs: ColDef[] = [
        { headerName: 'Código', field: 'pucpCode', filter: 'agNumberColumnFilter', minWidth: 100 },
        { headerName: 'Nombres', field: 'fullname', filter: 'agTextColumnFilter', minWidth: 200 },
        { headerName: 'Correo', field: 'email', filter: 'agTextColumnFilter', minWidth: 300, maxWidth: 300 },
        { headerName: 'Ultima Modificación', field: 'modificationDate', filter: 'agTextColumnFilter', minWidth: 300, maxWidth: 300 ,sort:'desc' },
        {
            headerName: '',
            field: '',
            maxWidth: 60,
            minWidth: 40,
            cellRenderer: (rowData: any) => {
            return (
                <button className='text-primary' onClick={() => {setTutorSelectedForDelete(rowData.data)}}>
                <DeleteIcon size={6} />
                </button>
            )
            }
        }    
    ];
  return (
    <div className={className}>
        {loadingTutores?<Spinner size='lg'/>:<div className='w-full h-full ag-theme-alpine items-center justify-center'>
            <AgGridReact
                defaultColDef={defaultColDef}
                columnDefs={columnDefs}
                rowData={tutores}
                pagination={true}
                paginationPageSize={10}
                paginationPageSizeSelector={[10,20,50]}
            />
        </div>}
    </div>
  )
}

export default TutoresTable