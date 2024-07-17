import React, { ChangeEvent, useMemo } from "react";
import { useState, useEffect } from 'react';
import { Button, Combobox } from "../../../components";
import { FaHamburger } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BiMenuAltLeft, BiSearch } from "react-icons/bi";
import NuevaEspecialidad from "./NuevaEspecialidad";
import { AgGridReact } from "ag-grid-react";
import { getEspecialidades } from "../../../store/services";
import { useEspecialidad, useEspecialidadByName } from "../../../store/hooks/useEspecialidad";
import { useAuth } from "../../../context";
import { ColDef } from "ag-grid-community";
import CustomUnidadGridButton from "../../administrador/gestionUnidad/CustomUnidadGridButton";
import { DetailsIcon } from "../../../assets";
import DeleteIcon from "../../../assets/svg/DeleteIcon";
import ModalConfirmation from "../../../components/ModalConfirmation";
import ModalSuccess from "../../../components/ModalSuccess";
import ModalError from "../../../components/ModalError";
import { eliminarEspecialidad } from "../../../store/services/actualizarEspecialidad";
import { Faculty, ManagerRoleDetails, Specialty } from "../../../store/types";
import { Label } from "flowbite-react";
import { getFacultadesFromRoleCoordinador } from "../../../store/hooks/FacultadesRolesIdCoordinador";

type EspecialidadesPageProps = {
  Facultyid?: number;
  disableAgregarEspecialidad?: boolean;
};

