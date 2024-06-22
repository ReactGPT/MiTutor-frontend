import React from 'react';
import TablaFacultad from '../../../components/Administrador/TablaFacultad';

const PageFacultadesAdmin = () => {
  const defaultColDef = {
    suppressHeaderMenuButton: true,
    flex: 1,
    sortable: true,
    resizable: true,
    cellStyle: {
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
    },
  };
  return (
    <div className="w-full h-full">
      <TablaFacultad
        titulo={"Facultades"}
        abreviatura={"Facultad"}
        defaultColDef={defaultColDef}
      />
    </div>
  );
};

export default PageFacultadesAdmin;