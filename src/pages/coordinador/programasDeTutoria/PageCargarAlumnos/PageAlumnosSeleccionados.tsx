import { useState, useEffect } from 'react';
import SearchInput from '../../../../components/SearchInput';
import Button from '../../../../components/Button';
import AddSquareIcon from '../../../../assets/svg/AddSquareIcon';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';
import { SaveIcon } from '../../../../assets';
import { useStudent } from '../../../../store/hooks/useStudent';
//import { useNavigate } from 'react-router-dom';
import { Student } from '../../../../store/types/Student';
import PageCargarMasivamente from './PageCargarMasivamente';
import { useTitle } from '../../../../context';

const profesores = [
  //{ id: 1, nombre: 'Pedro García'},
  { id: 2, nombre: 'Profesor 2'},
  { id: 3, nombre: 'Profesor 3'},
  { id: 4, nombre: 'Profesor 4'},
  { id: 5, nombre: 'Profesor 5'},
  { id: 6, nombre: 'Profesor 6'},
  { id: 7, nombre: 'Profesor 7'},
  { id: 8, nombre: 'Profesor 8'},
  { id: 9, nombre: 'Profesor 9'},
  { id: 10, nombre: 'Profesor 10'},
]
const PageAlumnosSeleccionados = () => {
  //const navigate=useNavigate();
  const {handleSetTitle} = useTitle();
  handleSetTitle("Alumnos Seleccionados");
  const [popoutIsOpen,setPopoutIsOpen]=useState(false);
  //const [rowData, setRowData] = useState<Student[]>([]);
  const [studentDataModified, setStudentDataModified] = useState<Student[]>([]);
  const {studentData, fetchStudentData} = useStudent();
  const [searchValue, setSearchValue] = useState('');

  useEffect(()=>{fetchStudentData(1)},[])
  useEffect(()=>{setStudentDataModified(studentData)},[studentData])
  
  console.log(studentDataModified)
  const handleClickSubirMasivamente = ()=>{
    setPopoutIsOpen(true);
    //navigate("/alumnosSeleccionados/cargarAlumnos");
    //navigate("/alumnosSeleccionados/cargarAlumnos", {state: {setStudentDataModified: setStudentDataModified}});
  }
  
  const handleSearch = (query: string) => {
    setSearchValue(query);
  }

  const handleTutorChange = (studentId: number, tutorId: number) => {
    const updatedStudentData = studentDataModified.map((student) => {
      if (student.studentId === studentId) {
        const selectedTutor = profesores.find((profesor) => profesor.id === tutorId);
        return {
          ...student,
          tutorId: selectedTutor ? selectedTutor.id : 0,
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

  const esFijo = false;
  const columnDefs: ColDef[] = esFijo ? [
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
    { headerName:"Tutor Fijo", field: 'tutorFijo', cellRenderer:(params) => {
        const student = params.data;
        const tutorExistsInProfessors = profesores.some(profesor => profesor.id === student.tutorId);
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
              <option key={profesor.id} value={profesor.id}>
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

  return (
    <div className='w-[full] h-full'>
        <div className='flex w-full gap-5'>
            <div className='w-[65%]'>
                <SearchInput onSearch={handleSearch} handleOnChangeFilters={()=>{}} placeholder=''/>
            </div>
            <div className='w-[35%] flex justify-end gap-4'>
                <Button onClick={handleClickSubirMasivamente} icon={AddSquareIcon} text='Cargar Masivamente' iconSize={25}/>
                <Button onClick={()=>{}} icon={SaveIcon} text='Guardar' iconSize={8}/>
            </div>
        </div>

        <div className='flex w-full h-full flex-col space-y-10 mt-10'>
          <div className='flex w-full h-[75%] ag-theme-alpine ag-theme-alpine2 '>
              <div className='w-full h-full'>
                  <AgGridReact
                      defaultColDef={defaultColDef}
                      columnDefs={columnDefs}
                      rowData={studentDataModified.filter((student)=>student.name.toLowerCase().includes(searchValue.toLowerCase()) || student.pucpCode.toLowerCase().includes(searchValue.toLowerCase()) || student.lastName.toLowerCase().includes(searchValue.toLowerCase()))}
                      //rowData={studentDataModified.filter((student)=>student.name.toLowerCase().includes(searchValue.toLowerCase()))}
                      //rowData={studentData.filter((student)=>student.name.toLowerCase().includes(searchValue.toLowerCase()))}
                  />
              </div>
          </div>
        </div>
    </div>
  )
}

export default PageAlumnosSeleccionados
