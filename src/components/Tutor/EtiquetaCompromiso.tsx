import React from 'react';

type EtiquetaCompromisoProps = {
  variant: String;
};

const EtiquetaCompromiso: React.FC<EtiquetaCompromisoProps> = ({variant}) => {
  let etiquetaClass = 'rounded-2xl border-2 border-solid px-2 m-10 w-full';
  let text = 'Pendiente';
  switch (variant) {
    case 'En Proceso':
      etiquetaClass += ' bg-sky-300 bg-opacity-32';
      text = 'En Proceso';
      break;
    case 'Hecho':
      etiquetaClass += ' bg-green-300 bg-opacity-32';
      text = 'Hecho';
      break;
    default:
      etiquetaClass += ' bg-pink-300 bg-opacity-32'; //pendiente
      break;
  }

  return (
    <div className={etiquetaClass}>
      <p className="font-bold">{text}</p>
    </div>
  );
};

export default EtiquetaCompromiso;