import React, { useEffect, useMemo, useState } from 'react';
//import { Button, Cell, Filters } from '../components'
import { Button, Dropdown } from '../../../components';
import { AddCircleIcon, MagnifyGlassWhite, ArrowDown, MagnifyGlass, IconSearch } from '../../../assets';
import { useNavigate } from 'react-router-dom';
import { Combobox, InputCell } from '../../../components';
import { Faculty, Specialty } from '../../../store/types';
import { RootState } from '../../../store/store';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { tutoringProgramSlice } from '../../../store/slices';
import { Label } from 'flowbite-react';

type InputProps = {
    handleOnChangeFilters: (filter: any) => void;
};


export default function ProgramaTutoríaSearchBar({ handleOnChangeFilters }: InputProps) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { setTutoringProgramDefault } = tutoringProgramSlice.actions;
    const { specialityList, facultyList } = useAppSelector((state: RootState) => state.parameters);
    const handleClickNuevaTutoria = () => {
        //navigate("/programasDeTutoriaMaestro/nuevo");
        //dispatch(setTutoringProgramDefault());
        navigate("/programasDeTutoriaMaestro/nuevo", { state: { programaTutoria: null } });
    };


    /*const [filters,setFilters] = useState({
        idSpeciality : null,
        idFacultty : null,
        name:null
    });*/



    const [specialitySelected, setSpecialitySelected] = useState<Specialty | null>(null);
    const [facultySelected, setFacultySelected] = useState<Faculty | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const specialityOptions = useMemo(() => {
        if (!facultySelected?.id) {
            return [...specialityList];
        }
        else return [...specialityList.filter(item => item.facultyId === facultySelected?.id)];
        //: specialities.map((item)=>item)]
    }, [facultySelected]);
    const handleOnChangeQuery = (value: string | number) => {
        if (typeof value === 'string') {
            //console.log("Se cambia query");
            //console.log(value);
            setSearchQuery(value);
        }
    };

    const handleOnChangeFaculty = (value: Faculty) => {
        console.log(specialitySelected?.facultyId);
        if ((facultySelected && facultySelected.id !== value.id) || (!facultySelected && specialitySelected?.facultyId !== value.id)) {
            setSpecialitySelected(null);
        }
        setFacultySelected(value);
    };

    const filters = useMemo(() => {
        return {
            idSpeciality: specialitySelected?.id,
            idFaculty: facultySelected?.id,
            name: searchQuery
        };
    }, [specialitySelected, facultySelected, searchQuery]);

    useEffect(() => {
        handleOnChangeFilters(filters);
    }, [filters]);

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //console.log(filters);
    };

    // useEffect(()=>{
    //     //console.log(filters);

    // },[filters]);
    return (
        <div className='flex w-full h-full justify-center items-end'>
            <form className="w-[70%] max-w-[70%] min-w-[70%] h-full flex flex-row gap-4" onSubmit={handleOnSubmit}>
                <div>
                    <Label value="Buscar" className='font-roboto text-primary' />
                    <span className='flex gap-1'>
                        <InputCell placeholder='Escribe aquí' boxSize='w-[250px] h-[37px] mt-1' text={searchQuery} onChange={{ tipo: "simple", onChange: handleOnChangeQuery }} />
                        <Button onClick={() => console.log(filters)} icon={IconSearch} iconSize={4} />
                    </span>
                </div>
                <div>
                    <Label value="Facultad" className='font-roboto text-primary' />
                    <Combobox className='w-[250px] ' text='Seleccione una Facultad' options={facultyList} onChange={handleOnChangeFaculty} value={facultySelected} />
                </div>
                <div>
                    <Label value="Especialidad" className='font-roboto text-primary' />
                    <Combobox className='w-[300px] ' text='Seleccione una especialidad' options={specialityOptions} onChange={setSpecialitySelected} value={specialitySelected} />
                </div>
            </form>
            <div className='flex w-[30%] justify-end'>
                <Button onClick={handleClickNuevaTutoria} text="Nueva Tutoria" icon={AddCircleIcon} />
            </div>
        </div>
    );
}