import React, { useState, ChangeEvent, useEffect } from 'react';
import { Datepicker, Label, Radio, TextInput, Textarea } from 'flowbite-react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, SelectionChangedEvent } from 'ag-grid-community';
import Button from '../Button';
import ModalBase from './ModalBase';
import Select from 'react-dropdown-select';
import { SaveIcon } from '../../assets';
import { SlotInfo } from 'react-big-calendar';
import { useAuth } from '../../context';
import { TutorRoleDetails } from '../../store/types';
import { useProgramaDeTutoria } from '../../store/hooks/useProgramaDeTutoria';
import { ListTutoringProgram } from '../../store/types/ListTutoringProgram';
import { ListStudent } from '../../store/types/ListStudent';
import axios from 'axios';
import { Services as ServicesProperties } from '../../config';
import { useNavigate } from 'react-router-dom';
import { useAppointment } from '../../store/hooks/useAppointment';
import ModalSuccess from '../ModalSuccess';
import ModalError from '../ModalError';
import ModalWarning from '../ModalWarning';


type MakeAppointment = {
  startTime: string;
  endTime: string;
  creationDate: string;
  reason: string;
  isInPerson: boolean;
  classroom: string;
};

type SelectOption = {
  key: string;
  text: string;
  value: string;
  data: any;
};

function convertToSelectOptions(programs: ListTutoringProgram[]): SelectOption[] {
  return programs.map(program => ({
    key: program.tutoringProgramId.toString(),
    text: program.programName,
    value: program.tutoringProgramId.toString(),
    data: program
  }));
}

interface ProgramarCitaTutorProps {
  isOpen: boolean;
  onClose: () => void;
  slotInfo: SlotInfo | null;
  refreshCalendar: () => void;
}

