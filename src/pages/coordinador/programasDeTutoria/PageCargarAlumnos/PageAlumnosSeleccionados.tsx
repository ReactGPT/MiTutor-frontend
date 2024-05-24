import { useEffect } from 'react';
import SearchInput from '../../../../components/SearchInput';
import Button from '../../../../components/Button';
import AddSquareIcon from '../../../../assets/svg/AddSquareIcon';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';
import { SaveIcon } from '../../../../assets';
import { useStudent } from '../../../../store/hooks/useStudent';
import { useNavigate } from 'react-router-dom';


const PageAlumnosSeleccionados = () => {
  const navigate=useNavigate();
  //const [rowData, setRowData] = useState<Student[]>([]);
  
  const {studentData, fetchStudentData} = useStudent();

  useEffect(()=>{fetchStudentData(1)},[])

  const handleClickSubirMasivamente = ()=>{
    navigate("/alumnosSeleccionados/cargarAlumnos");
  }

  console.log(studentData)
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
    { headerName: 'Código', field: 'pucpCode', maxWidth: 150 },
    { headerName: 'Nombres', field: 'name' },
    { headerName: 'Apellidos', field: 'lastName' },
    { headerName: 'Correos', field: 'institutionalEmail' },
    { headerName: 'Facultades', field: 'facultyName' }
  ];

  return (
    <div className='w-full'>
        <div className='flex w-full gap-5'>
            <div className='w-[65%]'>
                <SearchInput onSearch={()=>{}} placeholder=''/>
            </div>
            <div className='w-[35%] flex justify-end gap-4'>
                <Button onClick={handleClickSubirMasivamente} icon={AddSquareIcon} text='Cargar Masivamente' iconSize={25}/>
                <Button onClick={()=>{}} icon={SaveIcon} text='Guardar' iconSize={8}/>
            </div>
        </div>

        <div className='h-full mt-10'>
          <div className='flex w-full h-[75%] ag-theme-alpine ag-theme-alpine2 '>
              <div className='w-full h-full'>
                  <AgGridReact
                      defaultColDef={defaultColDef}
                      columnDefs={columnDefs}
                      rowData={studentData}
                  />
              </div>
          </div>
        </div>
    </div>
  )
}

export default PageAlumnosSeleccionados
