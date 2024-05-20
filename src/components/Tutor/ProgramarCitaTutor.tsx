import React, { useState, ChangeEvent } from 'react';
import { Datepicker, Label, Radio, TextInput, Textarea } from 'flowbite-react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import Button from '../Button';
import ModalBase from './ModalBase';
import Select from 'react-dropdown-select';
import { SaveIcon } from '../../assets';

const ProgramarCitaTutor: React.FC = () => {
  //Datos Tabla
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
    { headerName: 'Código Alumno', field: 'cod_alumno', maxWidth: 150 },
    { headerName: 'Nombre', field: 'nombre_alumno' },
    { headerName: 'Facultad/Especialidad', field: 'unidad_academica' },
  ];
  const rowData = null;
  //

  //Modal de seleccion de horario
  const [isModalHorarioOpen, setIsModalHorarioOpen] = useState(false);
  const openModalHorario = () => setIsModalHorarioOpen(true);
  const closeModalHorario = () => setIsModalHorarioOpen(false);
  //Modal para seleccion de tutoria y alumnos
  const [isModalSeleccionOpen, setIsModalSeleccionOpen] = useState(false);
  const openModalSeleccion = () => setIsModalSeleccionOpen(true);
  const closeModalSeleccion = () => setIsModalSeleccionOpen(false);
  //Cambair  del modal horario -> seleccion de tutoria
  const nextModal = () => {
    setIsModalHorarioOpen(false);
    openModalSeleccion();
  };

  //Manejar la modalidad
  const [showClassroom, setShowClassroom] = useState(false);
  const handleRadioModalidadChange = (event: ChangeEvent<HTMLInputElement>) => {
    setShowClassroom(event.target.value === "presencial");
  };
  return (
    <>
      <Button onClick={openModalHorario} variant="call-to-action" text='Programar Cita' />
      {/* Modal de seleccion de fecha y hora */}
      <ModalBase isOpen={isModalHorarioOpen} onClose={closeModalHorario}>
        <div className="flex flex-col p-4 gap-2  border-custom shadow-custom bg-[rgba(255,255,255,0.50)]">
          <div className="flex items-center justify-center font-roboto">
            <h3 className="text-xl font-semibold text-gray-900">
              Seleccionar horario
            </h3>
          </div>

          <Datepicker inline className="font-roboto" language='es-PE' showClearButton={false} showTodayButton={false} />
          <label className="font-roboto text-sm font-medium text-gray-900 mb-2 block">
            Escoge la hora
          </label>
          <ul id="timetable" className="grid w-full grid-cols-3 gap-2 mb-2">
            <li>
              <input type="radio" id="10-am" value="" className="hidden peer" name="timetable" />
              <label
                className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-blue-500 peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900">
                10:00 AM
              </label>
            </li>
            <li>
              <input type="radio" id="10-30-am" value="" className="hidden peer" name="timetable" />
              <label
                className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-blue-500 peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900">
                10:30 AM
              </label>
            </li>
            <li>
              <input type="radio" id="11-am" value="" className="hidden peer" name="timetable" />
              <label
                className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-blue-500 peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900">
                11:00 AM
              </label>
            </li>
            <li>
              <input type="radio" id="11-30-am" value="" className="hidden peer" name="timetable" />
              <label
                className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-blue-500 peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900">
                11:30 AM
              </label>
            </li>
            <li>
              <input type="radio" id="12-am" value="" className="hidden peer" name="timetable" />
              <label
                className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-blue-500 peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900">
                12:00 AM
              </label>
            </li>
            <li>
              <input type="radio" id="12-30-pm" value="" className="hidden peer" name="timetable" />
              <label
                className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border rounded-lg cursor-pointer text-gray-500 border-gray-200 dark:border-gray-700 dark:peer-checked:border-blue-500 peer-checked:border-blue-700 dark:hover:border-gray-600 dark:peer-checked:text-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 dark:peer-checked:bg-blue-900">
                12:30 PM
              </label>
            </li>
          </ul>
          <div className="flex justify-around">
            <Button text="Cancelar" variant="warning" onClick={closeModalHorario} />
            <Button text="Continuar" onClick={nextModal} />
          </div>
        </div>
      </ModalBase>

      {/* Modal de seleccionar Tutoria y participantes */}
      <ModalBase isOpen={isModalSeleccionOpen} onClose={closeModalSeleccion}>
        <div className="flex flex-col w-[990px] h-[550px] gap-5">
          <div className='flex w-full h-[11%] items-center justify-between px-3 shadow-custom border-custom bg-[rgba(255,255,255,0.50)]'>
            <h3 className="text-4xl font-semibold font-roboto text-gray-900 ">
              Llenar datos de la Cita
            </h3>
            <div className="flex gap-5 items-center justify-center">
              <Button text="Guardar" onClick={closeModalSeleccion} icon={SaveIcon} />
              <Button text="Cancelar" variant="warning" onClick={closeModalSeleccion} />
            </div>
          </div>
          <div className="w-full flex-1 flex gap-5">
            <div className="w-[25%] shadow-custom border-custom bg-[rgba(255,255,255,0.50)] p-4">
              <label className="text-2xl font-semibold font-roboto text-gray-900">
                Datos
              </label>

              <div className="block">
                <Label value="Fecha" className='font-roboto text-primary' />
              </div>
              <TextInput type="date" disabled />

              <div className="block">
                <Label value="Hora" className='font-roboto text-primary' />
              </div>
              <TextInput type="time" disabled />

              <div className="block">
                <Label value="Motivo de Tutoría" className='font-roboto text-primary' />
              </div>
              <Textarea className="max-h-[105px] min-h-[50px]" />

              <div className="block">
                <Label value="Modalidad" className='font-roboto text-primary' />
              </div>
              <div className="flex items-center gap-2">
                <Radio id="virtual" name="modalidad" value="virtual" defaultChecked onChange={handleRadioModalidadChange} />
                <Label htmlFor="virtual" className="font-roboto">Virtual</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio id="presencial" name="modalidad" value="presencial" onChange={handleRadioModalidadChange} />
                <Label htmlFor="presencial" className="font-roboto">Presencial</Label>
              </div>
              {showClassroom && (
                <>
                  <div className="block">
                    <Label value="Aula" className='font-roboto text-primary' />
                  </div>
                  <TextInput type="text" />
                </>
              )}
              <div className="block">
                <Label value="Unidad" className='font-roboto text-primary' />
              </div>

              <Select
                labelField='text'
                valueField='text'
                options={[{ key: "eeggcc", text: "Estudios Generales Ciencias", value: "eeggcc" }, { key: "faci", text: "Ciencias e Ingenieria", value: "faci" }, { key: "inf", text: "Ingenieria Informatica", value: "inf" }]}
                values={[]}
                onChange={() => { }}
                placeholder="Selecciona Unidad"
                searchable={false}
                className="bg-white text-sm"
                dropdownPosition="top"
              />

            </div>
            <div className="flex-1 shadow-custom border-custom bg-[rgba(255,255,255,0.50)] p-4 flex flex-col gap-2">
              <label className="text-2xl font-semibold font-roboto text-gray-900">
                Programa de Tutoría
              </label>

              <Select
                labelField='text'
                valueField='text'
                options={[{ key: "eeggcc", text: "Programa de EEGGCC", value: "eeggcc" }, { key: "faci", text: "Feria de Empleabilidad", value: "faci" }, { key: "inf", text: "Programa de Cachimbos", value: "inf" }]}
                values={[]}
                onChange={() => { }}
                placeholder="Selecciona Programa de Tutoría"
                searchable={false}
                className="bg-white text-sm"
              />

              <label className="text-2xl font-semibold font-roboto text-gray-900">
                Participantes
              </label>

              {/* Tabla */}

              <div className='flex w-full h-[75%] ag-theme-alpine ag-theme-alpine2 '>
                <div className='w-full h-full'>
                  <AgGridReact
                    defaultColDef={defaultColDef}
                    columnDefs={columnDefs}
                    rowData={rowData}
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </ModalBase >
    </>
  );
};

export default ProgramarCitaTutor;