const ModalProgramarCitaTutor: React.FC<ProgramarCitaTutorProps> = ({ isOpen, onClose, slotInfo, refreshCalendar }) => {
  const { userData } = useAuth();
  const tutorId = (userData?.userInfo?.roles[0].details as TutorRoleDetails).tutorId;
  //
  const initialAppointmentState: MakeAppointment = {
    startTime: "",
    endTime: "",
    creationDate: "",
    reason: "",
    isInPerson: false,
    classroom: "",
  };
  //
  const [appointment, setAppointment] = useState<MakeAppointment>(initialAppointmentState);
  //
  const resetAppointment = () => {
    setAppointment(initialAppointmentState);
  };

  //
  const { programaTutoria, loading: fetchLoading, fetchProgramaDeTutoria } = useProgramaDeTutoria(tutorId);
  useEffect(() => {
    fetchProgramaDeTutoria();
  }, []);
  //
  useEffect(() => {
    if (slotInfo) {
      setAppointment((prevAppointment) => ({
        ...prevAppointment,
        startTime: slotInfo?.start.toTimeString().split(' ')[0] || '',
        endTime: slotInfo?.end.toTimeString().split(' ')[0] || '',
        creationDate: slotInfo?.start.toLocaleDateString() || '',
      }));
    }
  }, [slotInfo]);
  //
  const { addNewAppointment, loading: appointmentLoading, error } = useAppointment();
  //
  const [selectedProgram, setSelectedProgram] = useState<SelectOption | null>(null);
  const [selectedRows, setSelectedRows] = useState<ListStudent[]>([]);


  const handleOnTutoringProgramChange = (selected: SelectOption[]) => {
    setSelectedProgram(selected[0] || null);
  };
  //Manejar la modalidad
  const [showClassroom, setShowClassroom] = useState(false);
  const handleRadioModalidadChange = (event: ChangeEvent<HTMLInputElement>) => {
    const isInPerson = event.target.value === "presencial";
    setShowClassroom(isInPerson);
    console.log(isInPerson);
    setAppointment((prevAppointment) => ({
      ...prevAppointment,
      isInPerson,
      classroom: isInPerson ? prevAppointment.classroom : "" // Clear classroom if not in person
    }));
  };
  //Handle Close
  const handleClose = () => {
    resetAppointment();
    setSelectedProgram(null);
    setShowClassroom(false);
    onClose();
  };
  //
  //
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState<string>("");
  const handleOpenSuccessModal = () => {
    setIsSuccessModalOpen(true);
  };
  const handleOpenErrorModal = () => {
    setIsErrorModalOpen(true);
  };
  const handleOpenWarningModal = () => {
    setIsWarningModalOpen(true);
  };
  //
  //
  //Handle Guardar
  const handleGuardar = async () => {
    if (!selectedProgram) {
      setWarningMessage("Por favor, seleccione un programa de tutoría.");
      handleOpenWarningModal();
      return;
    }

    if (!appointment.reason) {
      setWarningMessage("Por favor, ingrese el motivo de la cita.");
      handleOpenWarningModal();
      return;
    }

    if (appointment.isInPerson && !appointment.classroom) {
      setWarningMessage("Por favor, ingrese el salón para la cita presencial.");
      handleOpenWarningModal();
      return;
    }

    if (selectedRows.length === 0) {
      setWarningMessage("Por favor, seleccione al menos un alumno.");
      handleOpenWarningModal();
      return;
    }

    const studentIds = selectedRows.map(student => student.studentId);
    try {
      /* console.log({
        appointment,
        idProgramTutoring: Number(selectedProgram?.value),
        idTutor: tutorId,
        idStudent: studentIds,
      }); */
      await addNewAppointment({
        appointment,
        idProgramTutoring: Number(selectedProgram?.value),
        idTutor: tutorId,
        idStudent: studentIds,
      });
      resetAppointment();
      setSelectedProgram(null);
      setShowClassroom(false);
      refreshCalendar();
      onClose();
      handleOpenSuccessModal();
    } catch (error) {
      resetAppointment();
      setSelectedProgram(null);
      setShowClassroom(false);
      onClose();
      handleOpenErrorModal();
    }
  };

  return (
    <>
      {fetchLoading ||
        <ModalBase isOpen={isOpen} onClose={() => { }}>
          <div className="flex flex-col w-[990px] h-[560px] gap-5">
            <div className='flex w-full h-[11%] items-center justify-between px-3 shadow-custom border-custom bg-[rgba(255,255,255,0.50)]'>
              <h3 className="text-4xl font-semibold font-roboto text-gray-900 ">
                Programar cita
              </h3>
              <div className="flex gap-5 items-center justify-center">
                <Button text="Guardar" onClick={handleGuardar} icon={SaveIcon} />
                <Button text="Cancelar" variant="warning" onClick={handleClose} />
              </div>
            </div>
            <div className="w-full flex-1 flex gap-5">
              <div className="w-fit shadow-custom border-custom bg-[rgba(255,255,255,0.50)] p-4">
                <label className="text-2xl font-semibold font-roboto text-gray-900">
                  Datos
                </label>

                <div className="block">
                  <Label value="Fecha" className='font-roboto text-primary' />
                </div>
                <Datepicker value={slotInfo?.start.toLocaleDateString() || ''} disabled />

                <div className='flex w-full gap-3'>

                  <div className='flex-1'>
                    <div className="block">
                      <Label value="Inicio" className='font-roboto text-primary' />
                    </div>
                    <TextInput type="time" value={slotInfo?.start.toTimeString().split(' ')[0] || ''} disabled />
                  </div>

                  <div className='flex-1'>
                    <div className="block">
                      <Label value="Fin" className='font-roboto text-primary' />
                    </div>
                    <TextInput type="time" value={slotInfo?.end.toTimeString().split(' ')[0] || ''} disabled />
                  </div>

                </div>

                {/* Dropdown Programas de Tutoria */}

                <Label value="Tutoría" className='font-roboto text-primary' />

                <Select
                  labelField='text'
                  valueField='text'
                  options={
                    convertToSelectOptions(programaTutoria)
                  }
                  values={[]}
                  onChange={handleOnTutoringProgramChange}
                  placeholder="Selecciona Programa de Tutoría"
                  searchable={false}
                  className="bg-white text-sm"
                />
                {/* Motivo de Cita */}
                <div className="block">
                  <Label value="Motivo de cita" className='font-roboto text-primary' />
                </div>
                <Textarea className="max-h-[105px] min-h-[50px]" onChange={(e) => setAppointment({ ...appointment, reason: e.target.value })} disabled={selectedProgram == null} />

                {/* Modalidad */}
                <div className="block">
                  <Label value="Modalidad" className='font-roboto text-primary' />
                </div>

                <div className="flex items-center gap-2">
                  <Radio disabled={selectedProgram == null} id="virtual" name="modalidad" value="virtual" defaultChecked onChange={handleRadioModalidadChange} />
                  <Label htmlFor="virtual" className="font-roboto" disabled={selectedProgram == null}>Virtual</Label>
                </div>

                <div className="flex items-center gap-2">
                  <Radio disabled={selectedProgram == null} id="presencial" name="modalidad" value="presencial" onChange={handleRadioModalidadChange} />
                  <Label htmlFor="presencial" className="font-roboto" disabled={selectedProgram == null}>Presencial</Label>
                </div>

                {/* Salón */}
                {showClassroom && (
                  <>
                    <div className="block">
                      <Label value="Aula" className='font-roboto text-primary' />
                    </div>
                    <TextInput type="text" value={appointment.classroom} onChange={(e) => setAppointment({ ...appointment, classroom: e.target.value })} />
                  </>
                )}
              </div>
              <div className="flex-1 shadow-custom border-custom bg-[rgba(255,255,255,0.50)] p-4 flex flex-col gap-2">
                <label className="text-2xl font-semibold font-roboto text-gray-900">
                  Participantes
                </label>

                {/* Tabla */}
                {selectedProgram == null ?
                  <label>Selecciona una tutoria...</label>
                  :
                  <TablaAlumnos
                    tutoringProgramId={Number(selectedProgram?.value)}
                    selectedRows={selectedRows} // Pasar selectedRows como prop
                    setSelectedRows={setSelectedRows} // Pasar setSelectedRows como prop
                  />
                }

              </div>
            </div>
          </div>
        </ModalBase >
      }
      <ModalSuccess
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        message="Se registró la cita exitosamente."
      />
      <ModalError
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        message="Ha ocurrido un error."
      />
      <ModalWarning
        isOpen={isWarningModalOpen}
        onClose={() => setIsWarningModalOpen(false)}
        message={warningMessage}
      />
    </>
  );
};

