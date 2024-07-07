import React, { Fragment, useState, useEffect, useMemo, useCallback } from 'react';
import { Dialog, Transition } from "@headlessui/react";
import SearchInput from '../../../../components/SearchInput';
import Button from '../../../../components/Button';
import { AddSquareIcon, SaveIcon } from '../../../../assets';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';
import { useStudent } from '../../../../store/hooks';
import { Student } from '../../../../store/types';
import PageCargarMasivamente from './PageCargarMasivamente';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../store/hooks';
import { tutoringProgramSlice } from '../../../../store/slices';
import { useTutoringProgramContext } from '../../../../context';
import DeleteIcon from '../../../../assets/svg/DeleteIcon';
import { Checkbox } from 'antd';
import PageCargarAlumno from "./PageCargarAlumno";

type ModalAlumnosSeleccionadosProps = {
  isOpen: boolean;
  closeModal: () => void;
};

const PageAlumnosSeleccionados = ({ isOpen, closeModal }: ModalAlumnosSeleccionadosProps) => {
  const navigate = useNavigate();
  const { tutoringProgram: tutoringProgramSelected } = useTutoringProgramContext();
  const dispatch = useAppDispatch();
  const { handleChangeTutoringProgram } = tutoringProgramSlice.actions;
  const { studentData, setStudentData } = useStudent();
  const [studentDataModified, setStudentDataModified] = useState<Student[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [showPageCargarMasivamente, setShowPageCargarMasivamente] = useState(false); // Estado para controlar PageCargarMasivamente
  const [showPageCargarAlumno, setshowPageCargarAlumno] = useState(false);

  // Efecto para cargar datos originales cuando se abre el modal
  useEffect(() => {
    if (isOpen && tutoringProgramSelected.alumnos && tutoringProgramSelected.alumnos.length > 0) {
      setStudentDataModified([...tutoringProgramSelected.alumnos]);
    }
  }, [isOpen, tutoringProgramSelected.alumnos]);

  // Efecto para guardar cambios en el contexto al modificar studentDataModified
  useEffect(() => {
    if (studentDataModified.length > 0) {
      dispatch(handleChangeTutoringProgram({ name: 'alumnos', value: studentDataModified }));
    }
  }, [studentDataModified, dispatch, handleChangeTutoringProgram]);

  const esFijo: boolean = useMemo(() => {
    return tutoringProgramSelected.tutorTypeId === 2;
  }, [tutoringProgramSelected]);

  const handleSearch = (query: string) => {
    setSearchValue(query);
  };

  const handleClickSaveAlumnos = () => {
    console.log("modificados",studentDataModified);
    const filteredStudents = studentDataModified.filter(student => student.isActive);
    console.log("alumnos finales",filteredStudents);
    dispatch(handleChangeTutoringProgram({
      name: 'alumnos',
      value: [...filteredStudents]
    }));

    const programaTutoria = {
      ...tutoringProgramSelected,
      alumnos: [...filteredStudents],
      cant_alumnos: filteredStudents.length
    };

    const path = !!tutoringProgramSelected.id
      ? "/programasDeTutoriaMaestroEsp/editar"
      : "/programasDeTutoriaMaestroEsp/nuevo";

    navigate(path, { state: { programaTutoria } });
    setStudentDataModified(filteredStudents);
    closeModal();
  };

  const handleTutorChange = (studentId: number, tutorId: number) => {
    const updatedStudentData = studentDataModified.map((student) => {
      if (student.studentId === studentId) {
        const selectedTutor = tutoringProgramSelected.tutores.find((tutor) => tutor.idTutor === tutorId);
        return {
          ...student,
          tutorId: selectedTutor ? selectedTutor.idTutor : 0,
          tutorName: selectedTutor ? selectedTutor.nombre : '',
        };
      }
      return student;
    });
    setStudentDataModified(updatedStudentData);
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

  const columnDefs: ColDef[] = !esFijo ? [
    { headerName: 'Código', field: 'pucpCode', maxWidth: 150, minWidth: 100 },
    { headerName: 'Nombres', field: 'name', minWidth: 150 },
    { headerName: 'Apellidos', field: 'lastName', minWidth: 150 },
    { headerName: 'Correos', field: 'institutionalEmail', minWidth: 250 },
    { headerName: 'Facultades', field: 'facultyName', minWidth: 250 },
    {
      headerComponent: () => {
        return (
            <button className='text-primary' onClick={() => {   }}><DeleteIcon /></button>
        );
      },
      maxWidth: 60,
      minWidth: 40,
      cellRenderer: (row: any) => { 
        return (
          <Checkbox
            checked={!studentDataModified.some(item => item.studentId === row.data.studentId && item.isActive)}
            onChange={(e) => {
              const isChecked = e.target.checked;
              const studentId = row.data.studentId;

              const updatedStudentData = studentDataModified.map((student) => {
                if (student.studentId === studentId) {
                  return { ...student, isActive: !isChecked };
                }
                return student;
              });

              setStudentDataModified(updatedStudentData);
            }}
          />
        );
      },
    }
  ] : [
    { headerName: 'Código', field: 'pucpCode', maxWidth: 100, minWidth: 80 },
    { headerName: 'Nombres', field: 'name', maxWidth: 120, minWidth: 100 },
    { headerName: 'Apellidos', field: 'lastName', maxWidth: 150, minWidth: 120 },
    { headerName: 'Correos', field: 'institutionalEmail', minWidth: 250 },
    { headerName: 'Facultades', field: 'facultyName', minWidth: 250 },
    {
      headerName: "Tutor Fijo", field: 'tutorFijo', minWidth: 150, cellRenderer: (params: any) => {
        const student = params.data;
        const tutorExistsInProfessors = tutoringProgramSelected.tutores.some(tutor => tutor.idTutor === student.tutorId);
        return (
          <select
            className='w-full h-full bg-white border border-gray-300 rounded-md px-2 py-1'
            value={student.tutorId || ''}
            onChange={(e) => handleTutorChange(student.studentId, parseInt(e.target.value))}
          >
            <option value="">Sin Tutor</option>
            {!tutorExistsInProfessors && student.tutorId !== 0 && (
              <option value={student.tutorId}>{student.tutorName}</option>
            )}
            {tutoringProgramSelected.tutores.map((tutor) => (
              <option key={tutor.idTutor} value={tutor.idTutor}>
                {tutor.nombre}
              </option>
            ))}
          </select>
        );
      }
    },
    {
      headerComponent: () => {
        return (
            <button className='text-primary' onClick={() => {   }}><DeleteIcon /></button>
        );
      },
      maxWidth: 60,
      minWidth: 40,
      cellRenderer: (row: any) => { 
        return (
          <Checkbox
            checked={!studentDataModified.some(item => item.studentId === row.data.studentId && item.isActive)}
            onChange={(e) => {
              const isChecked = e.target.checked;
              const studentId = row.data.studentId;

              const updatedStudentData = studentDataModified.map((student) => {
                if (student.studentId === studentId) {
                  return { ...student, isActive: !isChecked };
                }
                return student;
              });

              setStudentDataModified(updatedStudentData);
            }}
          />
        );
      },
    }
  ];

  const handleClickSubirMasivamente = () => {
    setShowPageCargarMasivamente(true);
  };

  const handleClickSubirAlumno = () => {
    setshowPageCargarAlumno(true);
  };

  const handleClosePageCargarMasivamente = useCallback(() => {
    // Restaurar studentDataModified a los datos originales si es necesario
    setStudentDataModified([...tutoringProgramSelected.alumnos]);
    setShowPageCargarMasivamente(false);
    closeModal();
  }, [setShowPageCargarMasivamente, tutoringProgramSelected.alumnos]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClosePageCargarMasivamente}>
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
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="max-w-screen-xl w-2/3 min-h-[50%] max-h-[80%] bg-white transform rounded-2xl p-6 shadow-xl transition-all">
                <Dialog.Title as="div" className="flex flex-row h-[10%] max-h-[80px] items-center ml-2 mr-2 justify-begin mb-[20px]">
                  <h3 className='text-2xl font-bold w-full justify-begin text-primary font-large leading-6 text-gray-900'>{`Seleccionar Alumnos`}</h3>
                </Dialog.Title>


                <div className='w-full h-full'>
                  {showPageCargarMasivamente ? (
                    <PageCargarMasivamente
                      setPopout={setShowPageCargarMasivamente}
                      setStudentDataModified={setStudentDataModified}
                      onClose={handleClosePageCargarMasivamente}
                    />
                  ) : ( showPageCargarAlumno ? (
                    <PageCargarAlumno
                      setPopout={setshowPageCargarAlumno}
                      setStudentDataModified={setStudentDataModified}
                      idEspecialidad={tutoringProgramSelected.especialidadId}
                    />
                  ) : (
                    <div className='w-full h-full'>
                      {/* Contenido actual del modal */}
                      <div className="flex flex-col gap-5 w-full">
                        <div className="flex flex-1">
                          <SearchInput
                            onSearch={handleSearch}
                            handleOnChangeFilters={() => {}}
                            selectDisabled={true}
                            placeholder=""
                          />
                        </div>
                        <div className="flex w-full justify-end gap-5">
                          <div className="flex items-end justify-end">
                            <Button
                              onClick={handleClickSubirAlumno}
                              icon={AddSquareIcon}
                              text="Cargar Alumnos"
                              iconSize={25}
                            />
                          </div>
                          <div className="flex items-end justify-end">
                            <Button
                              onClick={handleClickSubirMasivamente}
                              icon={AddSquareIcon}
                              text="Cargar Masivamente"
                              iconSize={25}
                            />
                          </div>
                        </div>
                      </div>
 
                      <div className='w-full h-[50%]'>
                        <div className="flex w-full h-[75%] mt-6 ag-theme-alpine ag-theme-alpine2" style={{ height: '300px' }}>
                          <div className="w-full h-full">
                            <AgGridReact
                              defaultColDef={defaultColDef}
                              columnDefs={columnDefs}
                              rowData={studentDataModified.filter((student) => student.name.toLowerCase().includes(searchValue.toLowerCase()) || student.pucpCode.toLowerCase().includes(searchValue.toLowerCase()) || student.lastName.toLowerCase().includes(searchValue.toLowerCase()))}
                              suppressColumnVirtualisation={true}
                              rowSelection='multiple' 
                            />
                          </div>
                        </div>
                        <div className="flex justify-end mt-6 gap-[10px]">
                          <Button onClick={handleClosePageCargarMasivamente} text="Cerrar" />
                          <Button onClick={handleClickSaveAlumnos} icon={SaveIcon} text='Guardar' iconSize={8} />
                        </div>

                      </div>
                    </div>
                  ))} 
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );

};

export default PageAlumnosSeleccionados;
