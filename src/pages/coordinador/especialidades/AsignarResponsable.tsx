import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect } from "react";
import { Button } from "../../../components";
import ModalSuccess from "../../../components/ModalSuccess";
import { FaFloppyDisk, FaX } from "react-icons/fa6";
import { AgGridReact } from "ag-grid-react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { Services } from "../../../config";
import { User } from "../../../store/types/User";

interface AsignarResponsableProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (user: User) => void;
}


const AsignarResponsable = ({
  isOpen,
  onClose,
  onSelect,
}: AsignarResponsableProps) => {
  const [isOpenSuccess, setIsOpenSuccess] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  const [usuarios, setUsuarios] = React.useState<User[]>([]);
  const [search, setSearch] = React.useState<string>("");
  const userIsSelected = selectedUser !== null;

  const cargarUsuarios = async (query: string) => {
    try {
      const response = await axios.get<{ success: boolean, data: User[]; }>(Services.BaseUrl + `/listarUsuariosSinAlumnos/${query}`);
      const usersData = response.data.data;
      console.log({ usersData });
      setUsuarios(usersData);
    } catch (error) {
      console.error("Error fetching users data:", error);
    }
  };


  useEffect(() => {
    cargarUsuarios(search).then(() => {

    });
  }, [search]);
  return (
    <>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={onClose}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 " />
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
              <div className="inline-block align-bottom z-10 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl border border-gray-300  bg-white transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div className=" gap-4">
                  <div className="pb-5">
                    <Dialog.Title
                      as="h3"
                      className="text-xl leading-6 text-left  font-bold text-gray-900"
                    >
                      Asignar Responsable
                    </Dialog.Title>
                    {/* x button to close on the top right */}
                    <div className="absolute top-0 right-0 p-2">
                      <button
                        onClick={() => {
                          onClose();
                        }}
                      >
                        <FaX />
                      </button>
                    </div>
                  </div>
                  {/* searcher*/}
                  <div className="flex  rounded-lg border overflow-hidden mb-5">
                    <input
                      type="text"
                      placeholder="Buscar responsable"
                      className="grow border-0 ring-0 outline-0"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="bg-primary text-white px-4 py-2">
                      <FaSearch />
                    </button>
                  </div>
                  <div className="max-h-60 overflow-y-auto ">
                    <AgGridReact
                      className="ag-theme-alpine w-full "
                      rowData={usuarios}
                      onSelectionChanged={

                        (event) => {
                          const selectedNodes = event.api.getSelectedNodes();
                          const selectedData = selectedNodes.map((node) => node.data);

                          const user = selectedData[0];
                          if (user !== undefined) {

                            setSelectedUser(user);
                          }
                        }
                      }
                      defaultColDef={{
                        sortable: true,
                        filter: true,
                        resizable: true,
                        flex: 1,
                      }}
                      columnDefs={[
                        {

                          field: "persona.name",
                          headerName: "Nombre",
                          resizable: false,
                        },
                        {
                          field: "institutionalEmail",
                          headerName: "Correo",
                          resizable: false,
                        },
                        // check box to select the responsable
                        {
                          headerName: "",
                          checkboxSelection: true,
                          headerCheckboxSelection: true,

                          width: 10,

                          maxWidth: 50,
                          resizable: false,
                        },
                      ]}
                      domLayout="autoHeight"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-around pt-5 ">
                  <Button
                    text="Agregar"
                    icon={FaFloppyDisk}
                    onClick={() => {
                      setIsOpenSuccess(true);
                    }}
                    disabled={!userIsSelected}
                  />
                </div>
                <ModalSuccess
                  isOpen={isOpenSuccess}
                  onClose={() => {

                    if (selectedUser == null) return;

                    setIsOpenSuccess(false);
                    onClose();
                    onSelect(selectedUser);
                  }}
                  message="Se asignó el responsable correctamente."
                />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default AsignarResponsable;
