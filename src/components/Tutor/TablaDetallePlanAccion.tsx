import { useMemo, useState, StrictMode } from 'react';
//import reactLogo from './assets/react.svg';
//import viteLogo from '/vite.svg';
//import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';
import React from 'react';
import EtiquetaCompromiso from './EtiquetaCompromiso';
import axios from 'axios';
import { useEffect } from 'react';
import { Commintment } from '../../store/types/Commintment';
import ModalAdvertencia from './ModalAdvertencia';
import { RiErrorWarningLine } from 'react-icons/ri';
import ModalEditarCompromiso from './ModalEditarCompromiso';
import ActionCellRenderer from './ActionCellRenderer'; // Importa el nuevo componente
import {Services as ServicesProperties} from '../../config';

type TablaDetalleProps = {
  onclickEdit: () => void;
  onclickDelete: () => void;
  actionPlanId: number;
};

const TablaDetalle: React.FC<TablaDetalleProps> = ({
  onclickEdit,
  onclickDelete,
  actionPlanId
}) => {

  const [rowData, setRowData] = useState<any[]>([]);
  const [deleteCommintModalOpen, setdeleteCommintModalOpen] = useState(false);
  const [editCommintModalOpen, seteditCommintModalOpen] = useState(false);
  const [commitmentId, setCommitmentId] = useState(0);
  const [compromiso, setCompromiso] = useState<Commintment>({} as Commintment);

  const handleConfirmDeleteCommit = (data: Commintment) => {
    setCommitmentId(data.commitmentId);
    setdeleteCommintModalOpen(true);
  };

  const openModalEdit = (data: Commintment) => {
    setCompromiso(data);
    seteditCommintModalOpen(true);
  };

  const closeModalEdit = () => {
    seteditCommintModalOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, [actionPlanId]);

  const fetchData = async () => {
    try {
      const response = await axios.get(ServicesProperties.BaseUrl+'/listarCommitment?IdPlanAction='+actionPlanId);
      setRowData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const rowData3 = rowData.map(item => ({
    Fecha_Creacion: new Date(item.creationDate).toLocaleDateString(),
    Fecha_Modificacion: new Date(item.modificationDate).toLocaleDateString(),
    Compromiso: item.description,
    Estado: item.commitmentStatusDescription,
    commitmentId: item.commitmentId,
    CommitmentStatusId: item.commitmentStatusId
  }));

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      headerName: 'Fecha de Creación',
      field: 'Fecha_Creacion',
      filter: 'agDateColumnFilter',
      minWidth: 150,
      maxWidth: 200,
      cellStyle: { textAlign: 'left' }
    },
    {
      headerName: 'Fecha de Última Modificación',
      field: 'Fecha_Modificacion',
      filter: 'agDateColumnFilter',
      minWidth: 200,
      maxWidth: 250,
      cellStyle: { textAlign: 'left' }
    },
    {
      headerName: 'Compromiso',
      field: 'Compromiso',
      flex: 1,
      editable: true,
      cellStyle: {
        textAlign: 'left',
        justifyContent: 'left',
        flex: 1
      }
    },
    {
      headerName: 'Estado',
      field: 'Estado',
      minWidth: 150,
      maxWidth: 250,
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ["Pendiente", "En Proceso", "Hecho"],
      },
      cellRenderer: (params: { value: string }) => <EtiquetaCompromiso variant={params.value} />,
    },
    {
      headerName: 'Acciones',
      field: 'commitmentId',
      minWidth: 100,
      maxWidth: 150,
      filter: false,
      cellRenderer: (params: any) => (
        <ActionCellRenderer
          data={params.data}
          openModalEdit={openModalEdit}
          handleConfirmDeleteCommit={handleConfirmDeleteCommit}
        />
      )
    }
  ]);

  const handleDeleteCompromiso = async () => {
    await axios.put(ServicesProperties.BaseUrl+'/eliminarCommitment?commitmentId=' + commitmentId);
    setdeleteCommintModalOpen(false);
    fetchData();
  };

  const defaultColDef = useMemo(() => {
    return {
      suppressMenu: true,
      flex: 1,
      sortable: true,
      resizable: true,
      cellStyle: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
      },
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    }
  }, []);

  return (
    <div className="flex py-5">
      {deleteCommintModalOpen && (
        <ModalAdvertencia
          title="¿Está seguro de eliminar el compromiso?"
          description="Esta acción no puede revertirse."
          icon={RiErrorWarningLine}
          iconSize={60}
          onClose={() => setdeleteCommintModalOpen(false)}
          action={handleDeleteCompromiso}
        />
      )}
      {editCommintModalOpen && (
        <ModalEditarCompromiso 
          onClose={closeModalEdit}
          updatePage={fetchData}
          compromiso={compromiso}
        />
      )}
      <div
        className="ag-theme-alpine"
        style={{ height: '500px', width: '100%' }}
      >
        <AgGridReact
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}
          rowData={rowData3}
          rowHeight={60}
          pagination={true}
          paginationPageSize={5}
          paginationPageSizeSelector={[5, 10, 15]}
          onRowClicked={(event) => {
            setCommitmentId(event.data.commitmentId);
            setCompromiso(event.data);
            console.log(event.data.commitmentId);
            console.log('compromiso: ', compromiso);
          }}
        />
      </div>
    </div>
  );
};

export default TablaDetalle;
