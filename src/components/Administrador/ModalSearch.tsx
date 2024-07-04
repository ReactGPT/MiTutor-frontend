import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Button from '../Button';
import { AgGridReact } from 'ag-grid-react';
import { useUser } from '../../store/hooks/useUser';
import Facultad from '../../store/types/Facultad';
import SearchInput from '../SearchInput';
import { ColDef } from 'ag-grid-community';
import { BiCheckbox, BiSolidCheckSquare } from "react-icons/bi";
import { User } from '../../store/types/User';

interface ModalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  facultad: Facultad;
  setFacultadData: (facultad: Facultad) => void;
  userType: "CoordFacultad" | "CoordBienestar";
}

const ModalSearch: React.FC<ModalSearchProps> = ({ isOpen, onClose, facultad, setFacultadData, userType }) => {

  const { userData, fetchUsersNoStudents } = useUser();
  const [usuarioSelected, setUsuarioSelected] = useState<User | null>(null);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetchUsersNoStudents();
  }, []);

  const handleSearch = (query: string) => {
    setSearchValue(query);
  };

  const defaultColDef = {
    suppressHeaderMenuButton: true,
    flex: 1,
    sortable: true,
    resizable: true,
    cellStyle: {
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
    },
  };

  const modifiedFaculty: Facultad = useMemo(() => {
    if (usuarioSelected) {
      const managerData = {
        id: usuarioSelected.id,
        institutionalEmail: usuarioSelected.institutionalEmail,
        pucpCode: usuarioSelected.pucpCode,
        isActive: usuarioSelected.isActive,
        persona: {
          id: usuarioSelected.persona.id,
          name: usuarioSelected.persona.name,
          lastName: usuarioSelected.persona.lastName,
          secondLastName: usuarioSelected.persona.secondLastName,
          isActive: usuarioSelected.persona.isActive,
          usuario: null,
        },
        roles: usuarioSelected.roles,
        isVerified: usuarioSelected.isVerified,
      };

      if (userType === "CoordFacultad") {
        return {
          ...facultad,
          facultyManager: managerData,
        };
      } else if (userType === "CoordBienestar") {
        return {
          ...facultad,
          bienestarManager: managerData,
        };
      }
    }
    return { ...facultad };
  }, [usuarioSelected, facultad]);

  const handleOnAddAgregarResponsable = () => {
    if (usuarioSelected) {
      setFacultadData({
        ...modifiedFaculty
      });
    }
  };

  const handleOnSelectUser = (usuario: User) => {
    setUsuarioSelected(usuario);
  };

  const columnUser: ColDef[] = [
    { headerName: 'Nombre', valueGetter: p => p.data.persona.name + ' ' + p.data.persona.lastName + ' ' + p.data.persona.secondLastName, minWidth: 200, maxWidth: 200 },
    { headerName: 'Correo', field: 'institutionalEmail', minWidth: 200 },
    {
      headerName: 'Seleccionar',
      field: '',
      maxWidth: 120,
      minWidth: 120,
      cellRenderer: (rowData: any) => {
        return (
          <button className='text-primary' onClick={() => {
            handleOnSelectUser(rowData.data);
          }}>
            {usuarioSelected?.id == rowData.data.id ? <BiSolidCheckSquare size={22} /> : <BiCheckbox size={22} />}
          </button>
        );
      }
    }
  ];

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={onClose}
      >
        <div className="flex h-full items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block space-y-10 h-[85%] align-bottom bg-white rounded-lg pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl  sm:w-full sm:p-6">
              <div className="flex flex-col h-[85%] items-center justify-center">
                <div className="text-center h-[85%] w-full">
                  <Dialog.Title
                    as="h1"
                    className="text-2xl leading-6 font-semibold text-gray-900"
                  >
                    Lista de Usuarios
                  </Dialog.Title>
                  <div className="w-full mt-4">
                    <SearchInput
                      onSearch={handleSearch}
                      handleOnChangeFilters={() => { }}
                      placeholder={`Nombre o código del usuario`}
                      selectDisabled={true}
                    />
                  </div>
                  <div className="flex w-full h-full flex-col">
                    <div className="flex w-full h-full ag-theme-alpine items-center justify-center">
                      <div className="w-full h-[85%]">
                        <AgGridReact
                          defaultColDef={defaultColDef}
                          columnDefs={columnUser}
                          rowData={userData.filter((item) =>
                            item.persona.name.toLowerCase().includes(searchValue.toLowerCase()) || item.institutionalEmail.toLowerCase().includes(searchValue.toLowerCase())
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <Button text="Cancelar" onClick={onClose} />
                <Button
                  text="Agregar"
                  onClick={() => {
                    if (usuarioSelected) {
                      handleOnAddAgregarResponsable();
                      onClose();
                    }
                  }}
                />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalSearch;