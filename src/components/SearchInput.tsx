import React, { useState, ChangeEvent, useMemo, useEffect } from 'react';
import IconSearch from '../assets/svg/IconSearch';
import { Combobox, InputCell } from './index.ts';
import { RootState } from '../store/store';
import { useAppSelector } from '../store/hooks';

const customStyles = {
  height: '100%',
  fontFamily: 'Roboto, sans-serif',
  color: '#042354',
  border: '1px solid rgba(116,170,255,0.70)',
  borderRadius: '0px',
  boxShadow: '3px 3px 6px 0px rgba(0, 0, 0, 0.25)',
  backgroundColor: 'rgba(235,236,250,1)',
};

const className = 'font-roboto bg-[rgba(235,236,250,1)] shadow-custom border border-solid border-[rgba(116,170,255,0.70)]';

type SearchInputProps = {
  placeholder?: string;
  selectDisabled?: boolean;
  onSearch: (query: string) => void;
  handleOnChangeFilters: (filters: any) => void;
  iconoBusqueda: boolean;
};

type AppointmentStatus = {
  id: number;
  name: string;
};

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  onSearch,
  selectDisabled = false,
  handleOnChangeFilters,
  iconoBusqueda,
}: SearchInputProps) => {

  const [query, setQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<AppointmentStatus | null>(null);
  const [startDateSelected, setStartDateSelected] = useState<string | null>(null);
  const [endDateSelected, setEndDateSelected] = useState<string | null>(null);

  const { appointmentStatusList } = useAppSelector((state: RootState) => state.parameters);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleComboBoxChange = (value: AppointmentStatus) => {
    setSelectedStatus(value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedStartDate = e.target.value;
    if (endDateSelected && new Date(selectedStartDate) > new Date(endDateSelected)) {
      alert('La fecha de fin no puede ser menor que la fecha de inicio');
    } else {
      setStartDateSelected(selectedStartDate);
      // Si selecciona una nueva fecha de inicio, limpiamos la fecha de fin si es menor
      if (!selectedStartDate) {
        setEndDateSelected(null);
        setEndDateSelected('');
      }
    }
  };
  
  const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedEndDate = e.target.value;
    if (startDateSelected && new Date(selectedEndDate) < new Date(startDateSelected)) {
      alert('La fecha de fin no puede ser menor que la fecha de inicio');
    } else {
      setEndDateSelected(selectedEndDate);
    }
  };
  const filters = useMemo(() => {
    return {
      status: selectedStatus?.name,
      startDate: startDateSelected,
      endDate: endDateSelected,
      name: query
    };
  }, [selectedStatus, startDateSelected, endDateSelected, query]);

  useEffect(() => {
    handleOnChangeFilters(filters);
  }, [filters]);

  const endDateISO = startDateSelected ? new Date(startDateSelected).toISOString().split('T')[0] : '';

  return (
    <div className="flex w-full max-h-[40px] rounded-2xl">

      <input
        className={`w-full p-3 rounded-l-2xl 
        ${iconoBusqueda && selectDisabled ? 'rounded-r-2xl' : ''} focus:outline-none ${className}`}
        onChange={handleInputChange}
        type="search"
        placeholder={placeholder}
      />

      {!selectDisabled && <Combobox
        className={`${className}`}
        stylesOptions={`${className}`}
        text='Seleccione un Estado'
        name='Estado'
        options={appointmentStatusList}
        onChange={handleComboBoxChange}
        value={selectedStatus}
        buttonStyle='rounded-r-2xl'
        noMt={true}
      />}

      {!selectDisabled && <p
        className={`text-center flex items-center justify-center w-36 ${className} 
            border-r-0`}>
        Inicio:
      </p>}
      {!selectDisabled && <input
        type="date"
        className={`${className} border-l-0`}
        onChange={handleStartDateChange}
        name="Fecha Inicio" id="" />}
      {!selectDisabled && <p
        className={`text-center flex items-center justify-center w-28 ${className} 
            border-r-0`}>
        Fin:
      </p>}
      {!selectDisabled && <input
        type="date"
        className={`${className} border-l-0 ${iconoBusqueda ? 'rounded-r-2xl' : ''}`}
        onChange={handleEndDateChange}
        min={endDateISO}
        disabled={!startDateSelected}
        name="Fecha Fin" id="" />}

      {!iconoBusqueda && <button className="bg-primary cursor-default rounded-r-2xl text-white px-5 shadow-custom border border-solid border-[rgba(116,170,255,0.70)] active:bg-black hover:cursor-pointer" 
              onClick={handleSearch}><IconSearch /></button>}
    </div>
  );
};

export default SearchInput;