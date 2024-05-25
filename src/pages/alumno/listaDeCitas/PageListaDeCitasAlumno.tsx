import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Button from '../../../components/Button';
import AppointmentItem from "../../../components/Tutor/AppointmentItem";
import Pagination from "../../../components/Pagination";
import { BiSearch } from 'react-icons/bi';

const listaCita = [

  { nombre: 'Futuro Laboral', codigo: 'FL000000', estado: 'Solicitado', fecha: '05/11/2024' },
  { nombre: 'Asesoría academica', codigo: 'AA000000', estado: 'Completado', fecha: '01/11/2024' },
  { nombre: 'Programa organizacional', codigo: 'PO000000', estado: 'Registrado', fecha: '02/11/2024' },
  { nombre: 'Programa Ultimo ciclo', codigo: 'PU000000', estado: 'Pendiente', fecha: '14/11/2024' },
  { nombre: 'Futuro Laboral', codigo: 'FL000000', estado: 'Registrado', fecha: '04/11/2024' },
  { nombre: 'Futuro Laboral', codigo: 'FL000000', estado: 'Solicitado', fecha: '16/11/2024' },
  { nombre: 'Programa Ultimo ciclo', codigo: 'PU000000', estado: 'Completado', fecha: '23/11/2024' },
  { nombre: 'Futuro Laboral', codigo: 'FL000000', estado: 'Solicitado', fecha: '12/11/2024' },
  { nombre: 'Programa Ultimo ciclo', codigo: 'PU000000', estado: 'Registrado', fecha: '23/11/2024' },
  { nombre: 'Asesoría academica', codigo: 'AA000000', estado: 'Completado', fecha: '01/11/2024' },
  { nombre: 'Programa organizacional', codigo: 'PO000000', estado: 'Registrado', fecha: '02/11/2024' },
  { nombre: 'Programa Ultimo ciclo', codigo: 'PU000000', estado: 'Solicitado', fecha: '05/11/2024' },
  { nombre: 'Futuro Laboral', codigo: 'FL000000', estado: 'Registrado', fecha: '13/11/2024' },
  { nombre: 'Futuro Laboral', codigo: 'FL000000', estado: 'Pendiente', fecha: '16/11/2024' },
  { nombre: 'Futuro Laboral', codigo: 'FL000000', estado: 'Solicitado', fecha: '12/11/2024' },
  { nombre: 'Programa Ultimo ciclo', codigo: 'PU000000', estado: 'Registrado', fecha: '23/11/2024' },
  { nombre: 'Asesoría academica', codigo: 'AA000000', estado: 'Completado', fecha: '01/11/2024' },
  { nombre: 'Programa organizacional', codigo: 'PO000000', estado: 'Registrado', fecha: '02/11/2024' },
  { nombre: 'Programa Ultimo ciclo', codigo: 'PU000000', estado: 'Solicitado', fecha: '05/11/2024' },
  { nombre: 'Futuro Laboral', codigo: 'FL000000', estado: 'Registrado', fecha: '13/11/2024' },
  { nombre: 'Futuro Laboral', codigo: 'FL000000', estado: 'Pendiente', fecha: '16/11/2024' }

];

const PageListaDeCitasAlumno = () => {

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = listaCita.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const arrayCitasMostrar = listaCita.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const imprimirValores = () => {
    console.log(startIndex, endIndex);
  };

  const [query, setQuery] = useState("");

  return (
    <div className="w-full h-full">
      {/* Filtro de búsqueda */}
      <div className="w-full flex h-[12%] min-h-[60px]">
        <div className="w-full h-[50%] flex flex-row justify-right items-center bg-[rgba(235,_236,_250,_1.00)] border-custom drop-shadow-md p-5 pr-0">
          <input className="w-[77%] bg-[rgba(255,_255,_255,_0.0)] border-transparent focus:outline-none focus:placeholder-none font-roboto text-2xl text-primary" placeholder="Cosa a buscar" type="Text" value={query} onChange={e => setQuery(e.target.value)}></input>
          <div className="w-[12%] flex items-center">
            <pre className="font-montserrat text-2xl text-primary">Estado  </pre>
            <Button variant="primario" text="" onClick={() => console.log('Botón clickeado')} />
          </div>
          <div className="w-[20%] flex items-center">
            <pre className="font-montserrat text-2xl text-primary">Todas las fechas  </pre>
            <Button variant="primario" text="" onClick={() => console.log('Botón clickeado')} />
          </div>
          <div>
            <Button
              variant="call-to-action"
              onClick={() => imprimirValores()} />
          </div>
        </div>
      </div>
      {/* Item de Cita       */}
      <div className="w-full h-[65%] min-h-[60%]">
        {arrayCitasMostrar.map((cita) => (
          <AppointmentItem
            key={cita.codigo}
            nombre={cita.nombre}
            codigo={cita.codigo}
            estado={cita.estado}
            fecha={cita.fecha}
            color={cita.estado}
            href='/detalleCitaAlumno'
          />
        ))}
      </div>

      {/* Botones de cambio de indice */}
      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PageListaDeCitasAlumno;
