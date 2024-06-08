import React, { useState, useEffect, useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef, GridApi } from 'ag-grid-community';
import SolicitudGestionSearchBar from './SolicitudGestionSearchBar';
import { useTutorStudentPrograms } from '../../../store/hooks/useTutorStudentPrograms';
import { Spinner } from '../../../components';
import Accept from '../../../assets/svg/Accept';
import Reject from '../../../assets/svg/Reject';
import Button from '../../../components/Button';
import SimpleSearchInput from '../../../components/SimpleSearchInput';
import ModalWarning from '../../../components/ModalWarning';
import ModalError from '../../../components/ModalError';
import ModalConfirmation from '../../../components/ModalConfirmation';
import ModalSuccess from '../../../components/ModalSuccess';

const PageSolicitudGestion: React.FC = () => {
    const { fetchTutorStudentPrograms, tutorStudentPrograms, isLoading, updateProgramState } = useTutorStudentPrograms();
    const [filters, setFilters] = useState<{ faculty?: string; specialty?: string }>({});
    const gridApiRef = useRef<GridApi | null>(null);

    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [confirmationAction, setConfirmationAction] = useState<() => void>(() => {});

    useEffect(() => {
        fetchTutorStudentPrograms();
    }, []);

    const handleOnChangeFilters = (filter: { faculty?: string; specialty?: string }) => {
        setFilters(filter);
        console.log("Filters changed: ", filter);
    };

    const handleAcceptClick = () => {
        const selectedNodes = gridApiRef.current?.getSelectedNodes() || [];
        const selectedIds = selectedNodes.map((node: any) => node.data.TutorStudentProgramId);
        if (selectedIds.length === 0) {
            setIsWarningModalOpen(true);
        } else {
            setModalMessage('¿Está seguro de aceptar las solicitudes seleccionadas?');
            setConfirmationAction(() => async () => {
                try {
                    await updateProgramState(selectedIds, 'ASIGNADO');
                    setIsSuccessModalOpen(true);
                } catch (error) {
                    setIsErrorModalOpen(true);
                }
                fetchTutorStudentPrograms();
            });
            setIsConfirmationModalOpen(true);
        }
    };

    const handleRejectClick = () => {
        const selectedNodes = gridApiRef.current?.getSelectedNodes() || [];
        const selectedIds = selectedNodes.map((node: any) => node.data.TutorStudentProgramId);
        if (selectedIds.length === 0) {
            setIsWarningModalOpen(true);
        } else {
            setModalMessage('¿Está seguro de rechazar las solicitudes seleccionadas?');
            setConfirmationAction(() => async () => {
                try {
                    await updateProgramState(selectedIds, 'RECHAZADO');
                    setIsSuccessModalOpen(true);
                } catch (error) {
                    setIsErrorModalOpen(true);
                }
                fetchTutorStudentPrograms();
            });
            setIsConfirmationModalOpen(true);
        }
    };

    const handleConfirmAction = () => {
        confirmationAction();
        setIsConfirmationModalOpen(false);
    };

    const onGridReady = (params: any) => {
        gridApiRef.current = params.api;
    };

    const columnDefs: ColDef[] = [
        {
            headerCheckboxSelection: true,
            checkboxSelection: true,
            width: 50
        },
        { headerName: 'Especialidad', field: 'SpecialtyName', minWidth: 150 },
        { headerName: 'Nombres del Alumno', field: 'StudentFirstName', minWidth: 240 },
        { headerName: 'Apellidos del Profesor', field: 'TutorFullName', minWidth: 200 },
        { headerName: 'Estado', field: 'State', minWidth: 150 }
    ];

    const filteredRowData = useMemo(() => {
        return tutorStudentPrograms.filter(program => {
            const matchesFaculty = filters.faculty ? program.studentProgram?.student?.faculty?.name === filters.faculty : true;
            const matchesSpecialty = filters.specialty ? program.studentProgram?.student?.specialty?.name === filters.specialty : true;
            return matchesFaculty && matchesSpecialty;
        }).map(program => ({
            SpecialtyName: program.studentProgram?.student?.specialty?.name || 'N/A',
            StudentFirstName: program.studentProgram?.student?.name || 'N/A',
            TutorFullName: `${program.tutor?.userAccount?.persona?.name || 'N/A'} ${program.tutor?.userAccount?.persona?.lastName || ''} ${program.tutor?.userAccount?.persona?.secondLastName || ''}`,
            State: program.State || 'N/A',
        }));
    }, [tutorStudentPrograms, filters]);

    return (
        <div className='flex flex-col'>
            <main>
                <div className="mb-2">
                    <h2 className="font-montserrat text-[26px] font-bold text-lg">
                        Solicitud
                    </h2>
                    <SolicitudGestionSearchBar handleOnChangeFilters={handleOnChangeFilters} />
                    <div className="mb-2">
                        <h2 className="font-montserrat text-[26px] font-bold text-lg mb-2">
                            Tutor
                        </h2>
                        <div className="flex space-x-4 mt-2">
                            <SimpleSearchInput
                                placeholder="Nombre o apellido del tutor"
                                onSearch={() => {}}
                            />
                        </div>
                    </div>
                    <div className="mb-2 mt-2">
                        <h2 className="font-montserrat text-[26px] font-bold text-lg mb-2 mt-4">
                            Alumno
                        </h2>
                        <div className="flex space-x-8 mt-2">
                            <SimpleSearchInput
                                placeholder="Nombre, apellido, o código de alumno"
                                onSearch={() => {}}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center mb-4 mt-4">
                    <h2 className="font-montserrat text-[26px] font-bold text-lg mb-2 mt-4">
                        Resultado de Solicitudes
                    </h2>
                    <div className="flex justify-end mb-4 space-x-4">
                        <Button variant="accept" text="Aceptar" icon={Accept} onClick={handleAcceptClick} />
                        <Button variant="reject" text="Rechazar" icon={Reject} onClick={handleRejectClick} />
                    </div>
                </div>
                <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
                    {isLoading ? <Spinner size='lg' /> :
                        <AgGridReact
                            onGridReady={onGridReady}
                            defaultColDef={{
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
                            }}
                            columnDefs={columnDefs}
                            rowData={filteredRowData}
                            pagination={true}
                            paginationPageSize={10}
                        />
                    }
                </div>
            </main>
            <ModalSuccess 
                isOpen={isSuccessModalOpen} 
                onClose={() => setIsSuccessModalOpen(false)} 
                message="Solicitudes aceptadas con éxito"
            />
            <ModalError 
                isOpen={isErrorModalOpen} 
                onClose={() => setIsErrorModalOpen(false)} 
                message="Solicitudes rechazadas con éxito"
            />
            <ModalConfirmation 
                isOpen={isConfirmationModalOpen} 
                onClose={() => setIsConfirmationModalOpen(false)} 
                onConfirm={handleConfirmAction}
                message={modalMessage}
                isAcceptAction={modalMessage.includes('aceptar')}
            />
            <ModalWarning 
                isOpen={isWarningModalOpen}
                onClose={() => setIsWarningModalOpen(false)}
                message="Debe seleccionar al menos una solicitud para continuar."
            />
        </div>
    );
};

export default PageSolicitudGestion;
