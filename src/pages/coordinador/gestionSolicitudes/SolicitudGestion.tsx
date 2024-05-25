import React, { useState, useEffect } from 'react';

// Componentes
import Button from "../../../components/Button";
import Dropdown from "../../../components/Dropdown";
import SearchInput from "../../../components/SearchInput";
import Checkbox from "../../../components/Checkbox";
import Pagination from "../../../components/Pagination";

// Icons
import IconSearch from "../../../assets/svg/IconSearch";
import AcademicUnit from "../../../assets/svg/AcademicUnit";
import State from "../../../assets/svg/State";
import Program from "../../../assets/svg/Program";
import Accept from "../../../assets/svg/Accept";
import Reject from "../../../assets/svg/Reject";

import { useSolicitudes } from '../../../store/hooks/useSolicitudes';

const SolicitudGestion: React.FC = () => {
  const { fetchSolicitudes, solicitudes, isLoading, error } = useSolicitudes();
  const [facultyId, setFacultyId] = useState<number>(1); // Asigna un valor por defecto

  useEffect(() => {
    fetchSolicitudes(facultyId);
  }, [facultyId]);

  const handleSelectUnidad = (value: string) => {
    const selectedFacultyId = value === "Facultad de Ingeniería" ? 1 : 2; // Asigna los IDs correctos según tu lógica
    setFacultyId(selectedFacultyId);
    fetchSolicitudes(selectedFacultyId);
  };

  useEffect(() => {
    console.log("Solicitudes: ", solicitudes);
  }, [solicitudes]);

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
                onSelect={(value) => console.log("Estado seleccionado:", value)}
                icon={State}
              />
            </div>
            <div>
              <Dropdown
                options={["Programa 1", "Programa 2", "Programa 3"]}
                defaultOption="Programa"
                onSelect={(value) => console.log("Programa seleccionado:", value)}
                icon={Program}
              />
            </div>
            <div className="self-end">
              <Button
                variant="call-to-action"
                onClick={() => console.log("Call to Action button clicked")}
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
              onSearch={(query) => console.log("Searching for:", query)}
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
              onSearch={(query) => console.log("Searching for:", query)}
            />
          </div>
        </div>
        <div className="mb-4 mt-8">
          <div className="flex justify-between">
            <h2 className="font-montserrat text-[26px] font-bold text-lg mb-2">
              Resultado de Solicitudes
            </h2>
            <div className="flex justify-end mb-4 space-x-4">
              <Button variant="accept" text="Aceptar" icon={Accept} onClick={() => console.log("Aceptar clicked")} />
              <Button variant="reject" text="Rechazar" icon={Reject} onClick={() => console.log("Rechazar clicked")} />
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
                <th className="py-2 border border-blue-300">Fecha Solicitud</th>
                <th className="py-2 border border-blue-300">Estado</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    Cargando solicitudes...
                  </td>
                </tr>
              )}
              {!isLoading && solicitudes.map((solicitud, index) => (
                <tr key={index}>
                  <td className="py-2 text-center border border-blue-300">
                    <Checkbox
                      boxSize="16px"
                      left={true}
                      disabled={false}
                    />
                  </td>
                  <td className="py-2 text-center border border-blue-300">{solicitud.codigo}</td>
                  <td className="py-2 text-center border border-blue-300">{solicitud.especialidad}</td>
                  <td className="py-2 text-center border border-blue-300">{solicitud.nombres}</td>
                  <td className="py-2 text-center border border-blue-300">{solicitud.tutor}</td>
                  <td className="py-2 text-center border border-blue-300">{solicitud.fechaSolicitud ? new Date(solicitud.fechaSolicitud).toLocaleDateString() : 'N/A'}</td>
                  <td className="py-2 text-center border border-blue-300">{solicitud.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={1}
          totalItems={solicitudes.length}
          itemsPerPage={5}
          onPageChange={(newPage) => console.log("Page changed to:", newPage)}
        />
      </main>
    </div>
  );
};

export default SolicitudGestion;
