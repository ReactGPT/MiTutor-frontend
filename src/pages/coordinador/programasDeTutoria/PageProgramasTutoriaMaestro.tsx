import * as React from 'react';
import { useState, useEffect,useMemo } from 'react';
import ProgramaTutoríaSearchBar from './ProgramaTutoríaSearchBar';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';
import CustomProgramaTutoriaGridButton from './CustomProgramaTutoriaGridButton';
import { DetailsIcon } from '../../../assets';
import { useNavigate } from 'react-router-dom';
import { useProgramaTutoria } from '../../../store/hooks';
import { Spinner } from '../../../components';
import { ProgramaTutoria } from '../../../store/types';
//import { useHistory } from 'react-router-dom';
import { useTitle } from '../../../context';


export default function PageProgramasTutoriaMaestro() {
    const {handleSetTitle} = useTitle();
    handleSetTitle("Programas de tutoría");
    const navigate=useNavigate();
    //const history = useHistory();
    const {isLoading,programaTutoriaData,fetchProgramaTutorias} = useProgramaTutoria();
    //const [programaTutoriaFiltered,setProgramaTutoriaFiltered] = useState<ProgramaTutoria[]|null>(null)
    useEffect(()=>{
        //console.log("llamada fetch prog tutoria");
        fetchProgramaTutorias();
    },[]);
    
    const handleNavigation=(data:ProgramaTutoria)=>{
        //console.log(data);
        navigate("/programasDeTutoriaMaestro/editar",{state:{programaTutoria:data}});
    };

    const [filters,setFilters]=useState<any>({
        idSpeciality:null,
        idFaculty:null,
        name:null
    });
    const handleOnChangeFilters = (filter:any)=>{
        setFilters(filter);
    };
    const programaTutoriaFiltered : ProgramaTutoria[]=  useMemo(()=>{
        return [...(programaTutoriaData).filter((item)=>
            item.nombre.toLowerCase().includes(filters.name?filters.name:"")&&(filters.idSpeciality?filters.idSpeciality===item.especialidadId:true)&&(filters.idFaculty?filters.idFaculty===item.facultadId:true)
    )]
    },[programaTutoriaData,filters]);
    
    
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
        
        { headerName: 'Nombre', field: 'nombre', minWidth:150},
        { headerName: 'Facultad', field: 'facultadNombre',minWidth:240 },
        { headerName: 'Especialidad', field: 'especialidadNombre', minWidth:200 },
        {
          headerName: 'Tutores',
          field: 'cant_tutores',
          minWidth:100,maxWidth:100
        },
        {
            headerName: 'Alumnos',
            field: 'cant_alumnos',
            minWidth:100,maxWidth:100
        },
        {
            headerName:'',
            field:'',
            maxWidth:60,
            minWidth:40,
            cellRenderer: (rowData:any)=>{
                return(
                    <CustomProgramaTutoriaGridButton icon={DetailsIcon} iconSize={4} onClick={()=>(handleNavigation(rowData.data))}/>
                )
            }
        }

    ];
    return (
    <div className='flex w-full h-full flex-col space-y-10 mt-10'>
        <div className='flex w-full h-[10%]'>
            <ProgramaTutoríaSearchBar handleOnChangeFilters={handleOnChangeFilters}/>
        </div>
        <div className='flex w-full h-[80%] ag-theme-alpine items-center justify-center'>
            {isLoading?<Spinner size='lg'/>:<div className='w-full h-full'>
                <AgGridReact
                    defaultColDef={defaultColDef}
                    columnDefs={columnDefs}
                    rowData={programaTutoriaFiltered}
                />
            </div>}            
        </div>        
    </div>
  )
}
