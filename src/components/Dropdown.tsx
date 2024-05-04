import React, { useState } from 'react';

interface DropdownProps {
  options: string[];
  defaultOption?: string; // Nueva prop para la opción por defecto
  onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, defaultOption, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(defaultOption || null); // Inicializar con la opción por defecto
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative h-[42px]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-center items-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {selectedOption || defaultOption || 'Select an option'} {/* Mostrar la opción por defecto si no hay ninguna seleccionada */}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSelectOption(option)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                role="menuitem"
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
