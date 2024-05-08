//import { useState } from 'react';
//import reactLogo from './assets/react.svg';
//import viteLogo from '/vite.svg';
//import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';
import Button from '../Button';
import { DetailsIcon } from '../../assets';
import React from 'react';

type TablaDetalleProps = {
    onclick: () => void;
};

const TablaDetalle: React.FC<TablaDetalleProps> = ({
    onclick
}) => {

    const defaultColDef = {
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
    };

    const columnDefs: ColDef[] = [
        {
            headerName: 'Código',
            field: 'Código',
            minWidth: 200,
            maxWidth: 200,
            cellStyle: { textAlign: 'left', justifyContent: 'left' }
        },
        {
            headerName: 'Estudiante',
            field: 'Estudiante',
            minWidth: 250,
            maxWidth: 500,
            cellStyle: { textAlign: 'left', justifyContent: 'left' }
        },
        {
            headerName: 'Correo PUCP',
            field: 'Correo_PUCP',
            minWidth: 200,
            maxWidth: 300,
            cellStyle: { textAlign: 'left', justifyContent: 'left' }
        },
        {
            headerName: 'Ver más',
            minWidth: 200,
            maxWidth: 200,
            cellStyle: { textAlign: 'left', justifyContent: 'left' },
            cellRenderer: Button,
            cellRendererParams: { icon: DetailsIcon, variant: 'primario', onClick: onclick },
        }
    ];

    const rowData3 = [
        {
            Código: '20206759',
            Estudiante: 'Perez Aliaga, Alonso Fernando',
            Correo_PUCP: 'alonso.berrospi@pucp.edu.pe'
        },
        {
            Código: '20206523',
            Estudiante: 'Espinoza Suarez, Lucia Alejandra',
            Correo_PUCP: 'lucia.espinoza@pucp.edu.pe'
        },
        {
            Código: '20204748',
            Estudiante: 'Cruz Soto, Juan Carlos',
            Correo_PUCP: 'cruz.juan@pucp.edu.pe'
        },
    ];
    return (
        <div className="flex py-5">
            <div
                className="ag-theme-alpine"
                style={{ height: '300px', width: '100%' }}
            >
                <AgGridReact
                    defaultColDef={defaultColDef}
                    columnDefs={columnDefs}
                    rowData={rowData3}
                    rowHeight={60}
                />
            </div>
        </div>
    );
};

export default TablaDetalle;