export default ModalProgramarCitaTutor;

type TablaAlumnosProps = {
  tutoringProgramId: number;
  selectedRows: ListStudent[]; // Prop para almacenar los rows seleccionados
  setSelectedRows: React.Dispatch<React.SetStateAction<ListStudent[]>>; // Setter para actualizar selectedRows
  onclick?: () => void;
};

const TablaAlumnos: React.FC<TablaAlumnosProps> = ({
  tutoringProgramId,
  selectedRows,
  setSelectedRows,
}) => {

  const [estudiantes, setEstudiantes] = useState<ListStudent[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${ServicesProperties.BaseUrl}/listarEstudiantesPorProgramaDeTutoria/${tutoringProgramId}`);
        setEstudiantes(response.data.data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, [tutoringProgramId]);

  const defaultColDef = {
    suppressHeaderMenuButton: false,
    flex: 1,
    sortable: false,
    resizable: false,
    suppressMovable: true,
    cellStyle: {
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
    },
  };

  const columnDefs: ColDef[] = [
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
      headerName: '',
      field: 'checkbox',
      minWidth: 50,
      maxWidth: 50,
    },
    {
      headerName: 'Código',
      field: 'pucpCode',
      minWidth: 100,
      maxWidth: 100,
      cellStyle: { textAlign: 'left', justifyContent: 'left' }
    },
    {
      headerName: 'Nombre Completo',
      valueGetter: (params) => `${params.data.name} ${params.data.lastName} ${params.data.secondLastName}`,
      minWidth: 200,
      maxWidth: 300,
      cellStyle: { textAlign: 'left', justifyContent: 'left' }
    },
    {
      headerName: 'Facultad',
      field: 'facultyName',
      minWidth: 100,
      maxWidth: 300,
      cellStyle: { textAlign: 'left', justifyContent: 'left' }
    },
    {
      headerName: 'Especialidad',
      field: 'specialtyName',
      minWidth: 100,
      maxWidth: 300,
      cellStyle: { textAlign: 'left', justifyContent: 'left' }
    },
  ];

  const onSelectionChanged = (event: SelectionChangedEvent) => {
    setSelectedRows(event.api.getSelectedRows());
  };

  return (
    <div className="w-full h-full">
      <div className="ag-theme-alpine w-full h-full" >
        <AgGridReact
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}
          rowData={estudiantes}
          rowHeight={60}
          rowSelection='multiple'
          onSelectionChanged={onSelectionChanged}
        />
      </div>
    </div>
  );
};