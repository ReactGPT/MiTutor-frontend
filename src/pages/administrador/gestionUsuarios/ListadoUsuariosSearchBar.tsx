import React, { useEffect, useMemo, useState } from 'react'
//import { Button, Cell, Filters } from '../components'
import { Button, Dropdown } from '../../../components'
import { AddCircleIcon, UserPlus, ArrowDown, ArrowDownload,ArrowUpload, AddIcon } from '../../../assets'
import { useNavigate } from 'react-router-dom';
import { Combobox, InputCell } from '../../../components';
import { Faculty, Specialty } from '../../../store/types';
import { RootState } from '../../../store/store';
import { useAppSelector } from '../../../store/hooks';


type InputProps = {
  handleOnChangeFilters: (filter: any) => void;
}

export default function ListadoUsuariosSearchBar({ handleOnChangeFilters }: InputProps) {
  const navigate = useNavigate();
  const { specialityList, facultyList } = useAppSelector((state: RootState) => state.parameters)
  const handleClickNuevoUsuario = () => {
    navigate("/usuarios/nuevo", { state: { userData: null } })
  }

  return (
    <div className='flex w-full h-full flex-row py-0'>
      <div className='flex w-full h-12 justify-end space-x-4'>
        <Button onClick={handleClickNuevoUsuario} text="Agregar Usuario" icon={UserPlus} />
        <Button onClick={handleClickNuevoUsuario} text="Importar" variant='primario' icon={ArrowUpload} />
        <Button onClick={handleClickNuevoUsuario} text="Descargar" variant='secundario' icon={ArrowDownload} />
      </div>
    </div>

  )
}

/*
<form className="w-[70%] max-w-[70%] min-w-[70%] h-full flex flex-row gap-4" onSubmit={handleOnSubmit}>

        <Combobox className='w-[250px] ' text='Seleccione una Facultad' options={facultyList} onChange={handleOnChangeFaculty} value={facultySelected} />
        <Combobox className='w-[300px] ' text='Seleccione una especialidad' options={specialityOptions} onChange={setSpecialitySelected} value={specialitySelected} />
        <span className='flex gap-1'>
          <InputCell boxSize='w-[250px] h-[37px] mt-1' text={searchQuery} onChange={{ tipo: "simple", onChange: handleOnChangeQuery }} />

          <Button onClick={() => console.log(filters)} icon={MagnifyGlass} iconSize={4} />
        </span>
      </form>


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
