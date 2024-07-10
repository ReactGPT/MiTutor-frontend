import React, { useEffect, useMemo, useState } from 'react';
import { Button, Combobox, InputCell } from '../../../components';
import { AddCircleIcon, IconSearch } from '../../../assets';
import { useNavigate } from 'react-router-dom';
import { Faculty, Specialty } from '../../../store/types';
import { RootState } from '../../../store/store';
import { useAppSelector } from '../../../store/hooks';
import { tutoringProgramSlice } from '../../../store/slices';
import { Label } from 'flowbite-react';
import { useAuth } from '../../../context';

type InputProps = {
    handleOnChangeFilters: (filter: any) => void;
};

const ProgramaTutoríaSearchBar = ({ handleOnChangeFilters }: InputProps) => {
    const { userData } = useAuth();
    const navigate = useNavigate();
    const { setTutoringProgramDefault } = tutoringProgramSlice.actions;
    const { specialityList, facultyList } = useAppSelector((state: RootState) => ({
        specialityList: state.parameters.specialityList,
        facultyList: state.parameters.facultyList,
    }));

    const [specialitySelected, setSpecialitySelected] = useState<Specialty | null>(null);
    const [facultySelected, setFacultySelected] = useState<Faculty | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const roles = userData?.userInfo?.roles;
    let selectedFaculties: Faculty[] = [];

    if (roles) {
        const uniqueFacultyIds = new Set<number>();
        roles.forEach(role => {
            if (role.rolName === 'Responsable de Facultad') {
                const facultyId = parseInt((role.details as any).departmentId, 10);
                if (!uniqueFacultyIds.has(facultyId)) {
                    uniqueFacultyIds.add(facultyId);
                    const faculty = facultyList.find(faculty => faculty.id === facultyId);
                    if (faculty) {
                        selectedFaculties.push(faculty);
                    }
                }
            }
        });
    }

    const specialityOptions = useMemo(() => {
        if (!facultySelected?.id) {
            return [];
        } else {
            const filteredOptions = specialityList.filter(item => item.facultyId === facultySelected.id);
            return [{ id: 0, name: 'Todas', facultyId: facultySelected.id }, ...filteredOptions];
        }
    }, [facultySelected, specialityList]);

    const handleOnChangeQuery = (value: string | number) => {
        setSearchQuery(value as string);
    };

    const handleOnChangeFaculty = (value: Faculty) => {
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

    const handleClickNuevaTutoria = () => {
        navigate("/programasDeTutoriaMaestro/nuevo", { state: { programaTutoria: null } });
    };

    return (
        <div className='flex w-full h-full justify-center items-end'>
            <form className="w-[70%] max-w-[70%] min-w-[70%] h-full flex flex-row gap-4">
                <div>
                    <Label value="Buscar" className='font-roboto text-primary' />
                    <span className='flex gap-1'>
                        <InputCell placeholder='Escribe aquí' boxSize='w-[250px] h-[37px] mt-1' text={searchQuery} onChange={{ tipo: "simple", onChange: handleOnChangeQuery }} />
                        {/* <Button onClick={() => { }} icon={IconSearch} iconSize={4} /> */}
                    </span>
                </div>
                <div>
                    <Label value="Facultad" className='font-roboto text-primary' />
                    <Combobox
                        className='w-[250px]'
                        text='Seleccione una Facultad'
                        options={selectedFaculties}
                        onChange={handleOnChangeFaculty}
                        value={facultySelected}
                    />
                </div>
                <div>
                    <Label value="Especialidad" className='font-roboto text-primary' />
                    <Combobox
                        className='w-[300px]'
                        text='Seleccione una especialidad'
                        options={facultySelected ? specialityOptions : []}
                        onChange={setSpecialitySelected}
                        value={specialitySelected}
                    />
                </div>
            </form>
            <div className='flex w-[30%] justify-end'>
                <Button onClick={handleClickNuevaTutoria} text="Nueva Tutoria" icon={AddCircleIcon} />
            </div>
        </div>
    );
};

export default ProgramaTutoríaSearchBar;
