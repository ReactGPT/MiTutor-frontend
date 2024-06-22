import React from "react";

interface SimpleSearchInputProps {
    placeholder: string;
    onSearch: (query: string) => void;
    value: string;
    onChange: (value: string) => void;
}

const SimpleSearchInput: React.FC<SimpleSearchInputProps> = ({
    placeholder,
    onSearch,
    value,
    onChange,
}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value); // Actualiza el valor sin realizar la búsqueda
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onSearch(value); // Realiza la búsqueda al presionar Enter
        }
    };

    return (
        <div className="flex w-full max-h-[40px] rounded-2xl">
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                className="w-full p-3 rounded-xl focus:outline-none font-roboto bg-[rgba(235,236,250,1)] shadow-custom border border-solid border-[rgba(116,170,255,0.70)]"
            />
        </div>
    );
};

export default SimpleSearchInput;
