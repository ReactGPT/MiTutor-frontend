import React, { useState, ChangeEvent } from 'react';
import IconSearch from '../assets/svg/IconSearch';
import Select from 'react-dropdown-select';
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

type SearchInputProps = {
  placeholder?: string;
  onSearch: (query: string) => void;
};

type AppointmentStatus = {
  id:number;
  name:string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  onSearch,
}) => {
  const [query, setQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<AppointmentStatus | null>(null);

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

  return (
    <div className="flex w-full max-h-[40px] rounded-2xl">
      <input className="w-full font-roboto p-3 rounded-l-2xl bg-[rgba(235,236,250,1)] shadow-custom border border-solid border-[rgba(116,170,255,0.70)] focus:outline-none" onChange={handleInputChange} type="search" placeholder={placeholder} />
      <Combobox 
        className='font-roboto bg-[rgba(235,236,250,1)] shadow-custom border 
                border-solid border-[rgba(116,170,255,0.70)] ' 
        text='Seleccione un Estado'
        name='Estado'
        options={appointmentStatusList}
        onChange={handleComboBoxChange}
        value={selectedStatus}
        buttonStyle='rounded-r-2xl'
        noMt={true}
         />
      {/* <Select style={customStyles} placeholder="Estado" className="h-full font-roboto border border-solid border-[rgba(116,170,255,0.70)] shadow-custom bg-[rgba(235,236,250,1)]" values={[]} options={[]} onChange={() => { }} /> */}
      {/* <Select style={customStyles} placeholder="📆 Todas las fechas" className="h-full font-roboto border border-solid border-[rgba(116,170,255,0.70)] shadow-custom bg-[rgba(235,236,250,1)]" values={[]} options={[]} onChange={() => { }} /> */}
      {/* <label className="font-roboto bg-[rgba(235,236,250,1)] shadow-custom border 
                border-solid border-l-[rgba(116,170,255,0.70)] border-y-[rgba(116,170,255,0.70)]">Inicio: </label> */}
      <input type="date" className="font-roboto bg-[rgba(235,236,250,1)] shadow-[3px_3px_6px_0px_rgba(0,0,0,0.25)] border border-solid  border-[rgba(116,170,255,0.70)]" name="Fecha Inicio" id="" />
      
      
      <button className=" bg-primary cursor-default rounded-r-2xl text-white px-5 shadow-custom border border-solid border-[rgba(116,170,255,0.70)] active:bg-black hover:cursor-pointer" onClick={handleSearch}><IconSearch /></button>
    </div>
  );
};

export default SearchInput;