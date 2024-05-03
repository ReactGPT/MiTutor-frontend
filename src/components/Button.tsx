import React from 'react';

type ButtonProps = {
  variant?: 'call-to-action' | 'primario' | 'secundario' | 'terciario' | 'warning';
  onClick: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  text?: string;
};

const Button: React.FC<ButtonProps> = ({
  variant = 'call-to-action',
  onClick,
  icon,
  disabled = false,
  text
}) => {
  let buttonClass = 'flex items-center justify-between h-[42px] gap-2 px-3 py-2 rounded-xl shadow-[3px_3px_6px_0px_rgba(0,0,0,0.25)] font-roboto text-sm font-medium transition-all duration-200 ease-linear';
  let iconClass = 'text-2xl';

  switch (variant) {
    case 'call-to-action':
      buttonClass += ' bg-primary text-white hover:bg-black hover:text-white';
      break;
    case 'primario':
      buttonClass += ' bg-secondary text-primary hover:bg-primary hover:text-white';
      break;
    case 'secundario':
      buttonClass += ' bg-terciary text-blue-700 hover:bg-blue-700 hover:text-white';
      break;
    case 'terciario':
      buttonClass += ' bg-quaternary text-blue-500 hover:bg-blue-500 hover:text-white';
      break;
    case 'warning':
      buttonClass += ' bg-warning text-black hover:bg-red-700 hover:text-white';
      break;
    default:
      buttonClass += ' bg-blue-500 text-white hover:bg-blue-600';
  }

  if (disabled) {
    buttonClass += ' opacity-50 pointer-events-none';
  }

  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled}>
      {icon && <span className={iconClass}>{icon}</span>}
      {text}
    </button>
  );
};

export default Button;