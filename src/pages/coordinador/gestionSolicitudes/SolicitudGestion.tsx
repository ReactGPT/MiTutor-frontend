import React, { useState, useEffect } from "react";

// Componentes
import Button from "../../../components/Button";
import Dropdown from "../../../components/Dropdown";
import SearchInput from "../../../components/SearchInput";
import Checkbox from "../../../components/Checkbox";import Pagination from "../../../components/Pagination";

// Icons
import IconSearch from "../../../assets/svg/IconSearch";
import AcademicUnit from "../../../assets/svg/AcademicUnit";
import State from "../../../assets/svg/State";
import Program from "../../../assets/svg/Program";
import Accept from "../../../assets/svg/Accept";
import Reject from "../../../assets/svg/Reject";


const SolicitudGestion: React.FC = () => {
    
  //const { solicitud, fetchSolicitud } = useSolicitudCoord(1);

  const handleSearch = (query: string) => {
    // Lógica con la búsqueda, como enviarla al servidor, filtrar datos, etc.
    console.log("Searching for:", query);
  };

  const handleSelectUnidad = (value: string) => {
    // Implementar lógica para manejar la selección de unidad académica
    console.log("Unidad seleccionada:", value);
  };

  const handleSelectEstado = (value: string) => {
    // Implementar lógica para manejar la selección de estado
    console.log("Estado seleccionado:", value);
  };

  const handleSelectPrograma = (value: string) => {
    // Implementar lógica para manejar la selección de programa
    console.log("Programa seleccionado:", value);
  };

  const handleClick = (message: string) => {
    alert(message);
  };

  const handleAccept = (id: string) => {
    console.log(`Solicitud ${id} aceptada`);
    // Implementar lógica de aceptación
  };

  const handleReject = (id: string) => {
    console.log(`Solicitud ${id} rechazada`);
    // Implementar lógica de rechazo
  };

  /*const solicitudesFiltradas = solicitud?.filter(solicitud =>
    solicitud.programName.toLowerCase().includes(searchText.toLowerCase())
  );*/

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const solicitudes = [
    { id: '1', codigo: '20202785', especialidad: 'Ingeniería Civil', nombres: 'Mónica', tutor: 'Rosa Vargas', programa: 'Cuarta Matr.', fecha: '22/04/23', estado: 'Aceptado' },
    { id: '2', codigo: '20202786', especialidad: 'Ingeniería Civil', nombres: 'Alex Pariona Conde', tutor: 'Gerardo Vasquez', programa: 'Riesgo Elim.', fecha: '23/04/23', estado: 'Solicitada' },
    { id: '1', codigo: '20202785', especialidad: 'Ingeniería Civil', nombres: 'Mónica', tutor: 'Rosa Vargas', programa: 'Cuarta Matr.', fecha: '22/04/23', estado: 'Aceptado' },
    { id: '2', codigo: '20202786', especialidad: 'Ingeniería Civil', nombres: 'Alex Pariona Conde', tutor: 'Gerardo Vasquez', programa: 'Riesgo Elim.', fecha: '23/04/23', estado: 'Solicitada' },
    { id: '1', codigo: '20202785', especialidad: 'Ingeniería Civil', nombres: 'Mónica', tutor: 'Rosa Vargas', programa: 'Cuarta Matr.', fecha: '22/04/23', estado: 'Aceptado' },  
    { id: '2', codigo: '20202786', especialidad: 'Ingeniería Civil', nombres: 'Alex Pariona Conde', tutor: 'Gerardo Vasquez', programa: 'Riesgo Elim.', fecha: '23/04/23', estado: 'Solicitada' },
    { id: '1', codigo: '20202785', especialidad: 'Ingeniería Civil', nombres: 'Mónica', tutor: 'Rosa Vargas', programa: 'Cuarta Matr.', fecha: '22/04/23', estado: 'Aceptado' },      
  ];

  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  return (
    <div className="flex flex-col">
        <main>
          <div className="mb-4">
            <h2 className="font-montserrat text-[26px] font-bold text-lg mb-2">
              Solicitud
            </h2>
            <div className="flex space-x-4 mt-4">
              <div>     
                        
                <Dropdown
                  options={[
                    "Facultad de Ingeniería",
                    "Facultad de Ciencias Sociales",
                  ]}
                  defaultOption="Unidad Académica"
                  onSelect={handleSelectUnidad}
                  icon={AcademicUnit}
                />
              </div>
              <div>
                <Dropdown
                  options={["Pendiente", "Aprobado", "Rechazado"]}
                  defaultOption="Estado"
                  onSelect={handleSelectEstado}
                  icon={State}
                />
              </div>
              <div>
                <Dropdown
                  options={["Programa 1", "Programa 2", "Programa 3"]}
                  defaultOption="Programa"
                  onSelect={handleSelectPrograma}
                  icon={Program}
                />
              </div>
              <div className="self-end">
                <Button
                  variant="call-to-action"
                  onClick={() => handleClick("Call to Action button clicked")}
                  icon={IconSearch}
                />
              </div>
            </div>
          </div>
          <div className="mb-4 mt-6">
            <h2 className="font-montserrat text-[26px] font-bold text-lg mb-2">
              Tutor
            </h2>
            <div className="flex space-x-4 mt-4">
              <SearchInput
                placeholder="Nombre o apellido"
                onSearch={handleSearch}
              />
            </div>
          </div>
          <div className="mb-4 mt-8">
            <h2 className="font-montserrat text-[26px] font-bold text-lg mb-2">
              Alumno
            </h2>
            <div className="flex space-x-8 mt-4">
              <SearchInput
                placeholder="Nombre, apellido, o código de alumno"
                onSearch={handleSearch}
              />
            </div>
          </div>
          
          <div className="mb-4 mt-8">
            
            <div className="flex justify-between">
              <h2 className="font-montserrat text-[26px] font-bold text-lg mb-2">
                Resultado de Solicitudes
              </h2>
              <div className="flex justify-end mb-4 space-x-4">
                <Button variant="accept" text="Aceptar" icon={Accept} onClick={handleAccept} />
                <Button variant="reject" text="Rechazar" icon={Reject} onClick={handleReject} />
              </div>
            </div>

            <table className="min-w-full bg-white">
              <thead>
                <tr>
                <th className="py-2 border border-blue-300">Seleccionar</th>
                  <th className="py-2 border border-blue-300">Código</th>
                  <th className="py-2 border border-blue-300">Especialidad</th>
                  <th className="py-2 border border-blue-300">Nombres</th>
                  <th className="py-2 border border-blue-300">Tutor</th>
                  <th className="py-2 border border-blue-300">Programa</th>
                  <th className="py-2 border border-blue-300">Fecha Solicitud</th>
                  <th className="py-2 border border-blue-300">Estado</th>
                </tr>
              </thead>
              <tbody>
                {solicitudes.map((solicitud) => (
                  <tr key={solicitud.id}>
                    <td className="py-2 text-center border border-blue-300">
                      <div className="flex justify-center">
                        <Checkbox
                          boxSize="16px"
                          left={true}
                          disabled={false}
                          //onChange={() => handleCheckboxChange(solicitud.id)}
                          //value={isSelected(solicitud.id)}
                        />
                      </div>                     
                    </td>
                    <td className="py-2 text-center border border-blue-300">{solicitud.codigo}</td>
                    <td className="py-2 text-center border border-blue-300">{solicitud.especialidad}</td>
                    <td className="py-2 text-center border border-blue-300">{solicitud.nombres}</td>
                    <td className="py-2 text-center border border-blue-300">{solicitud.tutor}</td>
                    <td className="py-2 text-center border border-blue-300">{solicitud.programa}</td>
                    <td className="py-2 text-center border border-blue-300">{solicitud.fecha}</td>
                    <td className="py-2 text-center border border-blue-300">{solicitud.estado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            //totalItems={solicitudesFiltradas.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />

        </main>
    </div>
  );
};

export default SolicitudGestion;
