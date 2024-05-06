import { useState, ChangeEvent } from 'react';
import Button from '../../../components/Button';
import FilterComponent from '../../../components/FilterComponent';
import Calendario from '../../../components/Calendario';
import ModalBase from '../../../components/Tutor/ModalBase';
import { Datepicker, Dropdown, Label, Radio, TextInput } from 'flowbite-react';
import { SaveIcon } from '../../../assets';


const citas = [
  {
    id: '1',
    fecha: new Date(),
    horaInicio: 10,
    horaFin: 12,
    nombre: 'Cita en 4ta matricula',
    facultad: 'Ciencias e Ingenieria',
    especialidad: 'Ingeneria Informatica'
  },
  {
    id: '2',
    fecha: new Date(),
    horaInicio: 13,
    horaFin: 15,
    nombre: 'Cita con Flores',
    facultad: 'Ciencias e Ingenieria',
    especialidad: 'Ingeneria de Minas'
  },
  {
    id: '3',
    fecha: new Date(2024, 3, 30),
    horaInicio: 16,
    horaFin: 17,
    nombre: 'Cita con Carlos',
    facultad: 'Ciencias e Ingenieria',
    especialidad: 'Ingeneria Civil'
  },
  {
    id: '4',
    fecha: new Date(2024, 3, 29),
    horaInicio: 18,
    horaFin: 20,
    nombre: 'Cita con María',
    facultad: 'Facultad 2',
    especialidad: 'Especialidad 2.1'
  },
  {
    id: '5',
    fecha: new Date(2024, 4, 1),
    horaInicio: 11,
    horaFin: 13,
    nombre: 'Cita con Juan',
    facultad: 'Facultad 2',
    especialidad: 'Especialidad 2.2'
  },
  {
    id: '6',
    fecha: new Date(2024, 3, 26),
    horaInicio: 8,
    horaFin: 10,
    nombre: 'Cita con Roberto',
    facultad: 'Facultad 2',
    especialidad: 'Especialidad 2.3'
  },
];

interface Cita {
  id: string;
  fecha: Date;
  horaInicio: number;
  horaFin: number;
  nombre: string;
  facultad: string;
  especialidad: string;
}

const PageCalendarioTutor = () => {
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
  const [showClassroom, setShowClassroom] = useState(false); // Estado para controlar la visibilidad del TextInput
  const handleRadioModalidadChange = (event: ChangeEvent<HTMLInputElement>) => {
    setShowClassroom(event.target.value === "presencial"); // Mostrar TextInput solo cuando se selecciona "USA"
  };

  const [filteredCitas, setFilteredCitas] = useState(citas);

  const handleFilter = (filteredData: Cita[]) => {
    setFilteredCitas(filteredData);
  };

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="w-full flex items-center justify-between gap-5">
        <FilterComponent citas={citas} onFilter={handleFilter} />
        <div className="flex gap-5">
          <Button onClick={openModalHorario} variant="call-to-action" text='Programar Cita' />
          <Button onClick={() => null} variant="call-to-action" text='Modificar Disponibilidad' />
        </div>
      </div>
      <div className="w-full overflow-auto">
        <Calendario horaInicio={8} horaFin={22} citas={filteredCitas} />
      </div>

      {/* Modal de seleccion de fecha y hora */}
      <ModalBase isOpen={isModalHorarioOpen} onClose={closeModalHorario}>
        <div className="flex items-center justify-between pb-2 border-b rounded-t font-roboto">
          <h3 className="text-lg font-semibold text-gray-900">
            Seleccionar horario
          </h3>
        </div>

        <div className="flex flex-col p-4 gap-2 pt-2">
          <Datepicker inline className="font-roboto" language='es-PE' showClearButton={false} showTodayButton={false} />
          <label className="font-roboto text-sm font-medium text-gray-900 mb-2 block">
            Escoge la hora
          </label>
          <ul id="timetable" className="grid w-full grid-cols-3 gap-2 mb-5">
            <li>
              <input type="radio" id="10-am" value="" className="hidden peer" name="timetable" />
              <label htmlFor="10-am" className="inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium text-center hover:text-gray-900 bg-white border rounded-lg cursor-pointer text-gray-500 border-gray-200 hover:bg-gray-50">
                10:00 AM
              </label>
            </li>
          </ul>
          <div className="flex justify-around">
            <Button text="Cancelar" variant="warning" onClick={closeModalHorario} />
            <Button text="Guardar" onClick={nextModal} />
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
              <TextInput type="text" />

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


            </div>
            <div className="flex-1 shadow-custom border-custom bg-[rgba(255,255,255,0.50)] p-4">

            </div>
          </div>
        </div>
      </ModalBase >
    </div >
  );
};

export default PageCalendarioTutor;