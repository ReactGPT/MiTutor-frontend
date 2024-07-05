import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../../../components";
import DropdownSolicitud from "../../../components/DropdownSolicitud";
import AcademicUnit from "../../../assets/svg/AcademicUnit";
import Program from "../../../assets/svg/Program";
import State from "../../../assets/svg/State";
import { useNavigate } from "react-router-dom";
import { Faculty, ManagerRoleDetails, Specialty, SpecialtyManager, Tutor } from "../../../store/types";
import { RootState } from "../../../store/store";
import { useAppSelector } from "../../../store/hooks";
import SimpleSearchInput from "../../../components/SimpleSearchInput";
import { useAuth } from '../../../context';

type InputProps = {
  handleOnChangeFilters: (filter: any) => void;
  onRolEspecificoChange: (rol: string) => void;   
};

export default function NuevoSearchBar({
  handleOnChangeFilters,
  onRolEspecificoChange,
}: InputProps) {
  const { userData } = useAuth();
  const navigate = useNavigate();

  const { facultyList, tutorList, specialityList } = useAppSelector((state: RootState) => state.parameters);

  const [specialitySelected, setSpecialitySelected] = useState<Specialty | null>(null);
  const [facultySelected, setFacultySelected] = useState<Faculty | null>(null);
  const [tutorSearchValue, setTutorSearchValue] = useState<string | null>("");
  const [studentSearchValue, setStudentSearchValue] = useState<string | null>("");
  const [statusSelected, setStatusSelected] = useState<{
    id: number | string;
    name: string;
  } | null>(null);

  let selectedFaculties: Faculty[] = [];
  const roles = userData?.userInfo?.roles;
  let rolEspecifico = '';

  if (roles) {
    roles.forEach(role => {
      if (role.rolName === 'Responsable de Facultad') {
        
        const facultyId = parseInt((role.details as ManagerRoleDetails).departmentId, 10); // Convertir a número
        console.log("soyyy",facultyId);
        const faculty = facultyList.find(faculty => faculty.id === facultyId);
        
        if (faculty) {
          selectedFaculties.push(faculty);
        }
      }
    });
  }

  onRolEspecificoChange(rolEspecifico);

  const specialityOptions = useMemo(() => {
    if (!facultySelected?.id) {
      return [];
    } else {
      return [
        ...specialityList.filter(
          (item) => item.facultyId === facultySelected.id
        ),
      ];
    }
  }, [facultySelected, specialityList]);

  const handleOnChangeSpeciality = (value: { id: number | string; name: string; }) => {
    const selectedSpeciality = specialityList.find(speciality => speciality.id === value.id);
    setSpecialitySelected(selectedSpeciality || null);
  };

  const handleOnChangeStatus = (value: { id: number | string; name: string; }) => {
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
    console.log("facultyList ", facultyList);
    console.log("facultyListSeleccionadas:", selectedFaculties);
  }, [filters]);

  return (
    <div className="flex flex-col w-full h-full gap-1 justify-between">
      <h2 className="font-montserrat text-[26px] font-bold text-lg mb-2 mt-[-6px]">
        Filtros
      </h2>
      <div className="flex w-full h-full flex-row">
        <div className="w-[70%] max-w-[70%] min-w-[70%] h-full flex flex-row gap-4 mb-7">
          <DropdownSolicitud
            options={selectedFaculties.map(faculty => ({
              id: faculty.id,
              name: faculty.name,
            }))}
            onSelect={(option) => {
              const selectedFaculty = selectedFaculties.find(faculty => faculty.id === option.id);
              setFacultySelected(selectedFaculty || null);
            }}
            value={facultySelected ? facultySelected.name : "Facultad"}
          />
          <DropdownSolicitud
            options={[
              { id: 0, name: "Todos" },
              ...specialityOptions.map((speciality) => ({
                id: speciality.id,
                name: speciality.name,
              })),
            ]}
            onSelect={handleOnChangeSpeciality}
            defaultOption="Especialidad"
            icon={Program}
            value={specialitySelected ? specialitySelected.name : "Especialidad"}
          />
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
            onChange={(value: string) => setStudentSearchValue(value)}
            onSearch={handleOnSearchStudent}
          />
        </div>
      </div>
    </div>
  );
}
