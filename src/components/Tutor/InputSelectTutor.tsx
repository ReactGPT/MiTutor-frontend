import { ChangeEvent } from 'react';
import { CommitmentStatus } from '../../store/types/CommitmentStatus';

type InputSelectProps = {
  titulo?: string;
  enable?: boolean;
  name?: string;
  value?: string;
  readOnly?: boolean;
  options: CommitmentStatus[]; // Nuevo prop para pasar las opciones al componente
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const InputSelectTutor = ({ titulo = "", enable = true, name, value, onChange, readOnly, options }: InputSelectProps) => {

  return (
    <li className="drop-shadow-md p-5 flex items-center  space-x-5 height-100% personalizado"
      style={{ display: "flex", height: "100%", flexDirection: "column", alignItems: "flex-start" }}>
      <label htmlFor="">{titulo}</label>
      <select 
      className={`w-full px-3 py-2 mt-1 font-montserrat text-[90%] bg-[rgba(255,_255,_255,_0.50)] border-custom drop-shadow-md font-bold ${readOnly ? 'text-gray-500' : ''}`}
        style={{ height: "100%", marginLeft: "0" }}
        disabled={false}
        name={name}
        value={value}
        onChange={onChange} >
      {options.map((option) => (
        <option key={option.CommitmentStatusId} value={option.CommitmentStatusId}>{option.Description}</option>
      ))}
      </select>
    </li>
  );
};

export default InputSelectTutor;