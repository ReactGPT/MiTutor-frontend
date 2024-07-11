import React, { useState } from 'react';
import { IconSearch } from '../../../assets';   
import SimpleSearchInput from '../../../components/SimpleSearchInput';

interface SearchBarProps {
  handleSearch: (startDate: string, endDate: string) => void;
  handleOnSearchTutor: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ handleSearch,handleOnSearchTutor }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [archivoSearchValue, setArchivoSearchValue] = useState<string | null>(null);

  const onSearch = () => {
    if (new Date(startDate) > new Date(endDate)) {
      alert('La fecha de fin no puede ser menor que la fecha de inicio');
    } else {
      handleSearch(startDate, endDate);
    }
  };
   
  const className = 'font-roboto bg-[rgba(235,236,250,1)] shadow-custom border border-solid border-[rgba(116,170,255,0.70)]';
   
  return (  
      <div className="flex justify-between items-center ">
        <div className="flex w-1/2 h-full items-center px-4 py-2 mr-2 mb-4"> 
          <SimpleSearchInput
            placeholder="Nombre del archivo"
            value={archivoSearchValue || ""}
            onChange={(value: string) => {
              setArchivoSearchValue(value);
              handleOnSearchTutor(value);
            }}
            onSearch={handleOnSearchTutor}
          /> 
        </div>

        <div className="w-1/2 flex justify-end mb-4">
          <p className={`text-center flex items-center justify-center w-36 ${className} border-r-0 rounded-l-full`}>Inicio:</p>
          <input
            type="date"
            className={`${className} border-l-0`}
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              setEndDate(''); // Reset end date if start date is changed
            }}
          />
          <p className={`text-center flex items-center justify-center w-28 ${className} border-r-0`}>Fin:</p>
          <input
            type="date"
            className={`${className} border-l-0`}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate}
            disabled={!startDate} // Disable end date input until start date is selected
          />
          <button
            className="bg-primary rounded-r-2xl text-white px-5 shadow-custom border border-solid border-[rgba(116,170,255,0.70)]"
            onClick={onSearch}
          >
            <IconSearch />
          </button>
        </div>
      </div> 
  );
};

export default SearchBar;