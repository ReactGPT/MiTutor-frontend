import React, { useState, useEffect, useMemo, useRef } from 'react';

// Componentes
import Button from "../../../components/Button";
import Dropdown from "../../../components/Dropdown";
import SearchInput from "../../../components/SearchInput";
import Pagination from "../../../components/Pagination";
import Checkbox from "../../../components/Checkbox";
import CheckboxCellRenderer from '../../../components/CheckboxCellRenderer';

// Icons
import IconSearch from "../../../assets/svg/IconSearch";
import AcademicUnit from "../../../assets/svg/AcademicUnit";
import State from "../../../assets/svg/State";
import Program from "../../../assets/svg/Program";
import Accept from "../../../assets/svg/Accept";
import Reject from "../../../assets/svg/Reject";

// Hooks
import { useFaculties } from '../../../store/hooks/useFaculties';
import { useTutoringPrograms } from '../../../store/hooks/useTutoringPrograms';
import { useTutores } from '../../../store/hooks/useTutores';
import { useAlumnos } from '../../../store/hooks/useAlumnos';
import { useTutorStudentPrograms } from '../../../store/hooks/useTutorStudentPrograms';

// ag-Grid imports
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css'; // CSS de ag-Grid
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Tema de ag-Grid
import { ColDef, GridApi } from 'ag-grid-community'; // Importa el tipo ColDef y GridApi

import ModalSuccess from '../../../components/ModalSuccess';
import ModalError from '../../../components/ModalError';
import ModalConfirmation from '../../../components/ModalConfirmation'; // Nuevo modal
import ModalWarning from '../../../components/ModalWarning'; // Nuevo modal

// Definir la interfaz RowData
interface RowData {
    studentCode: string;
    specialtyName: string;
    studentFirstName: string;
    tutorFirstName: string;
    programName: string;
    requestDate: string;
    state: string;
    TutorStudentProgramId: number; // Asegúrate de que este campo está incluido
}

