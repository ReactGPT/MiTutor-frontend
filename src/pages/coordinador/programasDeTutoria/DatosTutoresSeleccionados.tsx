import React, { useEffect } from 'react'
import { useTutoringProgramContext } from '../../../context/ProgramaTutoriaNuevo';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';
import { useProgramaTutoria } from '../../../store/hooks';
type InputProps= {
    className:string;
    openModal:()=>void;
}
import { Checkbox, Spinner,Button } from '../../../components';
import { AddCircleIcon } from '../../../assets';

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

function DatosTutoresSeleccionados({className,openModal}:InputProps) {
    //const {tutoringProgram,onChangeTutoringProgram} = useTutoringProgramContext();
    // useEffect(()=>{
    //     console.log(tutoringProgram);
    // },[tutoringProgram])
    const {fetchTutoresByProgramaTutoria,tutorListByProgramId,isLoading} = useProgramaTutoria();
    const {tutoringProgram,onChangeTutoringProgram}=useTutoringProgramContext();
    const columnDefs: ColDef[] = [
        
        { headerName: 'Nombres Apellidos', field: 'fullname' },
        { headerName: 'Email',field: 'email'},
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
    useEffect(()=>{
        if(!!tutoringProgram.id){
            fetchTutoresByProgramaTutoria(tutoringProgram.id)
            .then((tutores)=>{
                onChangeTutoringProgram("tutores",[...tutores])
            });
        }
    },[]);
    // useEffect(()=>{
    //     onChangeTutoringProgram("tutores",[...tutorListByProgramId])
    // },[tutorListByProgramId])
    return (
    <div className={className}>
        <div className='flex flex-row justify-center h-[25%]'>
        <h2 className='text-xl w-full h-[15%] min-h-[50px] font-bold text-primary'>Tutores Seleccionados</h2>
        <Button onClick={()=>{openModal()}} text='Agregar' icon={AddCircleIcon} />
        </div>
        
      <div className='flex w-full h-full min-h-[250px] ag-theme-alpine'>
        {isLoading?<Spinner color='primary'/>:<div className='w-full h-full'>
            <AgGridReact
                defaultColDef={defaultColDef}
                columnDefs={columnDefs}
                rowData={tutorListByProgramId}
            />
        </div>}
      </div>
    </div>
  )
}

export default DatosTutoresSeleccionados