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
}

const InputTutor = ({ titulo = "", texto = "", enable = true, name, value, onChange,readOnly,manejarBlur }: InputProps) => {
  return (
    <li className="drop-shadow-md p-5 flex items-center  space-x-5 height-100% personalizado"
      style={{ display: "flex", height: "100%", flexDirection: "column", alignItems: "flex-start" }}>
      <label htmlFor="">{titulo}</label>
      <input type="text"
        className={`w-full px-3 py-2 mt-1 font-montserrat text-[90%] bg-[rgba(255,_255,_255,_0.50)] border-custom drop-shadow-md font-bold ${readOnly ? 'text-gray-500' : ''}`}
        style={{ height: "100%", marginLeft: "0" }}
        placeholder={texto}
        disabled={!enable}
        name={name}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        onBlur={manejarBlur}
      />
    </li>
  );
};

export default InputTutor;