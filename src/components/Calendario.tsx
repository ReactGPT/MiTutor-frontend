import React, { useState } from 'react';
import { format, addDays, startOfWeek, subWeeks, addWeeks, isSameDay } from 'date-fns';

interface Cita {
  id: string;
  fecha: Date;
  horaInicio: number;
  horaFin: number;
  nombre: string;
  facultad: string;
  especialidad: string;
}

interface CalendarioProps {
  horaInicio: number;
  horaFin: number;
  citas: Cita[];
}

const Calendario: React.FC<CalendarioProps> = ({ horaInicio, horaFin, citas }) => {
  const [fecha, setFecha] = useState(new Date());
  const primerDiaSemana = startOfWeek(fecha);
  const diasSemana = Array.from({ length: 7 }, (_, index) => {
    const fechaDia = addDays(primerDiaSemana, index);
    return {
      fecha: fechaDia,
      numero: format(fechaDia, 'd'),
      nombre: format(fechaDia, 'MMMM'),
      nombreDia: format(fechaDia, 'EEEE'),
      esDiaActual: isSameDay(fechaDia, new Date()),
    };
  });
  const horasDia = Array.from({ length: horaFin - horaInicio + 1 }, (_, index) => index + horaInicio);

  const formatHour = (hour: number) => {
    if (hour < 12) {
      return `${hour} AM`;
    } else if (hour === 12) {
      return `${hour} PM`;
    } else {
      return `${hour - 12} PM`;
    }
  };

  const avanzarSemana = () => {
    setFecha(addWeeks(fecha, 1));
  };

  const retrocederSemana = () => {
    setFecha(subWeeks(fecha, 1));
  };

  const rangoDias = `${format(startOfWeek(fecha), 'd MMMM')} - ${format(addDays(primerDiaSemana, 6), 'd MMMM yyyy')}`;

  return (
    <div className="container mx-auto px-4 py-8 font-roboto">
      <div className="flex justify-between items-center mb-4">
        <button onClick={retrocederSemana} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {'<'}
        </button>
        <div className="text-xl font-semibold">{rangoDias}</div>
        <button onClick={avanzarSemana} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {'>'}
        </button>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg p-4">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2"></th>
              {diasSemana.map((dia) => (
                <th key={dia.numero} className={`border border-gray-300 px-4 py-2 ${dia.esDiaActual ? 'bg-blue-50' : ''}`}>
                  <div className="text-sm">{dia.nombreDia}</div>
                  <div className="text-xs">{dia.numero}-{dia.nombre}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {horasDia.map((hora) => (
              <tr key={hora}>
                <td className="border border-gray-300 px-1 pb-7 bg-gray-100 text-center text-sm text-gray-700">{formatHour(hora)}</td>
                {diasSemana.map((dia) => (
                  <td key={`${dia.numero}-${hora}`} className={`border border-gray-300 ${dia.esDiaActual ? 'bg-blue-50' : ''}`} style={{ width: 'auto' }}>
                    {citas
                      .filter((cita) => isSameDay(cita.fecha, dia.fecha) && cita.horaInicio <= hora && cita.horaFin > hora)
                      .map((cita) => (
                        <div key={cita.id}>
                          {cita.nombre}
                        </div>
                      ))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendario;
