import React, { useMemo } from "react";
import { useState, useEffect } from 'react';
import { Button } from "../../../components";
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

type EspecialidadesPageProps = {
  Facultyid?: number;
  disableAgregarEspecialidad?: boolean;
};

const EspecialidadesPage: React.FC<EspecialidadesPageProps> = ({ Facultyid, disableAgregarEspecialidad }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const [search, setSearch] = React.useState<string>("");
  const { especialidadData, fetchEspecialidadData } = useEspecialidadByName();

  useEffect(() => {
    fetchEspecialidadData(search);
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

  const { userData } = useAuth();
  const userInfo = userData?.userInfo;

  const departmentId = useMemo(() => {
    let departmentId: number = 0;
    if (Facultyid) {
      return Facultyid;
    }
    userInfo?.roles.forEach((role: any) => {
      if (role.type === "MANAGER") {
        departmentId = role.details.departmentId;
      }
    });
    return departmentId;
  }, [userInfo]);

  const onSearch = () => {
    console.log(`Searching for... '${search}'`);
    fetchEspecialidadData(search);
  };

  const [isOpenConfirmation, setIsOpenConfirmation] = useState<boolean>(false);
  const [selectedEspecialidadId, setSelectedEspecialidadId] = useState<number | null>(null);
  const [isOpenModalSuccess, setIsOpenModalSuccess] = useState<boolean>(false);
  const [isOpenModalError, setIsOpenModalError] = useState<boolean>(false);

  const handleOnConfirmDeleteEspecialidad = async () => {
    console.log("Eliminando");

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

  return (
    <>
      <div className="w-full h-full flex flex-col gap-5">
        <div className="flex gap-2 flex-wrap justify-between items-center">
          <h2 className="text-primary text-3xl font-bold">
            Especialidades
          </h2>
          <Button
            text="Agregar especialidad"
            onClick={() => {
              setIsOpen(true);
            }}
            className="rounded-2xl"
            disabled={disableAgregarEspecialidad}
          />
        </div>
        <div className="border border-terciary shadow-lg rounded-2xl w-full  bg-white flex overflow-clip">
          <input
            type="text"
            placeholder="Buscar especialidad"
            className="grow border-0"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="bg-primary text-white px-4 py-2"
            onClick={onSearch}
          >
            <BiSearch />
          </button>
        </div>
        <AgGridReact
          rowData={especialidadData.filter((especialidad) => especialidad.faculty.facultyId === departmentId)}
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
      </div>
      <NuevaEspecialidad
        FacultyId={departmentId}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        onConfirm={() => {
          fetchEspecialidadData(search).then(() => {
            console.log("Especialidad creada exitosamente");
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
