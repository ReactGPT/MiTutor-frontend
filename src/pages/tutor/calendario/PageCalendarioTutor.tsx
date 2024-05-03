import { useState } from 'react';
import Button from '../../../components/Button';
import FilterComponent from '../../../components/FilterComponent';
import Calendario from '../../../components/Calendario';

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

  const [filteredCitas, setFilteredCitas] = useState(citas);

  const handleFilter = (filteredData: Cita[]) => {
    setFilteredCitas(filteredData);
  };

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <div className="w-full flex items-center justify-center gap-5">
        <FilterComponent citas={citas} onFilter={handleFilter} />
        <Button onClick={() => null} variant="call-to-action" text='Agregar Cita' />
        <Button onClick={() => null} variant="call-to-action" text='Modificar Disponibilidad' />
      </div>
      <div className="w-full overflow-auto">
        <Calendario horaInicio={8} horaFin={22} citas={filteredCitas} />
      </div>
    </div>
  );
};

export default PageCalendarioTutor;