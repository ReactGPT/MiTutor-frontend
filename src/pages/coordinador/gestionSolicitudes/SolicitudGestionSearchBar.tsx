import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../../../components";
import DropdownSolicitud from "../../../components/DropdownSolicitud";
import AcademicUnit from "../../../assets/svg/AcademicUnit";
import Program from "../../../assets/svg/Program";
import State from "../../../assets/svg/State";
import { useNavigate } from "react-router-dom";
import { Faculty, Specialty, Tutor } from "../../../store/types";
import { RootState } from "../../../store/store";
import { useAppSelector } from "../../../store/hooks";
import SimpleSearchInput from "../../../components/SimpleSearchInput";

type InputProps = {
    handleOnChangeFilters: (filter: any) => void;
};

export default function SolicitudGestionSearchBar({
    handleOnChangeFilters,
}: InputProps) {
    const navigate = useNavigate();
    const { specialityList, facultyList, tutorList } = useAppSelector(
        (state: RootState) => state.parameters
    );

    const [specialitySelected, setSpecialitySelected] =
        useState<Specialty | null>(null);
    const [facultySelected, setFacultySelected] = useState<Faculty | null>(
        null
    );
    const [tutorSearchValue, setTutorSearchValue] = useState<string | null>("");
    const [studentSearchValue, setStudentSearchValue] = useState<string | null>(
        ""
    );
    const [statusSelected, setStatusSelected] = useState<{
        id: number | string;
        name: string;
    } | null>(null);

    const specialityOptions = useMemo(() => {
        if (!facultySelected?.id) {
            return [...specialityList];
        } else {
            return [
                ...specialityList.filter(
                    (item) => item.facultyId === facultySelected.id
                ),
            ];
        }
    }, [facultySelected, specialityList]);

    const handleOnChangeFaculty = (value: {
        id: number | string;
        name: string;
    }) => {
        if (
            (facultySelected && facultySelected.id !== value.id) ||
            (!facultySelected && specialitySelected?.facultyId !== value.id)
        ) {
            setSpecialitySelected(null);
        }
        setFacultySelected({
            id: value.id as number,
            name: value.name,
            acronym: "",
            numberStudents: 0,
            numberTutors: 0,
        });
    };

    /*const handleOnChangeSpeciality = (value: { id: number | string; name: string; }) => {
        setSpecialitySelected({ id: value.id as number, name: value.name, acronym: "", numberStudents: 0, facultyId: 0 });
    };*/

    const handleOnChangeStatus = (value: {
        id: number | string;
        name: string;
    }) => {
        setStatusSelected({ id: value.id as number, name: value.name });
    };

    const handleOnSearchTutor = (query: string) => {
        if (query) {
            setTutorSearchValue(query);
        } else {
            setTutorSearchValue(null);
        }
    };

    const handleOnSearchStudent = (query: string) => {
        if (query) {
            setStudentSearchValue(query);
        } else {
            setStudentSearchValue(null);
        }
    };

    const filters = useMemo(() => {
        return {
            specialty: specialitySelected?.name,
            faculty: facultySelected?.name,
            status: statusSelected?.name,
            tutor: tutorSearchValue,
            student: studentSearchValue,
        };
    }, [
        specialitySelected,
        facultySelected,
        statusSelected,
        tutorSearchValue,
        studentSearchValue,
    ]);

    useEffect(() => {
        handleOnChangeFilters(filters);
    }, [filters]);

    return (
        <div className="flex flex-col w-full h-full gap-1 justify-between">
            <h2 className="font-montserrat text-[26px] font-bold text-lg mb-2 mt-[-6px]">
                Filtros
            </h2>
            <div className="flex w-full h-full flex-row">
                <div className="w-[70%] max-w-[70%] min-w-[70%] h-full flex flex-row gap-4 mb-7">
                    <DropdownSolicitud
                        options={facultyList.map((faculty) => ({
                            id: faculty.id,
                            name: faculty.name,
                        }))}
                        onSelect={handleOnChangeFaculty}
                        defaultOption="Facultad"
                        icon={AcademicUnit}
                        value={
                            facultySelected ? facultySelected.name : "Facultad"
                        }
                    />
                    {/*<DropdownSolicitud
                    options={specialityOptions.map(speciality => ({ id: speciality.id, name: speciality.name }))}
                    onSelect={handleOnChangeSpeciality}
                    defaultOption="Especialidad"
                    icon={Program}
                    value={specialitySelected ? specialitySelected.name : "Especialidad"}
                />*/}
                </div>
            </div>

            <div className="mb-2">
                <h2 className="font-montserrat text-[26px] font-bold text-lg mb-2 mt-[-12px]">
                    Tutor
                </h2>
                <div className="flex space-x-4 mt-2">
                    <SimpleSearchInput
                        placeholder="Nombre o apellido del tutor"
                        value={tutorSearchValue || ""}
                        onChange={(value: string) => setTutorSearchValue(value)}
                        onSearch={handleOnSearchTutor}
                    />
                </div>
            </div>
            <div className="mb-2">
                <h2 className="font-montserrat text-[26px] font-bold text-lg mb-2 mt-4">
                    Alumno
                </h2>
                <div className="flex space-x-8 mt-2">
                    <SimpleSearchInput
                        placeholder="Nombre o apellido del tutor"
                        value={studentSearchValue || ""}
                        onChange={(value: string) =>
                            setStudentSearchValue(value)
                        }
                        onSearch={handleOnSearchStudent}
                    />
                </div>
            </div>
        </div>
    );
}
