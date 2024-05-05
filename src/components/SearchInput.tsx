import React, { useState, ChangeEvent } from 'react';
import IconSearch from '../assets/svg/IconSearch';

type SearchInputProps = {
  placeholder?: string;
  onSearch: (query: string) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  onSearch,
}) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex w-full max-h-[40px] rounded-2xl">
      <input className="w-full font-roboto p-3 rounded-l-2xl bg-[rgba(235,236,250,1)] shadow-custom border border-solid border-[rgba(116,170,255,0.70)] focus:outline-none" onChange={handleInputChange} type="search" placeholder={placeholder} />
      <button className=" bg-primary cursor-default rounded-r-2xl text-white px-5 shadow-custom border border-solid border-[rgba(116,170,255,0.70)]" onClick={handleSearch}><IconSearch /></button>
    </div>
  );
};

export default SearchInput;