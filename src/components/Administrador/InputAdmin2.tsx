import { ChangeEvent, useState, useEffect } from 'react';

type InputProps = {
  titulo?: string;
  texto?: string;
  enable?: boolean;
  name?: string;
  valor?: string;
  readOnly?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  manejarBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  noPad?: boolean;
  className?: string;
};

const InputAdmin2 = ({ titulo = "", texto = "", enable = true, name, valor = "", onChange, readOnly, manejarBlur, noPad, className }: InputProps) => {

  const [query, setQuery] = useState<string | number>(valor);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    //console.log(value, name)
    setQuery(value);
    if(onChange) onChange(e);
  };

  useEffect(() => {
    setQuery(valor);
  }, [valor]);

  
  return (
    <li className={`drop-shadow-md flex items-center space-x-5 height-100% personalizado ${noPad ? '' : 'p-3'}`}
      style={{ display: "flex", height: "100%", flexDirection: "column", alignItems: "flex-start" }}>
      <label className="font-roboto text-base text-primary">{titulo}</label>
      <input type="text"
        className={`w-full h-full px-3 py-2 mt-1 font-roboto text-base ${ enable ? 'bg-[rgba(235,236,250,1)] border border-solid border-[rgba(116,170,255,0.70)]' : ' bg-[rgba(255,_255,_255,_0.50)] '} border-custom drop-shadow-md font-normal ${!enable ? ' text-gray-600 ' : ' '} ${className}`}
        style={{ marginLeft: "0" }}
        placeholder={texto}
        disabled={!enable}
        name={name}
        value={query}
        onChange={handleChange}
        readOnly={!enable}
        onBlur={manejarBlur}
      />
      </li>
  );
};

export default InputAdmin2;