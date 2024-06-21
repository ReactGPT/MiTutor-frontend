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

const EspecialidadesPage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const [search, setSearch] = React.useState<string>("");
  const { especialidadData, fetchEspecialidadData } = useEspecialidadByName();
  useEffect(() => {
    fetchEspecialidadData(search);
  }, []);

  const { userData } = useAuth();
  const userInfo = userData?.userInfo;
  const departmentId = useMemo(() => {
    let departmentId: number = 0;
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

  return (
    <>
      <div className="w-full h-full flex flex-col gap-5">
        <div className="flex gap-2 flex-wrap justify-between items-center">
          <h2 className="text-primary text-3xl font-bold">
            Listado de especialidades
          </h2>
          <Button
            text="Agregar especialidad"
            onClick={() => {
              setIsOpen(true);
            }}
            className="rounded-2xl "
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
          columnDefs={[
            {
              headerName: "Siglas",
              field: "acronym",
              sortable: true,
              filter: true,
            },
            {
              headerName: "Nombre",
              field: "name",
              sortable: true,
              filter: true,
            },
            {
              headerName: "Responsable",
              field: "specialtyManager.persona.name",
              sortable: true,
              filter: true,
            },
            {
              headerName: "Telefono",
              field: "specialtyManager.persona.phone",
              sortable: true,
              filter: true,
            },
            {
              headerName: "Correo",
              field: "specialtyManager.institutionalEmail",
              sortable: true,
              filter: true,
            },
            /*{
              headerName: "Estado",
              field: "isActive",
              sortable: true,
              filter: true,
            },
            {
              headerName: "Fecha de Creacion",
              field: "creationDate",
              sortable: true,
              filter: true,
            },
            {
              headerName: "Fecha ultima modificacion",
              field: "modificationDate",
              sortable: true,
              filter: true,
            }, */
            {
              headerName: "Ver mas",
              cellRenderer: (params: { data: (typeof especialidadData)[0]; }) => {
                return (
                  <div className="flex w-full justify-center items-center">
                    <button
                      onClick={() => {
                        navigate(`/especialidades/${params.data.id}`, { state: { especialidadEspecifica: params.data } });
                      }}
                      className="rounded-2xl"
                    >
                      <BiMenuAltLeft className="w-fit" />
                    </button>
                  </div>
                );
              },
            },
          ]}
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
        />
      </div>
      <NuevaEspecialidad
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
    </>
  );
};

export default EspecialidadesPage;
