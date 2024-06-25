import React, { useState } from 'react';

interface DropdownSolicitudProps {
    options: { id: number | string; name: string }[];
    defaultOption?: string;
    onSelect: (value: { id: number | string; name: string }) => void;
    icon?: React.ComponentType<{ className?: string; size?: number }>;
    value?: string;
    disabled?: boolean;
}

const DropdownSolicitud: React.FC<DropdownSolicitudProps> = ({ options, defaultOption, onSelect, icon: Icon, value, disabled }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelectOption = (option: { id: number | string; name: string }) => {
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <div className="relative h-[42px]">
            <button
                onClick={() => setIsOpen(!isOpen)}
                disabled={disabled}
                className="inline-flex justify-center items-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
                {Icon && <Icon className="mr-2" size={5} />}
                {value || defaultOption || 'Select an option'}
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
            {isOpen && !disabled && (
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
                                {option.name}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownSolicitud;
