import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '../../../components';
import DropdownSolicitud from '../../../components/DropdownSolicitud';
import AcademicUnit from '../../../assets/svg/AcademicUnit';
import Program from '../../../assets/svg/Program';
import { useNavigate } from 'react-router-dom';
import { Faculty, Specialty } from '../../../store/types';
import { RootState } from '../../../store/store';
import { useAppSelector } from '../../../store/hooks';

type InputProps = {
    handleOnChangeFilters: (filter: any) => void;
};

export default function SolicitudGestionSearchBar({ handleOnChangeFilters }: InputProps) {
    const navigate = useNavigate();
    const { specialityList, facultyList } = useAppSelector((state: RootState) => state.parameters);

    const [specialitySelected, setSpecialitySelected] = useState<Specialty | null>(null);
    const [facultySelected, setFacultySelected] = useState<Faculty | null>(null);

    const specialityOptions = useMemo(() => {
        if (!facultySelected?.id) {
            return [...specialityList];
        } else {
            return [...specialityList.filter(item => item.facultyId === facultySelected.id)];
        }
    }, [facultySelected, specialityList]);

    const handleOnChangeFaculty = (value: { id: number | string; name: string }) => {
        if ((facultySelected && facultySelected.id !== value.id) || (!facultySelected && specialitySelected?.facultyId !== value.id)) {
            setSpecialitySelected(null);
        }
        setFacultySelected({ id: value.id as number, name: value.name, acronym: "", numberStudents: 0, numberTutors: 0 });
    };

    const handleOnChangeSpeciality = (value: { id: number | string; name: string }) => {
        setSpecialitySelected({ id: value.id as number, name: value.name, acronym: "", numberStudents: 0, facultyId: 0 });
    };

    const filters = useMemo(() => {
        return {
            idSpeciality: specialitySelected?.id,
            idFaculty: facultySelected?.id,
        };
    }, [specialitySelected, facultySelected]);

    useEffect(() => {
        handleOnChangeFilters(filters);
    }, [filters]);

    return (
        <div className='flex w-full h-full flex-row py-5'>
            <form className="w-[70%] max-w-[70%] min-w-[70%] h-full flex flex-row gap-4">
                <DropdownSolicitud
                    options={facultyList.map(faculty => ({ id: faculty.id, name: faculty.name }))}
                    onSelect={handleOnChangeFaculty}
                    defaultOption="Seleccione una Facultad"
                    icon={AcademicUnit}
                    value={facultySelected ? facultySelected.name : "Seleccione una Facultad"}
                />
                <DropdownSolicitud
                    options={specialityOptions.map(speciality => ({ id: speciality.id, name: speciality.name }))}
                    onSelect={handleOnChangeSpeciality}
                    defaultOption="Seleccione una Especialidad"
                    icon={Program}
                    value={specialitySelected ? specialitySelected.name : "Seleccione una Especialidad"}
                />
            </form>
        </div>
    );
}
