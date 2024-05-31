import React, { ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageDetalleDeTutoriaAsignado from './PageDetalleDeTutoriaAsignado';
import PageDetalleDeTutoriaSolicitado from './PageDetalleDeTutoriaSolicitado';
import PageDetalleDeTutoriaVariable from './PageDetalleDeTutoriaVariable';

const PageDetalleDeTutoria = () => {
  const location = useLocation();
  const data = location.state.data;

  let componente: ReactElement;

  if (data.tutorType === "TUTOR FIJO ASIGNADO") {
    componente = <PageDetalleDeTutoriaAsignado />;
  } else if (data.tutorType === "TUTOR FIJO SOLICITADO") {
    componente = <PageDetalleDeTutoriaSolicitado />;
  } else {
    componente = <PageDetalleDeTutoriaVariable />;
  }

  return (
    <div className='h-full w-full'>
      {componente}
    </div>
  );
};

export default PageDetalleDeTutoria;