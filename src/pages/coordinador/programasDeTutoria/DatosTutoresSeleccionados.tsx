import React, { useEffect, useState } from 'react'
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
import { Tutor } from '../../../store/types';
import DeleteIcon from '../../../assets/svg/DeleteIcon';
import { daysToWeeks } from 'date-fns';
import ModalConfirmation from '../../../components/ModalConfirmation';

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
    const [tutoresAEliminar,setTutoresAEliminar]= useState<Tutor[]>([]);
    const [isOpen,setIsOpen]=useState<boolean>(false);
    const columnDefs: ColDef[] = [
        
        { headerName: 'Nombres Apellidos', field: 'fullname' },
        { headerName: 'Email',field: 'email'},
        {
            headerComponent:()=>{
                return (
                    <button className='text-primary' onClick={()=>{if(tutoresAEliminar.length>0){setIsOpen(true)}}}><DeleteIcon/></button>
                )
            },
            maxWidth:60,
            minWidth:40,
            cellRenderer: (row:any)=>{
                //console.log(row);
                return (
                    <Checkbox value={tutoresAEliminar.some(item=>item.idTutor===row.data.idTutor)} 
                    onChange={()=>{
                        const tutorIsFound = tutoresAEliminar.some(item=>item.idTutor===row.data.idTutor);
                        if(tutorIsFound){
                            setTutoresAEliminar([...(tutoresAEliminar.filter(tutor=>tutor.idTutor!==row.data.idTutor))]);
                        }else{
                            setTutoresAEliminar([...tutoresAEliminar,row.data]);
                        }
                    }}
                    />
                )
            }
        }

    ];
    useEffect(()=>{
        if(!!tutoringProgram.id){
            fetchTutoresByProgramaTutoria(tutoringProgram.id)
            .then((tutores)=>{
                onChangeTutoringProgram("tutores",[...tutores])
            });
        }
        setTutoresAEliminar([]);
    },[]);

    const handleOnClickDeleteIcon=()=>{
        if(tutoresAEliminar.length>0){
            const newTutores = [...(tutoringProgram.tutores.filter((tutor)=>!tutoresAEliminar.some((item)=>item.idTutor===tutor.idTutor)))];
            onChangeTutoringProgram("tutores",[...newTutores]);
            setTutoresAEliminar([]);
        }
    }
    // useEffect(()=>{
    //     onChangeTutoringProgram("tutores",[...tutorListByProgramId])
    // },[tutorListByProgramId])
    return (
    <div className={className}>
        <div className='flex flex-row justify-center h-[25%]'>
            <h2 className='text-xl w-full h-[15%] min-h-[50px] font-bold text-primary'>Tutores Seleccionados</h2>
            <Button onClick={()=>{openModal()}} text='Agregar' icon={AddCircleIcon}/>
        </div>
        
        <div className='flex w-full h-full min-h-[250px] ag-theme-alpine'>
            {isLoading?<Spinner color='primary'/>:<div className='w-full h-full'>
                <AgGridReact
                    defaultColDef={defaultColDef}
                    columnDefs={columnDefs}
                    rowData={tutoringProgram.tutores}
                />
            </div>}
        </div>
        <ModalConfirmation isOpen={isOpen} 
                         isAcceptAction={true} 
                         message='¿Esta seguro de eliminar estos tutores?' 
                         onClose={()=>{setIsOpen(false)}}
                         onConfirm={()=>{
                            handleOnClickDeleteIcon()
                            setIsOpen(false);
                        }}
                         />
    </div>
  )
}

export default DatosTutoresSeleccionados