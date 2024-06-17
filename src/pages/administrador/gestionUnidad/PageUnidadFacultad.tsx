import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import TablaUnidad from '../../../components/Administrador/TablaUnidad';
import TablaFacultad from '../../../components/Administrador/TablaFacultad';

const PageUnidadFacultad = () => {
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
      <TablaUnidad
        titulo={"Unidades de Derivación"}
        abreviatura={"Unidad"}
        defaultColDef={defaultColDef}
      />
    </div>
  );
}

export default PageUnidadFacultad;