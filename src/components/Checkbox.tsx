type InputProps = {
  boxSize?: string;
  label?: string;
  left?: boolean;
  disabled?: boolean;
  onChange?: () => void;
  value: boolean;
};

function Checkbox({ boxSize = '', label = '', left = false, disabled = false, onChange, value }: InputProps) {
  return (
    <div className={"flex items-center " + boxSize}>
      {left && <label htmlFor="checked-checkbox" className="me-2 text-sm font-medium text-primary dark:text-gray-300">{label}</label>}
      <input checked={value} onChange={onChange} id="checked-checkbox" disabled={disabled}
        type="checkbox" className="w-4 h-4 text-primary bg-primary border-primary rounded" />
      {!left && <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-primary dark:text-gray-300">{label}</label>}
    </div>
  );
}

export default Checkbox;