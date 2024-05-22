import React, { useState, ChangeEvent } from 'react';
import { Datepicker, Label, Radio, TextInput, Textarea } from 'flowbite-react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import Button from '../Button';
import ModalBase from './ModalBase';
import Select from 'react-dropdown-select';
import { SaveIcon } from '../../assets';
import { SlotInfo } from 'react-big-calendar';

interface ProgramarCitaTutorProps {
  isOpen: boolean;
  onClose: () => void;
  slotInfo: SlotInfo | null;
}

const ModalProgramarCitaTutor: React.FC<ProgramarCitaTutorProps> = ({ isOpen, onClose, slotInfo }) => {
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
  //Manejar la modalidad
  const [showClassroom, setShowClassroom] = useState(false);
  const handleRadioModalidadChange = (event: ChangeEvent<HTMLInputElement>) => {
    setShowClassroom(event.target.value === "presencial");
  };
  return (
    <ModalBase isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col w-[990px] h-[550px] gap-5">
        <div className='flex w-full h-[11%] items-center justify-between px-3 shadow-custom border-custom bg-[rgba(255,255,255,0.50)]'>
          <h3 className="text-4xl font-semibold font-roboto text-gray-900 ">
            Llenar datos de la Cita
          </h3>
          <div className="flex gap-5 items-center justify-center">
            <Button text="Guardar" onClick={onClose} icon={SaveIcon} />
            <Button text="Cancelar" variant="warning" onClick={onClose} />
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
            <Datepicker value={slotInfo?.start.toLocaleDateString()} disabled />

            <div className='flex w-full gap-3'>

              <div className='flex-1'>
                <div className="block">
                  <Label value="Inicio" className='font-roboto text-primary' />
                </div>
                <TextInput type="time" value={slotInfo?.start.toTimeString().split(' ')[0]} disabled />
              </div>

              <div className='flex-1'>
                <div className="block">
                  <Label value="Fin" className='font-roboto text-primary' />
                </div>
                <TextInput type="time" value={slotInfo?.start.toTimeString().split(' ')[0]} disabled />
              </div>

            </div>

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
  );
};

export default ModalProgramarCitaTutor;