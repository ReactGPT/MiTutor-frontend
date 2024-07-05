import { ChangeEvent, useState } from 'react';

type onChangeSimple = {
  tipo: "simple"
  onChange: (value: any) => void;
}

type onChangeComplex = {
  tipo: "object"
  onChange: (name: string, value: any) => void;
}

type InputProps = {
  titulo?: string;
  placeholder?: string;
  enable?: boolean;
  name?: string;
  text?: string | number;
  readOnly?: boolean;
  onChange: onChangeComplex | onChangeSimple;
  type?: string;
  manejarBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

const InputAdmin = ({ titulo = "", placeholder = "", enable = true, name, text = '', readOnly = false, onChange, type = 'string', manejarBlur, error }: InputProps) => {

  const [query, setQuery] = useState<string | number>(text);
  //console.log(text)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    //console.log(value, name)
    setQuery(value);

    // Dividir el nombre por puntos para obtener las propiedades anidadas
    //const nameParts = name.split('.');

    switch (onChange.tipo) {
      case "simple":
        onChange.onChange(type !== 'string' ? parseInt(value) : value);
        break;
      case "object":
        onChange.onChange(name, type !== 'string' ? parseInt(value) : value);
        break;
    }

  };

  return (
    <li className="drop-shadow-md p-3 flex items-center space-x-5 height-100% personalizado"
      style={{ display: "flex", height: "100%", flexDirection: "column", alignItems: "flex-start" }}>
      <label className="font-roboto text-base text-primary">{titulo}</label>
      <input type={type}
        className={`w-full h-full px-3 py-2 mt-1 font-roboto text-base bg-[rgba(255,_255,_255,_0.50)] border-custom drop-shadow-md font-normal ${readOnly ? 'text-gray-500' : ''}`}
        style={{ marginLeft: "0" }}
        placeholder={placeholder}
        disabled={!enable}
        name={name}
        value={query}
        onChange={handleChange}
        readOnly={readOnly}
        onBlur={manejarBlur}
      >
      </input>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </li>
  );
};

export default InputAdmin;