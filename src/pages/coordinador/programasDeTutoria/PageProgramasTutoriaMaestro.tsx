import * as React from 'react';
import { useState, useEffect } from 'react';
import ProgramaTutoríaSearchBar from './ProgramaTutoríaSearchBar';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';
import CustomProgramaTutoriaGridButton from './CustomProgramaTutoriaGridButton';
import { DetailsIcon } from '../../../assets';
import { useNavigate } from 'react-router-dom';

export default function PageProgramasTutoriaMaestro() {
    const navigate=useNavigate();
    
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
    const columnDefs: ColDef[] = [
        { headerName: 'Código Tutoría', field: 'cod_tutoria',maxWidth:150 },
        { headerName: 'Nombre', field: 'nombre_tutoria'},
        { headerName: 'Facultad/Especialidad', field: 'unidad_academica' },
        {
          headerName: 'Cantidad Tutores',
          field: 'cant_tutores'
        },
        {
            headerName:'',
            field:'',
            maxWidth:60,
            minWidth:40,
            cellRenderer: CustomProgramaTutoriaGridButton,
            cellRendererParams:{
                onClick: ()=>{
                    navigate("/");
                },
                icon:DetailsIcon,
                iconSize:4
            }
        }

    ];
    const rowData=[{
        cod_tutoria:"TC000000",
        nombre_tutoria:"Cachimbos Ciencias",
        unidad_academica:"Ciencias e Ing.",
        cant_tutores:17
    },
    {
        cod_tutoria:"TC000001",
        nombre_tutoria:"Futuro Laboral",
        unidad_academica:"Ciencias e Ing.",
        cant_tutores:35
    },
    {
        cod_tutoria:"TC000002",
        nombre_tutoria:"Primeras Prácticas",
        unidad_academica:"Ing. Informática",
        cant_tutores:4
    },
    {
        cod_tutoria:"TC000003",
        nombre_tutoria:"Maestrías",
        unidad_academica:"Ing. Informática",
        cant_tutores:15
    },
    {
        cod_tutoria:"TC000004",
        nombre_tutoria:"Cachimbos Ciencias",
        unidad_academica:"Ciencias e Ing.",
        cant_tutores:17
    },
    {
        cod_tutoria:"TC000005",
        nombre_tutoria:"Cachimbos Ciencias",
        unidad_academica:"Ciencias e Ing.",
        cant_tutores:17
    },
    {
        cod_tutoria:"TC000006",
        nombre_tutoria:"Cachimbos Ciencias",
        unidad_academica:"Ciencias e Ing.",
        cant_tutores:17
    },
    {
        cod_tutoria:"TC000007",
        nombre_tutoria:"Cachimbos Ciencias",
        unidad_academica:"Ciencias e Ing.",
        cant_tutores:17
    },
    {
        cod_tutoria:"TC000008",
        nombre_tutoria:"Cachimbos Ciencias",
        unidad_academica:"Ciencias e Ing.",
        cant_tutores:17
    },
    {
        cod_tutoria:"TC000009",
        nombre_tutoria:"Cachimbos Ciencias",
        unidad_academica:"Ciencias e Ing.",
        cant_tutores:17
    },
    {
        cod_tutoria:"TC000010",
        nombre_tutoria:"Cachimbos Ciencias",
        unidad_academica:"Ciencias e Ing.",
        cant_tutores:17
    }

];

    return (
    <div className='flex w-full h-full flex-col space-y-10 mt-5'>
        <div className='flex w-full h-[10%]'>
            <ProgramaTutoríaSearchBar/>
        </div>
        <div className='flex w-full h-[75%] ag-theme-alpine'>
            <div className='w-full h-full'>
                <AgGridReact
                    defaultColDef={defaultColDef}
                    columnDefs={columnDefs}
                    rowData={rowData}
                />
            </div>
            
        </div>
        
    </div>
  )
}
