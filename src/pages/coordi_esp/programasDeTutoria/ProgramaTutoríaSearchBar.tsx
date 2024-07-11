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
    let selectedEspecialidades: Specialty[] = [];

    if (roles) {
        roles.forEach(role => {
            if (role.rolName === 'Responsable de Especialidad') {
                const facultyId = parseInt((role.details as any).departmentId, 10);
                const speciality = specialityList.find(faculty => faculty.id === facultyId);
                if (speciality && !selectedEspecialidades.some(especialidad => especialidad.id === speciality.id)) {
                    selectedEspecialidades.push(speciality);
                }
            }
        });
        selectedEspecialidades = [{
            id: 0, name: 'Todas las especialidades',
            acronym: '',
            faculty: {
                facultyId: 0, name: '', acronym: '',
                numberOfStudents: 0, numberOfTutors: 0, isActive: false,
                facultyManager: undefined, specialties: null
            }, facultyId: 0
        }, ...selectedEspecialidades];
    }

    const specialityOptions = useMemo(() => {
        if (!facultySelected?.id) {
            return [];
        } else {
            return specialityList.filter(item => item.facultyId === facultySelected.id);
        }
    }, [facultySelected, specialityList]);

    const handleOnChangeQuery = (value: string | number) => {
        setSearchQuery(value as string);
    };

    const handleOnChangeFaculty = (value: Specialty) => {
        if ((specialitySelected && specialitySelected.id !== value.id)) {
            setSpecialitySelected(null);
        }
        setSpecialitySelected(value);
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
        navigate("/programasDeTutoriaMaestroEsp/nuevo", { state: { programaTutoria: null } });
    };

    return (
        <div className='flex w-full h-full justify-center items-end'>
            <form className="w-[70%] max-w-[70%] min-w-[70%] h-full flex flex-row gap-4">
                <div>
                    <Label value="Buscar" className='font-roboto text-primary' />
                    <span className='flex gap-1'>
                        <InputCell placeholder='Escribe aquí' boxSize='w-[250px] h-[37px] mt-1' text={searchQuery} onChange={{ tipo: "simple", onChange: handleOnChangeQuery }} />
                        {/* <Button onClick={() => console.log(filters)} icon={IconSearch} iconSize={4} /> */}
                    </span>
                </div>
                <div>
                    <Label value="Especialidad" className='font-roboto text-primary' />
                    <Combobox
                        className='w-[250px]'
                        text='Seleccione una Facultad'
                        options={selectedEspecialidades}
                        onChange={handleOnChangeFaculty}
                        value={facultySelected}
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
