import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from 'react';
import { useTutoringProgramContext } from "../../context";
import { useProgramaTutoria } from "../../store/hooks";
import { Tutor } from "../../store/types";
import { Button, Checkbox, SearchInput, Spinner } from "../../components";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';
import IconAdd from "../../assets/svg/IconAdd";
import { CloseIcon, SaveIcon } from "../../assets";
type ModalAgregarTutoresProps = {
  isOpen: boolean;
  closeModal: () => void;

  //indexSelected:number;
};

function ModalAgregarTutores({ isOpen, closeModal }: ModalAgregarTutoresProps) {
  const { tutoringProgram, onChangeTutoringProgram } = useTutoringProgramContext();
  const { fetchTutoresByProgramaTutoria, isLoading } = useProgramaTutoria();
  const [tutores, setTutores] = useState<Tutor[]>([]);
  const [tutoresFiltered, setTutoresFiltered] = useState<Tutor[]>([]);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [tutoresAgregados, setTutoresAgregados] = useState<Tutor[]>([]);
  const handleSave = () => {
    const nuevosArrayTutores = [...(tutoringProgram.tutores), ...tutoresAgregados];
    onChangeTutoringProgram("tutores", nuevosArrayTutores);
    closeModal();
    setTutoresAgregados([]);
    //console.log(nuevosArrayTutores);

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
  const columnDefs: ColDef[] = [

    { headerName: 'Nombre Tutor', field: 'fullname', minWidth: 200 },
    { headerName: 'Correo', field: 'email', minWidth: 150 },
    {
      headerName: '', field: '', minWidth: 50, maxWidth: 50,
      cellRenderer: (rowData: any) => {
        //let value=false;
        return <Checkbox value={tutoresAgregados.some(item => item.idTutor === rowData.data.idTutor)}
          onChange={() => {
            const tutorIsFound = tutoresAgregados.some(item => item.idTutor === rowData.data.idTutor);
            if (tutorIsFound) {
              setTutoresAgregados([...(tutoresAgregados.filter(tutor => tutor.idTutor !== rowData.data.idTutor))]);
            }
            else {
              setTutoresAgregados([...tutoresAgregados, rowData.data]);
            }
          }} />;

      }
    }
  ];

  const handleOnChangeSearch = (query: string) => {
    setSearchFilter(query);
  };
  //Rendering control
  useEffect(() => {
    if (isOpen) {
      fetchTutoresByProgramaTutoria(-1)
        .then((tutores) => {
          setTutores(tutores);
        });
    }

  }, [isOpen]);

  useEffect(() => {
    //console.log(searchFilter);.
    setTutoresFiltered([...tutores.filter((item) => (item.fullname.toLowerCase().includes(searchFilter.toLowerCase()) || item.email.toLowerCase().includes(searchFilter.toLowerCase())) && !(tutoringProgram.tutores.some((tutor) => tutor.idTutor === item.idTutor)))]);
  }, [tutores, searchFilter]);


  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75" />
        </Transition.Child>


        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="max-w-screen-xl w-1/3 min-h-[50%] w-[50%] h-full max-h-[60%] bg-white  transform rounded-2xl p-6   shadow-xl transition-all">
                <Dialog.Title as="div" className="flex flex-row h-[10%] max-h-[80px] items-center ml-2 mr-2 justify-begin">
                  <h3 className='text-2xl font-bold w-full justify-begin text-primary font-large leading-6 text-gray-900'>{`Seleccionar Tutores`}</h3>
                </Dialog.Title>
                <div className="flex flex-col w-full min-h-[450px] ml-2 mr-2 mt-4 flex flex-col gap-4">
                  <div className="flex w-full h-[30%]">
                    <SearchInput selectDisabled={true} placeholder="Escriba nombre o correo" handleOnChangeFilters={() => { }} onSearch={handleOnChangeSearch} />
                  </div>
                  <div className="flex flex-row mt-4">
                    <h4 className='text-2xl font-bold w-full justify-begin text-primary font-large leading-6 text-gray-900'>{`Tutores seleccionados : ${tutoresAgregados.length}`}</h4>

                  </div>
                  <div className='w-[100%] h-[50%]'>
                    {isLoading && <Spinner size='xl' />}
                    {!isLoading && <div className="flex align-center flex-col w-[100%] max-h-[600px] h-[400px] min-h[300px]">
                      <div className="ag-theme-alpine items-center p-10 w-full h-full">
                        <AgGridReact
                          defaultColDef={defaultColDef}
                          columnDefs={columnDefs}
                          rowData={tutoresFiltered}
                        />
                      </div>
                    </div>}
                  </div>
                  <div className="flex flex-row h-[80px] w-full items-center justify-center gap-[100px]">
                    <Button onClick={() => { handleSave(); }} disabled={tutoresAgregados.length === 0} text="Guardar" icon={SaveIcon} />
                    <Button onClick={() => { closeModal(); }} text="Cancelar" icon={CloseIcon} variant="primario" iconSize={4} />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ModalAgregarTutores;

