import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState, useMemo } from 'react';
import { useTutoringProgramContext } from "../../../../context";
import { useStudent } from "../../../../store/hooks";
import { Button, Checkbox, SearchInput, Spinner } from "../../../../components";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';
import { CloseIcon, SaveIcon } from "../../../../assets"; 
import { useAppSelector,useAppDispatch } from "../../../../store/hooks"; 
import { tutoringProgramSlice } from "../../../../store/slices";
import PageCargarMasivamente from './PageCargarMasivamente';
import { Student } from "../../../../store/types";
import IconAdd from "../../../../assets/svg/IconAdd";
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../../../../store/store';
import { Tutor } from '../../../../store/types';

type ModalAlumnosSeleccionadosProps = {
  isOpen: boolean;
  closeModal: () => void;
};

function ModalAlumnosSeleccionados({ isOpen, closeModal }: ModalAlumnosSeleccionadosProps) {
  //const {state} = useLocation();
  //const {tutoringProgram,onChangeTutoringProgram}=state;
  const { tutoringProgramSelected } = useAppSelector((state: RootState) => state.tutoringProgram);
  const navigate=useNavigate();
  const dispatch = useAppDispatch();
  const {handleChangeTutoringProgram} = tutoringProgramSlice.actions;
  //const {handleSetTitle} = useTitle();
  //handleSetTitle("Alumnos Seleccionados");
  const [popoutIsOpen,setPopoutIsOpen]=useState(false);
  //const [rowData, setRowData] = useState<Student[]>([]);
  const [studentDataModified, setStudentDataModified] = useState<Student[]>([]);
  const {studentData, setStudentData, fetchStudentData} = useStudent();
  const [searchValue, setSearchValue] = useState('');
  const profesores : Tutor[] =tutoringProgramSelected.tutores;
  //const esFijo=tutoringProgram;
  
  useEffect(()=>{
    //fetchStudentData(!!tutoringProgramSelected.id?tutoringProgramSelected.id:-1)
    setStudentData(tutoringProgramSelected.alumnos);
    //handleClickSaveAlumnos();
    //console.log("ssss",tutoringProgramSelected.alumnos);
  },[]); 

  useEffect(()=>{
    if(tutoringProgramSelected.alumnos.length<=0){
      dispatch(handleChangeTutoringProgram({ name: 'alumnos', value: studentDataModified }));
    }
  },[studentDataModified]);

  useEffect(()=>{setStudentDataModified(studentData)},[studentData])
  const esFijo:boolean = useMemo(()=>{
    return tutoringProgramSelected.tutorTypeId===2;
  },[tutoringProgramSelected])
  
  const handleClickSubirMasivamente = ()=>{
    setPopoutIsOpen(true);
    //navigate("/alumnosSeleccionados/cargarAlumnos");
    //navigate("/alumnosSeleccionados/cargarAlumnos", {state: {setStudentDataModified: setStudentDataModified}}); 
  }
  
  const handleSearch = (query: string) => {
    setSearchValue(query);
  }
  const handleClickSaveAlumnos= ()=>{
    console.log(studentDataModified);
    console.log("los alumnos:",tutoringProgramSelected.alumnos);
    dispatch(handleChangeTutoringProgram({name:'alumnos',value:[...studentDataModified]}));
    if(!!tutoringProgramSelected.id){
      navigate("/programasDeTutoriaMaestro/editar",{
        state:{programaTutoria:{...tutoringProgramSelected,
        'alumnos' : [...studentDataModified],
        'cant_alumnos': studentDataModified.length
      }}});
    }
    else{
      navigate("/programasDeTutoriaMaestro/nuevo",{
        state:{programaTutoria:{...tutoringProgramSelected,
        'alumnos' : [...studentDataModified],
        'cant_alumnos':studentDataModified.length
      }}});
    }
    //navigate();
  }


  const handleTutorChange = (studentId: number, tutorId: number) => {
    const updatedStudentData = studentDataModified.map((student) => {
      if (student.studentId === studentId) {
        const selectedTutor = profesores.find((profesor) => profesor.idTutor === tutorId);
        return {
          ...student,
          tutorId: selectedTutor ? selectedTutor.idTutor : 0,
          tutorName: selectedTutor ? selectedTutor.nombre : '',
        };
      }
      return student;
    });
    setStudentDataModified(updatedStudentData);
  };

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

  
  const columnDefs: ColDef[] = !esFijo ? [
    { headerName: 'Código', field: 'pucpCode', maxWidth: 150 },
    { headerName: 'Nombres', field: 'name'},
    { headerName: 'Apellidos', field: 'lastName' },
    { headerName: 'Correos', field: 'institutionalEmail' },
    { headerName: 'Facultades', field: 'facultyName' }
  ] : 
  [
    { headerName: 'Código', field: 'pucpCode', maxWidth: 100 },
    { headerName: 'Nombres', field: 'name', maxWidth: 120},
    { headerName: 'Apellidos', field: 'lastName', maxWidth: 150},
    { headerName: 'Correos', field: 'institutionalEmail' },
    { headerName: 'Facultades', field: 'facultyName' },
    { headerName:"Tutor Fijo", field: 'tutorFijo', cellRenderer:(params:any) => {
        const student = params.data;
        const tutorExistsInProfessors = profesores.some(profesor => profesor.idTutor === student.tutorId);
        return (
          <select className='w-full h-full bg-white border border-gray-300 rounded-md px-2 py-1'
            defaultValue={student.tutorId || ''}
            onChange={(e) => handleTutorChange(student.studentId, parseInt(e.target.value))}
          >
            <option value="">Sin Tutor</option>
            {!tutorExistsInProfessors && student.tutorId !== 0 && (
              <option value={student.tutorId}>{student.tutorName}</option>
            )}
            {profesores.map((profesor) => (
              <option key={profesor.idTutor} value={profesor.idTutor}>
                {profesor.nombre}
              </option>
            ))}
          </select>
        );
      }
    },
  ];

  if(popoutIsOpen){
    return <PageCargarMasivamente setPopout={setPopoutIsOpen} setStudentDataModified={setStudentDataModified} />
  }

  const [currentView, setCurrentView] = useState<'select' | 'upload'>('select'); // Añadir estado de vista

  return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75" />
          </Transition.Child>
  
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="max-w-screen-xl w-1/3 min-h-[50%] w-[50%] h-full max-h-[60%] bg-white transform rounded-2xl p-6 shadow-xl transition-all">
                  <Dialog.Title as="div" className="flex flex-row h-[10%] max-h-[80px] items-center ml-2 mr-2 justify-begin">
                    <h3 className='text-2xl font-bold w-full justify-begin text-primary font-large leading-6 text-gray-900'>{`Seleccionar Alumnos`}</h3>
                  </Dialog.Title>
  
                  {/* Cambia la vista aquí */}
                  {currentView === 'select' ? (
                    <div className="flex flex-col w-full min-h-[450px] ml-2 mr-2 mt-4 flex flex-col gap-4">
                      <div className="flex w-full h-[30%]">
                        <SearchInput selectDisabled={true} placeholder="Escriba nombre o correo" handleOnChangeFilters={() => { }} onSearch={handleSearch} />
                      </div>
                      <div className="flex flex-row mt-4">
                        <h4 className='text-2xl font-bold w-full justify-begin text-primary font-large leading-6 text-gray-900'>{`Alumnos seleccionados : ${studentDataModified.length}`}</h4>
                      </div>
                      <div className='w-[100%] h-[50%]'>
                        <div className="flex align-center flex-col w-[100%] max-h-[600px] h-[400px] min-h-[300px]">
                          <div className="ag-theme-alpine items-center p-10 w-full h-full">
                            <AgGridReact
                              defaultColDef={defaultColDef}
                              columnDefs={columnDefs}
                              rowData={studentDataModified.filter((student)=>student.name.toLowerCase().includes(searchValue.toLowerCase()) || student.pucpCode.toLowerCase().includes(searchValue.toLowerCase()) || student.lastName.toLowerCase().includes(searchValue.toLowerCase()))}
                      
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row h-[80px] w-full items-center justify-center gap-[100px]">
                        <Button onClick={handleClickSubirMasivamente} icon={IconAdd} text="Cargar Masivamente" />
                        <Button onClick={handleClickSaveAlumnos} disabled={studentDataModified.length === 0} text="Guardar" icon={SaveIcon} />
                        <Button onClick={closeModal} text="Cancelar" icon={CloseIcon} variant="primario" iconSize={4} />
                      </div>
                    </div>
                  ) : (
                    <PageCargarMasivamente setPopout={setPopoutIsOpen} setStudentDataModified={setStudentData} />
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  );
}

export default ModalAlumnosSeleccionados;
