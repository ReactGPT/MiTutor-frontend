import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import Button from './Button';
import { BiFilter } from 'react-icons/bi';

type Cita = {
  id: string;
  fecha: Date;
  horaInicio: number;
  horaFin: number;
  nombre: string;
  facultad: string;
  especialidad: string;
};

type FilterProps = {
  citas: Cita[];
  onFilter: (filteredData: Cita[]) => void;
};

const FilterComponent: React.FC<FilterProps> = ({ citas, onFilter }) => {
  const [facultades, setFacultades] = useState<string[]>([]);
  const [especialidades, setEspecialidades] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState({
    facultad: 'Todos', // Por defecto selecciona 'Todos'
    especialidad: 'Todos', // Por defecto selecciona 'Todos'
  });

  useEffect(() => {
    // Extraer todas las facultades únicas de las citas
    const uniqueFacultades = Array.from(new Set(citas.map((cita) => cita.facultad)));
    setFacultades(['Todos', ...uniqueFacultades]); // Agregar 'Todos' como opción

    // Extraer todas las especialidades únicas de las citas
    const uniqueEspecialidades = Array.from(new Set(citas.map((cita) => cita.especialidad)));
    setEspecialidades(['Todos', ...uniqueEspecialidades]); // Agregar 'Todos' como opción
  }, [citas]);

  const handleSelect = (option: string, dropdown: string) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [dropdown]: option,
    }));
  };

  const handleFilter = () => {
    let filteredData = citas;

    if (selectedOptions.facultad !== 'Todos') {
      filteredData = filteredData.filter((cita) => cita.facultad === selectedOptions.facultad);
    }

    if (selectedOptions.especialidad !== 'Todos') {
      filteredData = filteredData.filter((cita) => cita.especialidad === selectedOptions.especialidad);
    }

    onFilter(filteredData);
  };

  return (
    <div className="flex items-center">
      <div className="flex">
        <Dropdown options={facultades} defaultOption="Todos" onSelect={(option) => handleSelect(option, 'facultad')} />
        <Dropdown options={especialidades} defaultOption="Todos" onSelect={(option) => handleSelect(option, 'especialidad')} />
      </div>
      <Button onClick={handleFilter} icon={<BiFilter />} />
    </div>
  );
};

export default FilterComponent;
