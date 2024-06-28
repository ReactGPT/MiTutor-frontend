import React, { useEffect, useState } from 'react'

import { MultiSelect } from 'primereact/multiselect';
import { useAppSelector } from '../../../store/hooks';
import { RootState } from '../../../store/store';
import { FloatLabel } from 'primereact/floatlabel';
import { Faculty, Specialty, TipoRol } from '../../../store/types';
import { Combobox } from '../../../components';
import { UnitDerivation } from '../../../store/types/UnitDerivation';
import { setFaculties } from '../../../store/slices';
type InputProps={
    isLoading:boolean;
    rolesUsuario:TipoRol[];
    selectedRoles:TipoRol[];
    setSelectedRoles:(roles:TipoRol[])=>void;
    facultySelected:Faculty|null;
    setFacultySelected:(facultad:Faculty|null)=>void;
    specialtySelected:Specialty|null;
    setEspecialtySelected:(especialidad:Specialty|null)=>void;
    derivationUnit:UnitDerivation|null;
    setUnitDerivation:(unidadDerivacion: UnitDerivation|null)=>void;
}

function DatosRol({isLoading,rolesUsuario,selectedRoles,setSelectedRoles,
    facultySelected,setFacultySelected,specialtySelected,setEspecialtySelected,derivationUnit,setUnitDerivation}:InputProps) {
    //const {fetchRoles:fetchRolesUsuario,loading}=useUser();
    const {tiposRollist:tiposRolOptions,facultyList,specialityList,unitDerivationList } = useAppSelector((state: RootState) => state.parameters);
    //const [selectedRoles, setSelectedRoles] = useState<TipoRol[]>([...rolesUsuario]);
    useEffect(()=>{
        setSelectedRoles([...rolesUsuario]);
    },[rolesUsuario]);
    //console.log(selectedCities);
    return (
    <div className='flex w-full h-full flex-row gap-2'>
    <div className='h-full w-[50%] flex flex-col'>
        <div className='flex flex-row justify-between max-h-[45px] w-full h-[30%]'>
            <h2 className='text-xl font-bold text-primary'>Permisos de usuario</h2>
        </div>
        <div className='flex w-full h-full card justify-content-center py-2.5'>
            <FloatLabel>
                <MultiSelect 
                    value={selectedRoles}
                    options={tiposRolOptions} optionLabel="description" 
                    loading={isLoading} 
                    onChange={(e)=>setSelectedRoles(e.value)}
                    placeholder={isLoading?"Cargando...":"Escoja un rol"}
                    maxSelectedLabels={1} 
                    className="w-full md:w-100rem bg-secondary" />
                <label htmlFor=''>Rol</label>
            </FloatLabel>
        </div>
    </div>
    <div className='h-full w-[50%] flex flex-col items-center py-2.5 gap-4'>
        {selectedRoles.map((rol)=>{
            switch(rol.id){
                case 2: //Facultad
                    return <div className='flex flex-row w-full'>
                        <label className='flex w-[40%] h-full text-sm text-primary font-semibold  items-center'>Facultad</label>
                        <Combobox className='w-[60%]' options={facultyList} onChange={(facultad:Faculty)=>{setFacultySelected(facultad)}}/>
                        </div>
                case 3||4: //Especialidad
                    return <div className='flex flex-row w-full'>
                        <label className='flex w-[40%] h-full text-sm text-primary font-semibold  items-center'>Especialidad</label>
                        <Combobox className='w-[60%]' options={specialityList} onChange={(specialty:Specialty)=>{setEspecialtySelected(specialty)}}/>
                        </div>  
                case 11: //Derivacion
                    return <div className='flex flex-row w-full'>
                        <label className='flex w-[40%] h-full  items-center text-sm text-primary font-semibold'>Unidad Derivacion</label>
                        <Combobox className='w-[60%]' options={unitDerivationList} onChange={(derivatioUnit:UnitDerivation)=>{setUnitDerivation(derivatioUnit)}}/>
                        </div> 
            }
        })}
    </div>
    </div>
    
  )
}

export default DatosRol


/**
 * 
UserAccountTypeId	Description	IsActive
1	Administrador	1
2	Responsable de Facultad	1
3	Responsable de Especialidad	1
4	Alumno	1
5	Tutor	1
11	Responsable de Unidad Derivacion	1
 */