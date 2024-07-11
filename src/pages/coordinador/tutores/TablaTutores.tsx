import { AgGridReact } from 'ag-grid-react';
import React from 'react';
import DeleteIcon from '../../../assets/svg/DeleteIcon';
import { ColDef } from 'ag-grid-community';
import { Tutor } from '../../../store/types';
import { Spinner } from '../../../components';
import { CgDetailsMore } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';

type InputProps = {
  className?: string;
  tutores: Tutor[];
  loadingTutores: boolean;
  setTutorSelectedForDelete: (tutor: Tutor) => void;
};

function TablaTutores({ className, tutores, loadingTutores, setTutorSelectedForDelete }: InputProps) {
  const navigate = useNavigate();

  const defaultColDef = {
    suppressHeaderMenuButton: true,
    flex: 1,
    sortable: true,
    resizable: true,
    cellStyle: {
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex'
    },
    floatingFilter: true,
  };

  const columnDefs: ColDef[] = [
    { headerName: 'Código', field: 'pucpCode', filter: 'agNumberColumnFilter', maxWidth: 200 },
    { headerName: 'Nombres', field: 'fullname', filter: 'agTextColumnFilter', minWidth: 200 },
    { headerName: 'Correo', field: 'email', filter: 'agTextColumnFilter', minWidth: 300, maxWidth: 400 },
    {
      headerName: 'Detalles',
      field: '',
      maxWidth: 100,
      minWidth: 40,
      cellRenderer: (rowData: any) => {
        return (
          <button
            className='text-primary'
            onClick={() => {
              navigate("/tutores/disponibilidad", { state: { tutor: rowData.data } });
            }
            }
          >
            <CgDetailsMore size={24} />
          </button >
        );
      }
    }
  ];

  return (
    <div className={className}>
      {loadingTutores ?
        <div className='w-full h-full flex items-center justify-center'>
          <Spinner size='xxxxxl' color='primary' />
        </div>
        :
        <div className='w-full h-full ag-theme-alpine items-center justify-center'>
          <AgGridReact
            defaultColDef={defaultColDef}
            columnDefs={columnDefs}
            rowData={tutores}
            pagination={true}
            paginationAutoPageSize
            suppressMovableColumns
          />
        </div>
      }
    </div>
  );
}

export default TablaTutores;