const EspecialidadesPage: React.FC<EspecialidadesPageProps> = ({ Facultyid, disableAgregarEspecialidad }) => {
  const { userData } = useAuth();
  const userInfo = userData?.userInfo;
  //
  const facultades: ManagerRoleDetails[] = getFacultadesFromRoleCoordinador(userData);
  //
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const [search, setSearch] = React.useState<string>("");
  const { especialidadData, fetchEspecialidadData } = useEspecialidadByName();

  const [isOpenConfirmation, setIsOpenConfirmation] = useState<boolean>(false);
  const [selectedFacultyId, setSelectedFacultyId] = useState<number | null>(null);
  const [selectedEspecialidadId, setSelectedEspecialidadId] = useState<number | null>(null);
  const [isOpenModalSuccess, setIsOpenModalSuccess] = useState<boolean>(false);
  const [isOpenModalError, setIsOpenModalError] = useState<boolean>(false);

  useEffect(() => {
    fetchEspecialidadData("");
  }, []);

  const columnFac: ColDef[] = [
    { headerName: 'Acrónimo', field: 'acronym', minWidth: 120, maxWidth: 120 },
    { headerName: 'Nombre', field: 'name', minWidth: 240 },
    { headerName: 'Coordinador', valueGetter: p => p.data?.specialtyManager?.persona ? p.data?.specialtyManager?.persona?.name + " " + p.data?.specialtyManager?.persona?.lastName : "No asignado", minWidth: 200 },
    { headerName: 'Email', valueGetter: p => p.data?.specialtyManager?.institutionalEmail ? p.data?.specialtyManager?.institutionalEmail : "No asignado", minWidth: 250 },
    {
      headerName: 'Modificar',
      field: '',
      maxWidth: 100,
      minWidth: 80,
      cellRenderer: (params: { data: (typeof especialidadData)[0]; }) => {
        return (
          <CustomUnidadGridButton
            icon={DetailsIcon}
            iconSize={4}
            onClick={() => {
              if (Facultyid) {
                navigate(`/facultades/editarFacultad/especialidades/editar`, { state: { especialidadEspecifica: params.data } });
                return;
              }
              navigate(`/especialidades/editar`, { state: { especialidadEspecifica: params.data } });
            }}
          />
        );
      }
    },
    {
      headerName: 'Eliminar',
      field: '',
      maxWidth: 100,
      minWidth: 80,
      cellRenderer: (rowData: any) => {
        return (
          <button
            className='text-primary'
            onClick={() => {
              setSelectedEspecialidadId(rowData.data.specialtyId);
              setIsOpenConfirmation(true);
            }}
          >
            <DeleteIcon size={6} />
          </button>
        );
      }
    }
  ];

  const departmentId = useMemo(() => {
    if (Facultyid) {
      console.log("se recibe un faculty id", Facultyid);
      return Facultyid;
    }
    else {
      console.log("No se recibe un id");
      if (selectedFacultyId) {
        console.log("pero no es null");
      } else {
        console.log("pero si es null");
      }
      return selectedFacultyId;
    }
  }, [userInfo, selectedFacultyId]);


  const handleOnConfirmDeleteEspecialidad = async () => {
    if (selectedEspecialidadId !== null) {
      try {
        await eliminarEspecialidad(selectedEspecialidadId);
        setIsOpenModalSuccess(true);
        fetchEspecialidadData(search);
      } catch (error) {
        setIsOpenModalError(true);
      } finally {
        setIsOpenConfirmation(false);
        setSelectedEspecialidadId(null);
      }
    }
  };

  const especialdadesFiltered: Specialty[] = useMemo(() => {
    let filteredData = especialidadData;
    if (Facultyid) {
      filteredData = especialidadData.filter(especialidad => especialidad.faculty.facultyId == Facultyid);
      return filteredData.filter(especialidad =>
        especialidad.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedFacultyId) {
      filteredData = especialidadData.filter(especialidad => especialidad.faculty.facultyId == selectedFacultyId);
      return filteredData.filter(especialidad =>
        especialidad.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    filteredData = especialidadData.filter(especialidad =>
      facultades.some(facultad => Number(facultad.departmentId) === especialidad.faculty.facultyId)
    );
    return filteredData.filter(especialidad =>
      especialidad.name.toLowerCase().includes(search.toLowerCase())
    );

  }, [especialidadData, selectedFacultyId, search]);

  const handleOnChangeFaculty = (value: any) => {
    setSelectedFacultyId(value.id);
    setSearch("");
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <div className="w-full h-full flex flex-col gap-5">
        <div className="flex gap-2 flex-wrap justify-between items-center">
          <div className="flex gap-4 items-center">
            {Facultyid ?
              <h1 className="text-2xl font-bold text-[#2F2F2F]">
                Especialidades
              </h1>
              :
              <div>
                <Label value="Facultad" className='font-roboto text-primary' />
                <Combobox
                  className='w-[250px]'
                  options={facultades.map(facultad => ({
                    id: facultad.departmentId,
                    name: facultad.departmentName,
                    ...facultad
                  }))}
                  onChange={handleOnChangeFaculty}
                  value={null}
                />
              </div>
            }
          </div>
          <Button
            text="Agregar especialidad"
            onClick={() => {
              setIsOpen(true);
            }}
            className="rounded-2xl"
            disabled={disableAgregarEspecialidad || (Facultyid == null && selectedFacultyId == null)}
          />
        </div>
        <div className="border border-terciary shadow-lg rounded-2xl w-full  bg-white flex overflow-clip">
          <input
            type="text"
            placeholder="Buscar especialidad"
            className="grow border-0"
            value={search}
            onChange={handleSearchChange}
            disabled={disableAgregarEspecialidad}
          />
          <button
            className="bg-primary text-white px-4 py-2"
            onClick={() => { }}
            disabled={disableAgregarEspecialidad}
          >
            <BiSearch />
          </button>
        </div>
        <AgGridReact
          rowData={especialdadesFiltered}
          columnDefs={columnFac}
          rowSelection="multiple"
          defaultColDef={{
            suppressHeaderMenuButton: true,
            flex: 1,
            sortable: true,
            resizable: true,
            cellStyle: {
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            },
          }}
          animateRows={true}
          className="ag-theme-alpine w-full h-full"
          pagination={true}
          paginationAutoPageSize
          suppressMovableColumns
        />
      </div >
      <NuevaEspecialidad
        FacultyId={departmentId ? departmentId : 0}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        onConfirm={() => {
          fetchEspecialidadData(search).then(() => {
            console.log("Especialidad creada exitosamente");
            console.log("selectedFacultyId", selectedFacultyId);
            console.log("departmentId", departmentId);
          });
        }}
      />
      <ModalConfirmation isOpen={isOpenConfirmation} message="¿Está seguro de eliminar esta especialidad?"
        onClose={() => {
          setIsOpenConfirmation(false);
        }}
        onConfirm={() => {
          handleOnConfirmDeleteEspecialidad();
          setIsOpenConfirmation(false);
        }}
        isAcceptAction={true}
      />
      <ModalSuccess isOpen={isOpenModalSuccess} message="Se eliminó con éxito"
        onClose={() => {
          setSelectedEspecialidadId(null);
          setIsOpenModalSuccess(false);
          //fetchFacultadData();
        }}
      />
      <ModalError isOpen={isOpenModalError} message='Ocurrió un problema inesperado. Intente nuevamente'
        onClose={() => {
          setSelectedEspecialidadId(null);
          setIsOpenModalError(false);
        }}
      />
    </>
  );
};

export default EspecialidadesPage;