// Actualización del componente PageSolicitudGestion
const PageSolicitudGestion: React.FC = () => {
    const { fetchFaculties, faculties, isLoading: isLoadingFaculties, error: errorFaculties } = useFaculties();
    const [facultyId, setFacultyId] = useState<number | undefined>(undefined);

    const { fetchTutoringPrograms, tutoringPrograms, isLoading: isLoadingPrograms, error: errorPrograms } = useTutoringPrograms();
    const [tutoringProgramId, setTutoringProgramId] = useState<number | undefined>(undefined);

    const { fetchTutores, tutors, isLoading: isLoadingTutores, error: errorTutores } = useTutores();
    const { fetchAlumnos, alumnos, isLoading: isLoadingAlumnos, error: errorAlumnos } = useAlumnos();

    const { fetchTutorStudentPrograms, updateProgramState, tutorStudentPrograms, isLoading: isLoadingTutorStudentPrograms, error: errorTutorStudentPrograms } = useTutorStudentPrograms();

    const [tutorSearch, setTutorSearch] = useState<string | undefined>(undefined);
    const [studentSearch, setStudentSearch] = useState<string | undefined>(undefined);
    const [state, setState] = useState<string | undefined>(undefined);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);
    const [isWarningModalOpen, setIsWarningModalOpen] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>('');
    const [confirmationAction, setConfirmationAction] = useState<() => void>(() => {});
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(10); // Definido como 10 por página

    const gridApiRef = useRef<GridApi | null>(null);

    const columnDefs: ColDef[] = useMemo(() => [
        {
            headerCheckboxSelection: true,
            checkboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            headerName: '',
            field: 'checkbox',
            width: 50,
            cellRendererFramework: CheckboxCellRenderer
        },
        { headerName: "Código", field: "studentCode" },
        { headerName: "Especialidad", field: "specialtyName" },
        { headerName: "Nombres", field: "studentFirstName" },
        { headerName: "Tutor", field: "tutorFirstName" },
        { headerName: "Programa", field: "programName" },
        { headerName: "Fecha Solic.", field: "requestDate" },
        { headerName: "Estado", field: "state" }
    ], []);

    useEffect(() => {
        fetchFaculties();
        fetchTutoringPrograms();
    }, [fetchFaculties, fetchTutoringPrograms]);

    const handleSelectUnidad = (value: string) => {
        if (value === "Todos") {
            setFacultyId(undefined); // No facultyId means fetch all
        } else {
            const selectedFaculty = faculties.find(faculty => faculty.Name === value);
            if (selectedFaculty) {
                setFacultyId(selectedFaculty.FacultyId);
            }
        }
    };

    const handleSelectPrograma = (value: string) => {
        if (value === "Todos") {
            setTutoringProgramId(undefined); // No tutoringProgramId means fetch all
        } else {
            const selectedTutoringProgram = tutoringPrograms.find(tutoringProgram => tutoringProgram.ProgramName === value);
            if (selectedTutoringProgram) {
                setTutoringProgramId(selectedTutoringProgram.TutoringProgramId);
            }
        }
    };

    const handleSelectState = (value: string) => {
        if (value === "Todos") {
            setState(undefined); // No state means fetch all
        } else {
            setState(value);
        }
    };

    const handleSearchClick = () => {
        fetchTutorStudentPrograms(tutorSearch, undefined, state, tutoringProgramId);
    };

    const handleTutorSearch = async (query: string) => {
        setTutorSearch(query);
        await fetchTutorStudentPrograms(query, undefined, state, tutoringProgramId);
    };

    const handleAlumnoSearch = async (query: string) => {
        setStudentSearch(query);
        // Aquí podrías agregar lógica para buscar por alumno si es necesario
    };

    const handleAcceptClick = () => {
        const selectedIds = gridApiRef.current?.getSelectedNodes().map((node: any) => node.data.TutorStudentProgramId) || [];
        if (selectedIds.length === 0) {
            setIsWarningModalOpen(true);
        } else {
            setModalMessage('¿Está seguro de aceptar las solicitudes seleccionadas?');
            setConfirmationAction(() => async () => {
                await updateProgramState(selectedIds, 'ASIGNADO');
                setIsSuccessModalOpen(true);
                // Refrescar datos
                fetchTutorStudentPrograms(tutorSearch, undefined, state, tutoringProgramId);
            });
            setIsConfirmationModalOpen(true);
        }
    };

    const handleRejectClick = () => {
        const selectedIds = gridApiRef.current?.getSelectedNodes().map((node: any) => node.data.TutorStudentProgramId) || [];
        if (selectedIds.length === 0) {
            setIsWarningModalOpen(true);
        } else {
            setModalMessage('¿Está seguro de rechazar las solicitudes seleccionadas?');
            setConfirmationAction(() => async () => {
                await updateProgramState(selectedIds, 'RECHAZADO');
                setIsErrorModalOpen(true);
                // Refrescar datos
                fetchTutorStudentPrograms(tutorSearch, undefined, state, tutoringProgramId);
            });
            setIsConfirmationModalOpen(true);
        }
    };

    const handleConfirmAction = () => {
        confirmationAction();
        setIsConfirmationModalOpen(false);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = tutorStudentPrograms.slice(startIndex, endIndex);

    return (
        <div className="flex flex-col">
            <main>
                <div className="mb-4">
                    <h2 className="font-montserrat text-[26px] font-bold text-lg mb-2">
                        Solicitud
                    </h2>
                    <div className="flex space-x-4 mt-4">
                        <div>
                            <Dropdown
                                options={["Todos", ...faculties.map(faculty => faculty.Name)]}
                                onSelect={handleSelectUnidad}
                                defaultOption="Unidad Académica"
                                icon={AcademicUnit}
                            />
                        </div>
                        <div>
                            <Dropdown
                                options={["Todos", "Solicitado", "Asignado", "Rechazado"]}
                                defaultOption="Estado"
                                onSelect={handleSelectState}
                                icon={State}
                            />
                        </div>
                        <div>
                            <Dropdown
                                options={["Todos", ...tutoringPrograms.map(program => program.ProgramName)]}
                                defaultOption="Programa"
                                onSelect={handleSelectPrograma}
                                icon={Program}
                            />
                        </div>
                        <div className="self-end">
                            <Button
                                variant="call-to-action"
                                onClick={handleSearchClick}
                                icon={IconSearch}
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-4 mt-6">
                    <h2 className="font-montserrat text-[26px] font-bold text-lg mb-2">
                        Tutor
                    </h2>
                    <div className="flex space-x-4 mt-4">
                        <SearchInput
                            placeholder="Nombre o apellido del tutor"
                            onSearch={handleTutorSearch}
                        />
                    </div>
                </div>
                <div className="mb-4 mt-8">
                    <h2 className="font-montserrat text-[26px] font-bold text-lg mb-2">
                        Alumno
                    </h2>
                    <div className="flex space-x-8 mt-4">
                        <SearchInput
                            placeholder="Nombre, apellido, o código de alumno"
                            onSearch={handleAlumnoSearch}
                        />
                    </div>
                </div>
                <div className="mb-4 mt-8">
                    <div className="flex justify-between">
                        <h2 className="font-montserrat text-[26px] font-bold text-lg mb-2">
                            Resultado de Solicitudes
                        </h2>
                        <div className="flex justify-end mb-4 space-x-4">
                            <Button variant="accept" text="Aceptar" icon={Accept} onClick={handleAcceptClick} />
                            <Button variant="reject" text="Rechazar" icon={Reject} onClick={handleRejectClick} />
                        </div>
                    </div>
                    <div className="ag-theme-alpine" style={{ height: 300, width: '100%' }}>
                        <AgGridReact
                            columnDefs={columnDefs}
                            rowData={currentData}
                            onGridReady={params => gridApiRef.current = params.api}>
                        </AgGridReact>
                    </div>
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalItems={tutorStudentPrograms.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                />
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
