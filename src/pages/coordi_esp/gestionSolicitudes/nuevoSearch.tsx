import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../../../components";
import DropdownSolicitud from "../../../components/DropdownSolicitud";
import AcademicUnit from "../../../assets/svg/AcademicUnit";
import Program from "../../../assets/svg/Program";
import State from "../../../assets/svg/State";
import { useNavigate } from "react-router-dom";
import { ManagerRoleDetails, Specialty, Tutor } from "../../../store/types";
import { RootState } from "../../../store/store";
import { useAppSelector } from "../../../store/hooks";
import SimpleSearchInput from "../../../components/SimpleSearchInput";
import { useAuth } from '../../../context';
import { Label } from "flowbite-react";

type InputProps = {
  handleOnChangeFilters: (filter: any) => void;
};

function isManagerRoleDetails(role: any): role is ManagerRoleDetails {
  return 'departmentId' in role;
}

export default function NuevoSearchBar({
  handleOnChangeFilters,
}: InputProps) {
  const { userData } = useAuth();

  const navigate = useNavigate();

  const { specialityList } = useAppSelector((state: RootState) => state.parameters);

  const [specialitySelected, setSpecialitySelected] = useState<Specialty | null>(null);
  const [tutorSearchValue, setTutorSearchValue] = useState<string | null>("");
  const [studentSearchValue, setStudentSearchValue] = useState<string | null>("");
  const [statusSelected, setStatusSelected] = useState<{
    id: number | string;
    name: string;
  } | null>(null);

  const roles = userData?.userInfo?.roles.filter(role => role.type === "SPECIALTYMANAGER").map(role => role.details);
  const selectedSpecialties: Specialty[] = [];

  if (roles) {
    roles.forEach(role => {
      if (isManagerRoleDetails(role)) {
        const specialtyId = parseInt(role.departmentId);
        const specialty = specialityList.find(specialty => specialty.id == specialtyId);
        if (specialty && !selectedSpecialties.some((s) => s.id === specialty.id)) {
          selectedSpecialties.push(specialty);
        }
      }
    });
  }

  console.log(selectedSpecialties);

  const specialtyOptions = useMemo(() => {
    return selectedSpecialties;
  }, [specialityList]);

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
      status: statusSelected?.name,
      tutor: tutorSearchValue,
      student: studentSearchValue,
    };
  }, [
    specialitySelected,
    statusSelected,
    tutorSearchValue,
    studentSearchValue,
  ]);

  useEffect(() => {
    handleOnChangeFilters(filters);
  }, [filters]);

  return (
    <div className="flex flex-col w-full h-full gap-1 justify-between">
      <div className="flex w-full h-full flex-row">
        <div className="min-w-64 h-full flex flex-col">
          <Label value="Especialidad" className='font-roboto text-primary' />
          <DropdownSolicitud
            options={[
              { id: 0, name: "Todos" },
              ...specialtyOptions.map((speciality) => ({
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

      <div className="w-full flex gap-4">

        <div className="w-1/2">
          <Label value="Tutor" className='font-roboto text-primary' />
          <div className="flex space-x-4 mt-2">
            <SimpleSearchInput
              placeholder="Nombre o apellido del tutor"
              value={tutorSearchValue || ""}
              onChange={(value: string) => setTutorSearchValue(value)}
              onSearch={handleOnSearchTutor}
            />
          </div>
        </div>

        <div className="w-1/2">
          <Label value="Alumno" className='font-roboto text-primary' />
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
    </div>
  );
}
