import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '../../../components'; // Asegúrate de que la ruta del Button sea correcta
import { Services as ServicesProperties } from '../../../config';
import { Sector } from 'recharts';
import { useAuth } from '../../../context';
import jsPDF from 'jspdf';
import { IconSearch } from '../../../assets';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Bar, Cell } from 'recharts';
import { getTutorId } from '../../../store/hooks/RolesIdTutor';

interface StudentData {
  studentId: number;
  name: string;
  lastName: string;
  secondLastName: string;
  phone: string;
  specialtyName: string;
  facultyName: string;
}

interface DetailedStudentData extends StudentData {
  tutoringProgramId: number;
  programName: string;
  description: string;
}
interface Tutor {
  tutorId: number;
  userAccount: {
    institutionalEmail: string;
    persona: {
      name: string;
      lastName: string;
      secondLastName: string;
    };
  };
}

interface Program {
  tutoringProgramId: number;
  programName: string;
  studentCount: number;
  color?: string;
}

interface Appointment {
  appointmentId: number;
  startTime: string;
  endTime: string;
  creationDate: string;
  reason: string;
  studentCount: number;
  tutorId: number;
  tutorName: string;
  tutorLastName: string;
  tutorSecondLastName: string;
  appointmentTutorId: number;
  appointmentStatusId: number;
  classroom: string;
  isInPerson: number;
  appointmentStatusName: string;
  facultyName: string;
}

interface ProgramVirtualFace {
  cantidadPresenciales: number;
  cantidadVirtuales: number;
}
interface Program {
  tutoringProgramId: number;
  programName: string;
  programDescription: string;
  tutorName: string;
  lastName: string;
  secondLastName: string;
  nameFaculty: string;
}


const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};
const className = 'font-roboto bg-[rgba(235,236,250,1)] shadow-custom border border-solid border-[rgba(116,170,255,0.70)]';

