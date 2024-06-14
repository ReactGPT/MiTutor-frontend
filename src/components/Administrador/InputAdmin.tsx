import { ChangeEvent } from 'react';

type InputProps = {
  titulo?: string;
  texto?: string;
  enable?: boolean;
  name?: string;
  value?: string;
  readOnly?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  manejarBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const InputAdmin = ({ titulo = "", texto = "", enable = true, name, value, onChange, readOnly, manejarBlur }: InputProps) => {
  return (
    <li className="drop-shadow-md p-3 flex items-center space-x-5 height-100% personalizado"
      style={{ display: "flex", height: "100%", flexDirection: "column", alignItems: "flex-start" }}>
      <label className="font-roboto text-base text-primary">{titulo}</label>
      <input type="text"
        className={`w-full h-full px-3 py-2 mt-1 font-roboto text-base ${ enable ? 'bg-[rgba(235,236,250,1)] border border-solid border-[rgba(116,170,255,0.70)]' : 'bg-[rgba(255,_255,_255,_0.50)]'} border-custom drop-shadow-md font-normal ${!enable ? 'text-gray-600' : ''}`}
        style={{ marginLeft: "0" }}
        placeholder={texto}
        disabled={!enable}
        name={name}
        value={value}
        onChange={onChange}
        readOnly={!enable}
        onBlur={manejarBlur}
      />
    </li>
  );
};

export default InputAdmin;