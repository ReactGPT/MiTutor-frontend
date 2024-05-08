import React, { useEffect, useMemo, useState } from 'react'
//import { Button, Cell, Filters } from '../components'
import { Button, Dropdown } from '../../../components'
import { AddCircleIcon,MagnifyGlassWhite,ArrowDown, MagnifyGlass } from '../../../assets'
import { useNavigate } from 'react-router-dom';
import { Combobox,InputCell } from '../../../components';
import { Faculty, Specialty } from '../../../store/types';


export default function ProgramaTutoríaSearchBar() {
    const navigate=useNavigate();
    const handleClickNuevaTutoria = ()=>{
        navigate("/programasDeTutoriaMaestro/nuevo");
    }

    
    const specialities = [
        {
            id:1,
            name:"Ing.Informatica",
            acronym:"INF",
            numberStudents:153,
            facultyId:1    
        },
        {
            id:2,
            name:"Ing.Industrial",
            acronym:"INF",
            numberStudents:153,
            facultyId:2    
        },
        {
            id:3,
            name:"Ing.Electronica",
            acronym:"INF",
            numberStudents:153,
            facultyId:3    
        },
        {
            id:4,
            name:"Ing.Civil",
            acronym:"INF",
            numberStudents:153,
            facultyId:1    
        },
        {
            id:5,
            name:"Ing.Minas",
            acronym:"INF",
            numberStudents:153,
            facultyId:2    
        },
        {
            id:6,
            name:"Ing.Mecatronica",
            acronym:"INF",
            numberStudents:153,
            facultyId:3    
        },
        {
            id:7,
            name:"Ing.Mecanica",
            acronym:"INF",
            numberStudents:153,
            facultyId:1    
        }

    ]
    const faculties = [
        {
            id:1,
            name:"Ciencias e Ingeniería",
            acronym:"FACI",
            numberStudents:50,
            numberTutors:15
        },
        {
            id:2,
            name:"Generales Ciencias",
            acronym:"EE.GG.CC",
            numberStudents:50,
            numberTutors:15
        },
        {
            id:3,
            name:"Humanidades",
            acronym:"CCHH",
            numberStudents:50,
            numberTutors:15
        },
        
    ]
    /*const [filters,setFilters] = useState({
        idSpeciality : null,
        idFacultty : null,
        name:null
    });*/

    

    const [specialitySelected,setSpecialitySelected]= useState<Specialty|null>(null);
    const [facultySelected,setFacultySelected]= useState<Faculty|null>(null);
    const [searchQuery,setSearchQuery] = useState<string|null>(null);
    
    const specialityOptions = useMemo(()=>{
        if(!facultySelected?.id){
            return [...specialities]
        }
        else return [...specialities.filter(item=>item.facultyId===facultySelected?.id)] 
        //: specialities.map((item)=>item)]
    },[facultySelected]);
    const handleOnChangeQuery = (value:string|number)=>{
        if(typeof value ==='string'){
            setSearchQuery(value);
        }
    };

    const handleOnChangeFaculty = (value:Faculty)=>{
        console.log(specialitySelected?.facultyId);
        if((facultySelected && facultySelected.id!== value.id)||(!facultySelected && specialitySelected?.facultyId!==value.id)){
            setSpecialitySelected(null);
        }
        setFacultySelected(value);
    };

    const filters = useMemo(()=>{
        return {
            idSpeciality: specialitySelected?.id,
            idFaculty: facultySelected?.id,
            name:searchQuery
        }
    },[specialitySelected,facultySelected,searchQuery]);

    const handleOnSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log(filters);
    };

    useEffect(()=>{
        //console.log(filters);

    },[filters]);
    return (
        <div className='flex w-full h-full flex-row py-5'>    
            <form className="w-[70%] max-w-[70%] min-w-[70%] h-full flex flex-row gap-4" onSubmit={handleOnSubmit}>            
            
                <Combobox boxSize='w-[250px] ' text='Seleccione una Facultad' options={faculties} onChange={handleOnChangeFaculty} value={facultySelected}/>
                <Combobox boxSize='w-[300px] ' text='Seleccione una especialidad' options={specialityOptions} onChange={setSpecialitySelected} value={specialitySelected}/>
                <span className='flex gap-1'>
                    <InputCell boxSize='w-[250px] h-[37px]' onChange={{tipo:"simple",onChange : handleOnChangeQuery}} />
                    
                    <Button onClick={()=>console.log(filters)} icon={MagnifyGlass} iconSize={4}/>
                </span>
                </form>
            <div className='flex w-[30%] h-12 justify-end'>
                <Button onClick={handleClickNuevaTutoria} text="Nueva Tutoria" icon={AddCircleIcon}/>
            </div>
        </div>

  )
}

/*
<div className='flex w-full h-full flex-row'>
        <div className='flex flex-row w-[70%] h-full'>
            {<Cell boxSize='p-3'/>
            <Filters onChange={()=>{}} value={{entity_key:"1",entity_value:"Especialidad/Facultad"}} options={[]}/>}
            </div>
            <div>
                <Button onClick={()=>{}} text="Nueva Tutoria" icon={AddCircleIcon}/>
            </div>
            
        </div>


*/
