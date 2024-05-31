import React, { useState, ChangeEvent, useMemo, useEffect } from 'react';
import IconSearch from '../assets/svg/IconSearch';
import { Combobox,InputCell } from './index.ts';
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
  selectDisabled?:boolean;
  onSearch: (query: string) => void;
  handleOnChangeFilters: (filters: any) => void;
};

type AppointmentStatus = {
  id:number;
  name:string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  onSearch,
  selectDisabled=false,
  handleOnChangeFilters,
}:SearchInputProps) => {

  const [query, setQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<AppointmentStatus |  null>(null);
  const [startDateSelected, setStartDateSelected] = useState<Date | null>(null);
  const [endDateSelected, setEndDateSelected] = useState<Date | null>(null);

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

  const filters = useMemo(()=>{
    return {
      status: selectedStatus?.name,
      startDate: startDateSelected,
      endDate: endDateSelected,
      name: query
    }
  },[selectedStatus,startDateSelected,endDateSelected,query]);

  useEffect(()=>{
    handleOnChangeFilters(filters);
  },[filters]);

  return (
    <div className="flex w-full max-h-[40px] rounded-2xl">

      <input className={`w-full p-3 rounded-l-2xl focus:outline-none ${className}`}onChange={handleInputChange} type="search" placeholder={placeholder} />
        {!selectDisabled&&(<Combobox 
        className={`${className}`}
        stylesOptions={`${className}`}
        text='Seleccione un Estado'
        name='Estado'
        options={appointmentStatusList}
        onChange={handleComboBoxChange}
        value={selectedStatus}
        buttonStyle='rounded-r-2xl'
        noMt={true}
         />
      {/* <Select style={customStyles} placeholder="Estado" className="h-full font-roboto border border-solid border-[rgba(116,170,255,0.70)] shadow-custom bg-[rgba(235,236,250,1)]" values={[]} options={[]} onChange={() => { }} /> */}
      {/* <Select style={customStyles} placeholder="📆 Todas las fechas" className="h-full font-roboto border border-solid 
      border-[rgba(116,170,255,0.70)] shadow-custom bg-[rgba(235,236,250,1)]" values={[]} options={[]} onChange={() => { }} /> */}
      <p 
        className={`text-center flex items-center justify-center w-36 ${className} 
          border-r-0`}>
        Inicio: 
      </p>
      <input 
        type="date" 
        className={`${className} border-l-0`}
        name="Fecha Inicio" id="" />
      <p 
        className={`text-center flex items-center justify-center w-28 ${className} 
          border-r-0`}>
        Fin: 
      </p>
      <input 
        type="date" 
        className={`${className} border-l-0`} 
        name="Fecha Fin" id="" />)}
      
      <button className=" bg-primary cursor-default rounded-r-2xl text-white px-5 shadow-custom border border-solid border-[rgba(116,170,255,0.70)] active:bg-black hover:cursor-pointer" onClick={handleSearch}><IconSearch /></button>
    </div>
  );
};

export default SearchInput;