const PageIndicadorAlumnoTutor: React.FC = () => {
  const { userData } = useAuth();
  const tutorId = getTutorId(userData);

  const api = axios.create({
    baseURL: ServicesProperties.BaseUrl, // Asegúrate de que esta URL es correcta
  });

  const [students, setStudents] = useState<StudentData[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<DetailedStudentData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [programs, setPrograms] = useState<Program[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [programVirtualFace, setProgramVirtualFace] = useState<ProgramVirtualFace[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const [programsTutor, setProgramsTutor] = useState<Program[]>([]);

  useEffect(() => {
    const loadStudentsData = async () => {
      const data = await fetchStudentsData(tutorId);
      setStudents(data);
    };
    loadStudentsData();
  }, []);
  useEffect(() => {
    fetchData();
    fetchAppointments();
    fetchProgramVirtualFace();
    fetchProgramaTutorias();
  }, []);
  const fetchProgramaTutorias = async () => {
    try {
      // Realiza la petición al servicio para obtener los programas de tutoría del tutor
      //const response = await fetch(`http://api.daoch.me/listarProgramasDeTutoriaPorTutorId/${tutor?.tutorId}`);
      const response = await fetch(`${ServicesProperties.BaseUrl}/listarProgramasDeTutoriaPorTutorId/${tutorId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      // Asigna los programas de tutoría al estado
      setProgramsTutor(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchData = async () => {
    try {
      //let url = `http://api.daoch.me/listarProgramaFecha/${tutor?.tutorId}`;
      let url = `${ServicesProperties.BaseUrl}/listarProgramaFecha/${tutorId}`;
      if (startDate && endDate) {
        url += `?startDate=${startDate}&endDate=${endDate}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      // Añadir colores únicos a cada programa
      const colors = [
        '#ffc658', '#8884d8', '#82ca9d', '#ff8042', '#0088fe',
        '#ffcc00', '#6699CC', '#E4A032', '#329065', '#B3CC57',
        '#D2691E', '#736AFF', '#6B8E23', '#C23B22', '#6495ED'
      ];
      const programsWithColors = data.data.map((program: Program, index: number) => ({
        ...program,
        color: colors[index % colors.length],
      }));
      setPrograms(programsWithColors);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const fetchAppointments = async () => {
    try {
      //let url = `http://api.daoch.me/listarAppointmentPorFecha/${tutor?.tutorId}`;
      let url = `${ServicesProperties.BaseUrl}/listarAppointmentPorFecha/${tutorId}`;
      if (startDate && endDate) {
        url += `?startDate=${startDate}&endDate=${endDate}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log(data.data);
      setAppointments(data.data);

    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchProgramVirtualFace = async () => {
    try {
      //let url = `http://api.daoch.me/listarProgramaVirtualFace/${tutor?.tutorId}`;
      let url = `${ServicesProperties.BaseUrl}/listarProgramaVirtualFace/${tutorId}`;
      if (startDate && endDate) {
        url += `?startDate=${startDate}&endDate=${endDate}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setProgramVirtualFace(data.data);

    } catch (error) {
      console.error('Error fetching program virtual face:', error);
    }
  };

  const fetchStudentsData = async (tutorId: number) => {
    try {
      const response = await api.get<{ success: boolean, data: StudentData[]; }>(`/listarAlumnosPorIdTutor/${tutorId}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching students data:", error);
      return [];
    }
  };

  const fetchStudentDetails = async (tutorId: number, studentId: number) => {
    try {
      const response = await api.get<{ success: boolean, data: DetailedStudentData; }>(`/obtenerInfoEstudiantePorTutor/${tutorId}/${studentId}`);
      setSelectedStudent(response.data.data);
      setIsModalOpen(true); // Aquí debe abrir el modal
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };
  const handleSearch = () => {
    fetchData();
    fetchAppointments();
    fetchProgramVirtualFace();
  };


  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };




  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const appointment = payload[0].payload;
      return (
        <div className="custom-tooltip bg-white p-2 border border-gray-300">
          <p className="text-blue-500">{`Cita ${label}: ${appointment.studentCount} estudiantes`}</p>
          <p>{`Inicio: ${new Date(appointment.startTime).toLocaleTimeString()}`}</p>
          <p>{`Fin: ${new Date(appointment.endTime).toLocaleTimeString()}`}</p>
          <p>{`Fecha de Creación: ${appointment.creationDate}`}</p>
          <p>{`Razón: ${appointment.reason}`}</p>
        </div>
      );
    }
    return null;
  };

  const pieData = programVirtualFace.length > 0 ? [
    { name: 'Presencial', value: programVirtualFace[0].cantidadPresenciales, fill: '#8884d8' },
    { name: 'Virtual', value: programVirtualFace[0].cantidadVirtuales, fill: '#82ca9d' }
  ] : [{ name: 'Presencial', value: 0, fill: '#8884d8' }, { name: 'Virtual', value: 0, fill: '#82ca9d' }];

  // Verificar si appointments está vacío
  if (appointments.length === 0) {
    pieData.forEach((data) => (data.value = 0)); // Reset both values to 0%
  }
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };
  const handleExportClick1 = async () => {
    if (programsTutor.length > 0) {
      const doc = new jsPDF();
      doc.setFont('helvetica');
      doc.setFontSize(12);
      doc.setTextColor(0);

      // Definir márgenes
      const marginLeft = 20;
      const marginTop = 20;
      const marginRight = 20;
      const marginBottom = 20;
      const pageHeight = doc.internal.pageSize.height;

      // Función para imprimir una cita
      const printAppointment = (doc: any, appointment: any, x: number, y: number): number => {
        const lineHeight = 5; // Altura entre líneas
        const sectionHeight = lineHeight * 6; // Espacio que ocupará una cita

        if (y + sectionHeight > pageHeight - marginBottom) {
          doc.addPage();
          addWatermarkAndBackground(doc);
          y = marginTop;
        }

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');

        // Hora de inicio
        const startTime = new Date(appointment.startTime);
        const formattedStartTime = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        doc.text(`Hora de inicio: ${formattedStartTime}`, x, y);
        y += lineHeight;

        // Hora de fin
        const endTime = new Date(appointment.endTime);
        const formattedEndTime = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        doc.text(`Hora de fin: ${formattedEndTime}`, x, y);
        y += lineHeight;

        // Fecha de creación
        const creationDate = new Date(appointment.creationDate);
        const formattedCreationDate = creationDate.toLocaleDateString();
        doc.text(`Fecha de creación: ${formattedCreationDate}`, x, y);
        y += lineHeight;

        // Razón
        doc.text(`Razón: ${appointment.reason}`, x, y);
        y += lineHeight;

        // Cantidad de estudiantes
        doc.text(`Cantidad de estudiantes: ${appointment.studentCount}`, x, y);
        y += lineHeight + 5; // Espacio adicional entre citas

        return y;
      };

      // Función para agregar marca de agua y fondo
      const addWatermarkAndBackground = (doc: any) => {
        doc.setFillColor(255, 255, 255);
        doc.rect(0, 0, 210, 297, 'F'); // 210x297 es el tamaño A4 en mm

        doc.setTextColor(220);
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        for (let i = -40; i < 297; i += 20) {
          for (let j = -10; j < 210; j += 20) {
            doc.setFontSize(12);
            doc.textWithLink('PUCP', j, i, { angle: 45, url: 'https://www.pucp.edu.pe/' });
          }
        }

        doc.setTextColor(0);
        doc.setFontSize(12);
      };

      const addHeader = (doc: any, marginTop: number, includeTutorName: boolean) => {
        if (includeTutorName) {
          doc.setFontSize(20);
          doc.setFont('helvetica', 'bold');
          doc.text(`${userData?.username?.toUpperCase()}`, 105, marginTop + 10, { align: 'center' });
        }

        let y = marginTop + (includeTutorName ? 30 : 10);

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Programas Académicos', 105, y, { align: 'center' });
        y += 10;
        doc.line(marginLeft, y, 210 - marginRight, y);
        return y + 5;
      };


      addWatermarkAndBackground(doc);

      let y = addHeader(doc, marginTop, true);

      // Detalles de los programas académicos
      programsTutor.forEach(program => {
        if (y + 30 > pageHeight - marginBottom) {
          doc.addPage();
          addWatermarkAndBackground(doc);
          y = addHeader(doc, marginTop, false); // Cambiado a false
        }

        // Nombre del programa
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        y += 5;
        doc.text(`Nombre del programa:`, marginLeft, y);
        doc.setFont('helvetica', 'normal');
        doc.text(`${program.programName}`, marginLeft + 60, y); // Ajustamos la posición en x
        y += 10;

        // Descripción del programa
        const descriptionLines = doc.splitTextToSize(program.programDescription, 170);
        descriptionLines.forEach((line: string) => {
          if (y + 5 > pageHeight - marginBottom) {
            doc.addPage();
            addWatermarkAndBackground(doc);
            y = marginTop;
          }
          doc.text(line, marginLeft, y);
          y += 5;
        });

        // Facultad
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        y += 5;
        doc.text(`Facultad:`, marginLeft, y);
        doc.setFont('helvetica', 'normal');
        doc.text(`${program.nameFaculty}`, marginLeft + 20, y); // Ajustamos la posición en x
        y += 7;

        // Separador
        doc.line(marginLeft, y, 210 - marginRight, y);
        y += 5;
      });

      // Separador
      if (y + 10 > pageHeight - marginBottom) {
        doc.addPage();
        addWatermarkAndBackground(doc);
        y = marginTop;
      }
      y += 10;

      // Añadir un salto de página antes de las citas
      doc.addPage();
      addWatermarkAndBackground(doc);
      y = marginTop;

      // Título de las citas
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Citas del Tutor', 105, y, { align: 'center' });
      y += 10;
      doc.line(marginLeft, y, 210 - marginRight, y);
      y += 10;

      // Dividir las citas en dos columnas
      const halfAppointments = Math.ceil(appointments.length / 2);
      const firstColumnAppointments = appointments.slice(0, halfAppointments);
      const secondColumnAppointments = appointments.slice(halfAppointments);

      const rowHeight = 30; // Altura estimada para cada cita

      let xFirstColumn = marginLeft;
      let xSecondColumn = 105 + marginRight; // Separación de columnas
      let index = 0;
      let yFirstColumn = y;
      let ySecondColumn = y;
      while (index < Math.max(firstColumnAppointments.length, secondColumnAppointments.length)) {
        if (yFirstColumn + rowHeight > pageHeight - marginBottom || ySecondColumn + rowHeight > pageHeight - marginBottom) {
          doc.addPage();
          addWatermarkAndBackground(doc);
          yFirstColumn = marginTop;
          ySecondColumn = marginTop;
        }

        // Primera columna
        if (index < firstColumnAppointments.length) {
          const appointment = firstColumnAppointments[index];
          yFirstColumn = printAppointment(doc, appointment, xFirstColumn, yFirstColumn);
        }

        // Segunda columna
        if (index < secondColumnAppointments.length) {
          const appointment = secondColumnAppointments[index];
          ySecondColumn = printAppointment(doc, appointment, xSecondColumn, ySecondColumn);
        }

        index++;
      }

      doc.save(`detalle_${userData?.username}.pdf`);
    }
  };
  const handleExportClick2 = async () => {
    if (selectedStudent) {
      const doc = new jsPDF();
      doc.setFont('helvetica');
      doc.setFontSize(12);
      doc.setTextColor(0);

      // Definir márgenes y dimensiones de página
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;
      const marginLeft = 20;
      const marginTop = 20;
      const marginBottom = 20;

      // Función para agregar marca de agua y fondo
      const addWatermarkAndBackground = () => {
        doc.setFillColor(255, 255, 255);
        doc.rect(0, 0, pageWidth, pageHeight, 'F'); // Ajuste para cubrir toda la página

        doc.setTextColor(220);
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        for (let i = -40; i < pageHeight; i += 20) {
          for (let j = -10; j < pageWidth; j += 20) {
            doc.setFontSize(12);
            doc.textWithLink('PUCP', j, i, { angle: 45, url: 'https://www.pucp.edu.pe/' });
          }
        }

        doc.setTextColor(0);
        doc.setFontSize(12);
      };

      // Función para agregar encabezado
      const addHeader = (includeStudentName: any) => {
        if (includeStudentName) {
          doc.setFontSize(20);
          doc.setFont('helvetica', 'bold');
          doc.text(`${selectedStudent.name.toUpperCase()} ${selectedStudent.lastName.toUpperCase()} ${selectedStudent.secondLastName.toUpperCase()}`, pageWidth / 2, marginTop + 10, { align: 'center' });
        }

        let y = includeStudentName ? marginTop + 30 : marginTop + 10;

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Información del Estudiante', pageWidth / 2, y, { align: 'center' });
        y += 10;
        doc.line(marginLeft, y, pageWidth - marginLeft, y); // Línea horizontal después del encabezado
        return y + 5; // Retornamos la posición vertical después del encabezado
      };

      // Agregar marca de agua y fondo
      addWatermarkAndBackground();

      // Inicializar posición vertical y agregar encabezado
      let currentY = addHeader(true);

      // Detalles del estudiante
      const details = [
        { label: 'ID del Estudiante:', value: selectedStudent.studentId },
        { label: 'Teléfono:', value: selectedStudent.phone },
        { label: 'Especialidad:', value: selectedStudent.specialtyName },
        { label: 'Facultad:', value: selectedStudent.facultyName },
        { label: 'Programa de Tutoría:', value: selectedStudent.programName },
        { label: 'Descripción del Programa:', value: selectedStudent.description }
      ];

      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');

      // Recorremos los detalles y los agregamos al documento
      details.forEach(({ label, value }) => {
        // Dividir el texto largo en líneas para que quepa en la página
        const lines = doc.splitTextToSize(`${label} ${value}`, pageWidth - 2 * marginLeft);

        // Recorremos cada línea y la agregamos al PDF
        lines.forEach((line: any, index: any) => {
          if (currentY + 10 > pageHeight - marginBottom) {
            doc.addPage(); // Agregamos una nueva página si el texto no cabe en la página actual
            addWatermarkAndBackground(); // Volvemos a agregar marca de agua y fondo en la nueva página
            currentY = marginTop; // Reiniciamos la posición vertical en la parte superior de la página
          }
          doc.text(line, marginLeft, currentY, { align: 'justify' }); // Alineamos el texto justificado
          currentY += 10; // Incrementamos la posición vertical para la próxima línea
        });
      });

      // Agregar título de historial de citas
      doc.setFont('helvetica', 'bold');
      doc.text(`Historial de Citas con el Tutor:`, marginLeft, currentY + 10);
      currentY += 15;

      // Obtener y mostrar las citas del estudiante con el tutor
      try {
        const response = await axios.get(`https://localhost:44369/listarCitasPorEstudianteYTutor/${tutorId}/${selectedStudent.studentId}`);
        const appointments = response.data;

        // Recorrer las citas y agregarlas al documento
        appointments.forEach((appointment: any) => {
          if (currentY + 10 > pageHeight - marginBottom) {
            doc.addPage(); // Agregamos una nueva página si el texto no cabe en la página actual
            addWatermarkAndBackground(); // Volvemos a agregar marca de agua y fondo en la nueva página
            currentY = marginTop; // Reiniciamos la posición vertical en la parte superior de la página
          }
          doc.setFont('helvetica', 'normal');
          doc.text(`Fecha: ${appointment.fecha}`, marginLeft, currentY);
          currentY += 10;
          doc.text(`Observaciones: ${appointment.observaciones}`, marginLeft + 10, currentY);
          currentY += 10;
        });

      } catch (error) {
        console.error('Error al obtener citas:', error);
      }

      // Guardar el documento PDF con el nombre adecuado
      doc.save(`detalle_estudiante_${selectedStudent.studentId}.pdf`);
    }
  };


  return (
    <div className='flex flex-col w-full h-full gap-2'>
      <div className="flex justify-between">

        <button className="bg-primary cursor-default rounded-l-full rounded-r-full text-white px-5 shadow-custom border border-solid border-[rgba(116,170,255,0.70)] active:bg-black hover:cursor-pointer ml-6" onClick={handleExportClick1}>
          Exportar
        </button>

        <div className="max-h-[40px] rounded-2xl flex">
          <p className={`text-center flex items-center justify-center w-36 ${className} border-r-0 rounded-l-full`}>Inicio:</p>
          <input
            type="date"
            className={`${className} border-l-0`}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <p className={`text-center flex items-center justify-center w-28 ${className} border-r-0`}>Fin:</p>
          <input
            type="date"
            className={`${className} border-l-0`}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button className="bg-primary cursor-default rounded-r-2xl text-white px-5 shadow-custom border border-solid border-[rgba(116,170,255,0.70)] active:bg-black hover:cursor-pointer" onClick={handleSearch}>
            <IconSearch />
          </button>
        </div>

      </div>

      <div className="bg-gray-100 py-2 px-4 text-center ">
        <h1 className="font-montserrat text-2xl font-bold text-primary">
          {`${userData?.userInfo?.personInfo.name} ${userData?.userInfo?.personInfo.lastName} ${userData?.userInfo?.personInfo.secondLastName}`}
        </h1>
      </div>

      <div className="flex gap-4">

        <div className="w-1/3 h-screen">
          <div className="bg-white shadow-md rounded-md overflow-hidden max-w-lg mx-auto">
            <div className="bg-primary py-2 px-4">
              <h2 className="text-xl font-semibold text-white text-center">Listado de Alumnos</h2>
            </div>
            <div className="p-4">
              {students.map(student => (
                <div key={student.studentId} className="bg-gray-100 p-4 mb-2 rounded-md shadow-sm cursor-pointer" onClick={() => fetchStudentDetails(tutorId, student.studentId)}>
                  <h3 className="font-semibold">{student.name} {student.lastName} {student.secondLastName}</h3>
                  <p>Teléfono: {student.phone}</p>
                  <p>Especialidad: {student.specialtyName}</p>
                  <p>Facultad: {student.facultyName}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-full w-full bg-gray-200 flex flex-col shadow-md">

          <div className="bg-primary py-2 px-4">
            <h2 className="text-xl font-semibold text-white text-center">Cantidad de alumnos por programa</h2>
          </div>

          <div className="h-1/2 m-4 shadow-md rounded-md overflow-hidden" id="chart-container">
            <div className="h-full bg-gray-200">

              <ResponsiveContainer width="100%" height="100%">
                {programs.every(program => program.studentCount === 0) ? (
                  <div className="text-center font-montserrat">No se encontraron datos para esta fecha</div>
                ) : (
                  <PieChart>
                    <Pie
                      data={programs}
                      dataKey="studentCount"
                      nameKey="programName"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {programs.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                      wrapperStyle={{ fontWeight: 'bold' }}
                      payload={programs.map((entry, index) => ({
                        value: entry.programName,
                        type: 'square',
                        color: entry.color,
                        id: `legend-${index}`,
                      }))}
                    />
                  </PieChart>
                )}
              </ResponsiveContainer>

            </div>
          </div>

          <div className="bg-primary py-2 px-4">
            <h2 className="text-xl font-semibold text-white text-center">Tipo de Programas</h2>
          </div>

          <div className="h-1/2 bg-white-300 m-4 flex-grow p-4 overflow-auto">
            <div className="h-full bg-gray-200">
              {programVirtualFace.every(({ cantidadPresenciales, cantidadVirtuales }) => cantidadPresenciales === 0 && cantidadVirtuales === 0) ? (
                <div className="text-center font-montserrat">No se encontraron datos para esta fecha</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      onMouseEnter={onPieEnter}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

        </div>
      </div>

      <Transition.Root show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={closeModal}>
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-blue-100 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-md w-full p-6">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 text-center">Información del Alumno</h2>
                </div>
                {selectedStudent && (
                  <div>
                    <p><strong>Nombre:</strong> {selectedStudent.name} {selectedStudent.lastName} {selectedStudent.secondLastName}</p>
                    <p><strong>Teléfono:</strong> {selectedStudent.phone}</p>
                    <p><strong>Especialidad:</strong> {selectedStudent.specialtyName}</p>
                    <p><strong>Facultad:</strong> {selectedStudent.facultyName}</p>
                    <p><strong>Programa de Tutoría:</strong> {selectedStudent.programName}</p>
                    <p><strong>Descripción:</strong> {selectedStudent.description}</p>
                  </div>
                )}
                <div className="flex justify-center pt-5 space-x-16">
                  <Button text='Cerrar' onClick={closeModal} />
                  <Button text='Exportar' onClick={handleExportClick2} />
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default PageIndicadorAlumnoTutor;
