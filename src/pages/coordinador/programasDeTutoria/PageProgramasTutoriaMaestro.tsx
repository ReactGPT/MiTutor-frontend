import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import ProgramaTutoríaSearchBar from './ProgramaTutoríaSearchBar';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';
import CustomProgramaTutoriaGridButton from './CustomProgramaTutoriaGridButton';
import { DetailsIcon, RefreshIcon } from '../../../assets';
import { useNavigate } from 'react-router-dom';
import { useProgramaTutoria } from '../../../store/hooks';
import { Spinner } from '../../../components';
import { Faculty, ProgramaTutoria, Tutor } from '../../../store/types';
//import { useHistory } from 'react-router-dom';
import { useAuth, useTitle } from '../../../context';
import DeleteIcon from '../../../assets/svg/DeleteIcon';
//import { getEliminarTutoria } from '../../../store/services';
import ModalConfirmation from '../../../components/ModalConfirmation';
import ModalSuccess from '../../../components/ModalSuccess';
import ModalError from '../../../components/ModalError';


type ProgramSelectedNotification = {
    program: ProgramaTutoria;
    type: 'Delete' | 'DeleteStudent';
    onConfirmEffect: () => void;
};

export default function PageProgramasTutoriaMaestro() {
    const navigate = useNavigate();
    //const history = useHistory();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenModalSuccess, setIsOpenModalSuccess] = useState<boolean>(false);
    const [isOpenModalError, setIsOpenModalError] = useState<boolean>(false);
    //const [isOpenDeleteStudent,setIsOpenDeleteStudent] = useState<boolean>(false);
    const { isLoading, programaTutoriaData, fetchProgramaTutorias, postEliminarProgramaTutoria, postEliminarEstudiantesPrograma } = useProgramaTutoria();
    const [programaSelectedDelete, setProgramaSelectedDelete] = useState<ProgramSelectedNotification | null>(null);
    //const [programSelectedDeleteStudents,setProgramSelectedDeleteStudents] = useState<ProgramaTutoria|null>(null);
    useEffect(() => {
        fetchProgramaTutorias();
    }, []);

    const handleNavigation = (data: ProgramaTutoria) => {
        //console.log(data);
        navigate("/programasDeTutoriaMaestro/editar", { state: { programaTutoria: data } });
    };
    const handleOnSelectProgramaTutoria = (programaDelete: ProgramSelectedNotification) => {
        setProgramaSelectedDelete(programaDelete);
    };

    useEffect(() => {
        if (programaSelectedDelete) {
            setIsOpen(true);
        }
    }, [programaSelectedDelete]);

    const handleOnConfirmDeleteProgramaTutoria = () => {
        if (programaSelectedDelete && !!programaSelectedDelete.program.id) {
            postEliminarProgramaTutoria(programaSelectedDelete?.program.id)
                .then((result) => {
                    if (result) {
                        setIsOpenModalSuccess(true);
                    }
                    else {
                        setIsOpenModalError(true);
                    }
                    setIsOpen(false);
                    //setProgramaSelected(null);
                });
        }
    };
    const handleOnConfirmDeleteStudents = () => {
        console.log("Intento eliminar studiantes");
        console.log(programaSelectedDelete);
        if (programaSelectedDelete && !!programaSelectedDelete.program.id) {
            postEliminarEstudiantesPrograma(programaSelectedDelete?.program.id)
                .then((result) => {
                    if (result) {
                        setIsOpenModalSuccess(true);
                    }
                    else {
                        setIsOpenModalError(true);
                    }
                    setIsOpen(false);
                    //setProgramaSelected(null);
                });
        }
    };

    const [filters, setFilters] = useState<any>({
        idSpeciality: null,
        idFaculty: null,
        name: null
    });
    const handleOnChangeFilters = (filter: any) => {
        setFilters(filter);
    };
    const { userData } = useAuth();
    const roles = userData?.userInfo?.roles;
    let selectedFaculties: Faculty[] = [];
    
    const programaTutoriaFiltered: ProgramaTutoria[] = useMemo(() => {
        let filteredData: ProgramaTutoria[] = [];

        // Apply role-based filter if user has 'Responsable de Facultad' role
        if (roles) {
            roles.forEach(role => {
                if (role.rolName === 'Responsable de Facultad') {
                    const facultyId = parseInt((role.details as any).departmentId, 10);
                    const programa = programaTutoriaData.find(item => item.facultadId === facultyId);
                    if (programa) {
                        filteredData.push(programa);
                    }
                }
            });
        }

        // Apply additional filters (name, speciality, faculty)
        filteredData = filteredData.filter(item =>
            item.nombre.toLowerCase().includes(filters.name ? filters.name.toString().toLowerCase() : "") &&
            (filters.idSpeciality ? filters.idSpeciality === item.especialidadId : true) &&
            (filters.idFaculty ? filters.idFaculty === item.facultadId : true)
        );

        return filteredData;
    }, [programaTutoriaData, filters, roles]);

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
    const columnDefs: ColDef[] = [

        { headerName: 'Nombre', field: 'nombre', minWidth: 250 },
        { headerName: 'Facultad', field: 'facultadNombre', minWidth: 280 },
        { headerName: 'Especialidad', field: 'especialidadNombre', minWidth: 180 },
        {
            headerName: 'Tutores',
            field: 'cant_tutores',
            minWidth: 100, maxWidth: 100
        },
        {
            headerName: 'Alumnos',
            field: 'cant_alumnos',
            minWidth: 100, maxWidth: 100
        },
        {
            headerName: '',
            field: '',
            maxWidth: 40,
            minWidth: 20,
            cellRenderer: (rowData: any) => {
                return (
                    <CustomProgramaTutoriaGridButton icon={DetailsIcon} iconSize={4} onClick={() => (handleNavigation(rowData.data))} />
                );
            }
        },
        {
            headerName: '',
            field: '',
            maxWidth: 40,
            minWidth: 20,
            cellRenderer: (rowData: any) => {
                return (
                    rowData.data.cant_alumnos > 0 ? <button className='text-primary' onClick={() => handleOnSelectProgramaTutoria({
                        program: rowData.data,
                        type: 'DeleteStudent',
                        onConfirmEffect: handleOnConfirmDeleteStudents
                    })}>
                        <RefreshIcon size={4} />
                    </button> : <></>
                );
            }
        },
        {
            headerName: '',
            field: '',
            maxWidth: 40,
            minWidth: 20,
            cellRenderer: (rowData: any) => {
                return (
                    <button className='text-primary' onClick={() => handleOnSelectProgramaTutoria({
                        program: rowData.data,
                        type: 'Delete',
                        onConfirmEffect: handleOnConfirmDeleteProgramaTutoria
                    })}>
                        <DeleteIcon size={6} />
                    </button>
                );
            }
        }

    ];
    return (
        <div className='flex w-full h-full flex-col gap-5'>
            <div className='flex w-full h-fit'>
                <ProgramaTutoríaSearchBar handleOnChangeFilters={handleOnChangeFilters} />
            </div>
            <div className='flex w-full h-full ag-theme-alpine items-center justify-center'>
                {isLoading ? <Spinner size='lg' /> : <div className='w-full h-full'>
                    <AgGridReact
                        defaultColDef={defaultColDef}
                        columnDefs={columnDefs}
                        rowData={programaTutoriaFiltered}
                        suppressMovableColumns
                    />
                </div>}
            </div>
            <ModalConfirmation isOpen={isOpen}
                message={programaSelectedDelete?.type === 'Delete' ?
                    `¿Esta seguro de eliminar el programa de tutoría : ${programaSelectedDelete && programaSelectedDelete.program.nombre}?` :
                    `¿Esta seguro de eliminar los ${programaSelectedDelete && programaSelectedDelete?.program.cant_alumnos} alumnos del programa : ${programaSelectedDelete && programaSelectedDelete.program.nombre}?`}
                onClose={() => {
                    setIsOpen(false);
                }}
                onConfirm={() => {
                    setIsOpen(false);
                    const onConfirmEffect = programaSelectedDelete?.type === 'Delete' ? handleOnConfirmDeleteProgramaTutoria : handleOnConfirmDeleteStudents;

                    onConfirmEffect();

                }}
                isAcceptAction={true}
            />
            <ModalSuccess isOpen={isOpenModalSuccess}
                message={programaSelectedDelete?.type === 'Delete' ?
                    `Se elimino con éxito el programa : ${programaSelectedDelete && programaSelectedDelete.program.nombre}` :
                    `Se eliminaron los ${programaSelectedDelete && programaSelectedDelete.program.cant_alumnos} alumnos del programa : ${programaSelectedDelete && programaSelectedDelete.program.nombre}`}
                onClose={() => {
                    setIsOpenModalSuccess(false);
                    setProgramaSelectedDelete(null);
                    fetchProgramaTutorias();
                }}
            />
            <ModalError isOpen={isOpenModalError} message='Ocurrió un problema inesperado. Intente nuevamente'
                onClose={() => {
                    setIsOpenModalError(false);
                    setProgramaSelectedDelete(null);
                }}
            />
        </div>
    );
}
