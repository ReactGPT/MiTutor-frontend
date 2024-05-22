import React, { useEffect, useMemo, useState } from 'react'
//import { Button, Cell, Filters } from '../components'
import { Button, Dropdown } from '../../../components'
import { AddCircleIcon,MagnifyGlassWhite,ArrowDown, MagnifyGlass } from '../../../assets'
import { useNavigate } from 'react-router-dom';
import { Combobox,InputCell } from '../../../components';
import { Faculty, Specialty } from '../../../store/types';
import { RootState } from '../../../store/store';
import { useAppSelector } from '../../../store/hooks';
export default function ProgramaTutoríaSearchBar() {
    const navigate=useNavigate();
    const {specialityList,facultyList} = useAppSelector((state:RootState)=>state.parameters)
    const handleClickNuevaTutoria = ()=>{
        //navigate("/programasDeTutoriaMaestro/nuevo");
        navigate("/programasDeTutoriaMaestro/nuevo",{state:{programaTutoria:null}})
    }

    
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
            return [...specialityList]
        }
        else return [...specialityList.filter(item=>item.facultyId===facultySelected?.id)] 
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
        //console.log(filters);
    };

    useEffect(()=>{
        //console.log(filters);

    },[filters]);
    return (
        <div className='flex w-full h-full flex-row py-5'>    
            <form className="w-[70%] max-w-[70%] min-w-[70%] h-full flex flex-row gap-4" onSubmit={handleOnSubmit}>            
            
                <Combobox boxSize='w-[250px] ' text='Seleccione una Facultad' options={facultyList} onChange={handleOnChangeFaculty} value={facultySelected}/>
                <Combobox boxSize='w-[300px] ' text='Seleccione una especialidad' options={specialityOptions} onChange={setSpecialitySelected} value={specialitySelected}/>
                <span className='flex gap-1'>
                    <InputCell boxSize='w-[250px] h-[37px] mt-1' onChange={{tipo:"simple",onChange : handleOnChangeQuery}} />
                    
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
