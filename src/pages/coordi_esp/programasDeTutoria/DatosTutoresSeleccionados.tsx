
import React, { useEffect, useState } from 'react';
import { useTutoringProgramContext } from '../../../context/ProgramaTutoriaNuevo';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';
import { useProgramaTutoria } from '../../../store/hooks';
type InputProps = {
    className: string;
    openModal: () => void;
};
import { Checkbox, Spinner, Button } from '../../../components';
import { AddCircleIcon } from '../../../assets';
import { Tutor } from '../../../store/types';
import DeleteIcon from '../../../assets/svg/DeleteIcon';
import { daysToWeeks } from 'date-fns';
import ModalConfirmation from '../../../components/ModalConfirmation';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { RootState } from '../../../store/store';
import { tutoringProgramSlice } from '../../../store/slices';

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

function DatosTutoresSeleccionados({ className, openModal }: InputProps) {
    const { tutoringProgram, onChangeTutoringProgram } = useTutoringProgramContext();
    // useEffect(()=>{
    //     console.log(tutoringProgram);
    // },[tutoringProgram])
    //const dispatch= useAppDispatch();
    //const {handleChangeTutoringProgram} = tutoringProgramSlice.actions;
    const { fetchTutoresByProgramaTutoria, tutorListByProgramId, isLoading } = useProgramaTutoria();
    //const { tutoringProgramSelected } = useAppSelector((state: RootState) => state.tutoringProgram);
    //const {tutoringProgram,onChangeTutoringProgram}=useTutoringProgramContext();
    const [tutoresAEliminar, setTutoresAEliminar] = useState<Tutor[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    // const handleLocalChangeTutoringProgram= (name:string,value:any)=>{
    //     dispatch(handleChangeTutoringProgram({name:name,value:value}));
    //   };
    const columnDefs: ColDef[] = [

        { headerName: 'Nombres Apellidos', field: 'fullname' },
        { headerName: 'Email', field: 'email' },
        {
            headerComponent: () => {
                return (
                    <button className='text-primary' onClick={() => { if (tutoresAEliminar.length > 0) { setIsOpen(true); } }}><DeleteIcon /></button>
                );
            },
            maxWidth: 60,
            minWidth: 40,
            cellRenderer: (row: any) => {
                //console.log(row);
                return (
                    <Checkbox value={tutoresAEliminar.some(item => item.idTutor === row.data.idTutor)}
                        onChange={() => {
                            const tutorIsFound = tutoresAEliminar.some(item => item.idTutor === row.data.idTutor);
                            if (tutorIsFound) {
                                setTutoresAEliminar([...(tutoresAEliminar.filter(tutor => tutor.idTutor !== row.data.idTutor))]);
                            } else {
                                setTutoresAEliminar([...tutoresAEliminar, row.data]);
                            }
                        }}
                    />
                );
            }
        }

    ];
    useEffect(() => {
        console.log("ddsssss",tutoringProgram);
        if (!!tutoringProgram.id) {
            //const idToSearch = tutoringProgramSelected.id;
            fetchTutoresByProgramaTutoria(tutoringProgram.id)
                .then((tutores) => {
                    onChangeTutoringProgram("tutores", [...tutores]);
                    // if(idToSearch===tutoringProgramSelected.id){
                    // }
                });
        }
        setTutoresAEliminar([]);
    }, [tutoringProgram.id]);

    const handleOnClickDeleteIcon = () => {
        if (tutoresAEliminar.length > 0) {
            const newTutores = [...(tutoringProgram.tutores.filter((tutor) => !tutoresAEliminar.some((item) => item.idTutor === tutor.idTutor)))];
            onChangeTutoringProgram("tutores", [...newTutores]);
            setTutoresAEliminar([]);
        }
    };
    // useEffect(()=>{
    //     onChangeTutoringProgram("tutores",[...tutorListByProgramId])
    // },[tutorListByProgramId])
    return (
        <div className={className}>
            <div className='flex flex-row justify-between items-center h-fit'>
                <h2 className='text-xl font-bold font-roboto text-black'>Tutores Seleccionados</h2>
                <Button onClick={() => { openModal(); }} text='Agregar' icon={AddCircleIcon} />
            </div>

            <div className='flex w-full h-full min-h-[250px] ag-theme-alpine'>
                {isLoading ? <Spinner color='primary' /> : <div className='w-full h-full'>
                    <AgGridReact
                        defaultColDef={defaultColDef}
                        columnDefs={columnDefs}
                        rowData={tutoringProgram.tutores}
                        suppressMovableColumns
                    />
                </div>}
            </div>
            <ModalConfirmation isOpen={isOpen}
                isAcceptAction={true}
                message='¿Esta seguro de eliminar estos tutores?'
                onClose={() => { setIsOpen(false); }}
                onConfirm={() => {
                    handleOnClickDeleteIcon();
                    setIsOpen(false);
                }}
            />
        </div>
    );
}

export default DatosTutoresSeleccionados;