import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import ModalProgramaAcademico from '../../../components/ModalProgramaAcademico';
import { Button, Dropdown, SearchInput } from '../../../components';
import IconSearch from "../../../assets/svg/IconSearch";
import { TrophyIcon } from '@heroicons/react/16/solid';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ModalAlumnos from './ModalAlumnos';
import noAvatar from '../../../assets/Tutor/no-avatar.webp';
import { Services as ServicesProperties } from '../../../config';
import { useAuth } from '../../../context';
import { ManagerRoleDetails, Faculty } from '../../../store/types';
import { useAppSelector } from "../../../store/hooks";
import { getFacultadesFromRoleCoordinador } from '../../../store/hooks/FacultadesRolesIdCoordinador';
import { Label } from 'flowbite-react';
import { Combobox, Spinner } from '../../../components';

interface StudentData {
  studentId: number;
  studentName: string;
  studentLastName: string;
  studentSecondLastName: string;
  cantidadProgramas: number;
}

interface ChartData {
  name: string;
  programCount: number;
  studentId: number;
}

interface ProgramData {
  tutoringProgramId: number;
  programName: string;
  programDescription: string;
  studentName: string;
  lastName: string;
  secondLastName: string;
  nameFaculty: string;
}

interface StudentInfo {
  studentId: number;
  studentName: string;
  studentLastName: string;
  studentSecondLastName: string;
  totalAppointments: number;
  registeredCount: number;
  pendingResultCount: number;
  completedCount: number;
}

interface Student {
  id: number;
  usuario: {
    institutionalEmail: string;
  };
  name: string;
  lastName: string;
  secondLastName: string;
}

interface IdsStudent {
  studentId: number;
}

const exportAsImage = () => {
  const chartContainer = document.getElementById('chart-container'); // Asegúrate de tener un contenedor con un id específico para tu gráfico
  if (chartContainer) {
    html2canvas(chartContainer)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'chart.png';
        link.href = imgData;
        link.click();
      });
  }
};

function isManagerRoleDetails(role: any): role is ManagerRoleDetails {
  return 'departmentId' in role;
}

const IconTrophyGold = () => (
  <TrophyIcon className="w-6 h-6 text-yellow-500" />
);

const IconTrophySilver = () => (
  <TrophyIcon className="w-6 h-6 text-gray-400" />
);

const IconTrophyBronze = () => (
  <TrophyIcon className="w-6 h-6 text-yellow-800" />
);

const className = 'font-roboto bg-[rgba(235,236,250,1)] shadow-custom border border-solid border-[rgba(116,170,255,0.70)]';
const generarPDF = (studentData: StudentData) => {
  const doc = new jsPDF();

  doc.setFont('helvetica');
  doc.setFontSize(10);
  doc.setTextColor(0);

  doc.text('FICHA DE DERIVACIÓN', 20, 10);
  doc.text('SERVICIOS DAES', 20, 15);
  doc.text(`Nombre del estudiante: ${studentData.studentName} ${studentData.studentLastName} ${studentData.studentSecondLastName}`, 20, 25);
  doc.text(`Cantidad de programas: ${studentData.cantidadProgramas}`, 20, 30);

  doc.save('ficha_de_derivacion.pdf');
};

const PageIndicadorAlumno: React.FC = () => {

  const [data, setData] = useState<ChartData[]>([]);
  const [topStudents, setTopStudents] = useState<ChartData[]>([]);
  const [selectedStudentPrograms, setSelectedStudentPrograms] = useState<ProgramData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data1, setData1] = useState<StudentInfo[]>([]);
  const [loading1, setLoading1] = useState(true);

  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);

  // Configura Axios para usar la URL base del backend
  const api = axios.create({
    baseURL: ServicesProperties.BaseUrl, // Asegúrate de que esta URL es correcta
  });

  const [idStudents, setIdStudent] = useState<IdsStudent[]>([]);
  const { userData } = useAuth();

  const facultades: ManagerRoleDetails[] = getFacultadesFromRoleCoordinador(userData);
  const [selectedIdFacultad, setSelectedIdFacultad] = useState<number | null>(null);

  const handleOnChangeFaculty = (value: any) => {
    setSelectedIdFacultad(value.id);
  };

  // Lista de Facultades del Coordinador de Facultad
  const facultyList = Array.from(new Set(userData?.userInfo?.roles
    .filter(role => role.type === 'FACULTYMANAGER')
    .map(role => role.details)));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<{ success: boolean, data: StudentData[]; }>('/listarAlumnosConCantidadDeProgramas');
        let responseData = response.data.data;
        let finalData: StudentData[] = [];

        if (selectedIdFacultad != null) {
          const responseIds = await api.get<{ success: boolean, data: number[]; }>(`/listarEstudiantePorIdFacultad/${selectedIdFacultad}`);
          let responseDataIds = responseIds.data.data;
          responseData = responseData.filter(item =>
            responseDataIds.some(data => data === item.studentId)
          );
          finalData = [...responseData.filter(item => !finalData.some(data => data.studentId === item.studentId))];

          const transformedData: ChartData[] = finalData.map((student: StudentData) => ({
            name: `${student.studentName} ${student.studentLastName} ${student.studentSecondLastName}`,
            programCount: student.cantidadProgramas,
            studentId: student.studentId
          }));
          setData(transformedData);

          // Ordenar los datos por cantidad de programas en orden descendente y seleccionar los primeros 3
          let topStudentsData = transformedData.sort((a, b) => b.programCount - a.programCount).slice(0, 3);
          setTopStudents(topStudentsData);
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedIdFacultad]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<{ success: boolean, data: StudentInfo[]; }>('/listarCantidadAppointmentsStudent');
        let responseData = response.data.data;
        let finalData: StudentInfo[] = [];

        if (selectedIdFacultad != null) {
          const responseIds = await api.get<{ success: boolean, data: number[]; }>(`/listarEstudiantePorIdFacultad/${selectedIdFacultad}`);
          let responseDataIds = responseIds.data.data;
          responseData = responseData.filter(item =>
            responseDataIds.some(data => data === item.studentId)
          );
          finalData = [...finalData, ...responseData.filter(item => !finalData.some(data => data.studentId === item.studentId))];
        }
        setData1(finalData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading1(false);
      }
    };

    fetchData();
  }, [selectedIdFacultad]);

  const fetchProgramsData = async (studentId: number) => {
    try {
      const response = await api.get<{ success: boolean, data: ProgramData[]; }>(`/listarProgramasDeTutoriaPorStudentId/${studentId}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching programs data:", error);
      return [];
    }
  };

  const handleTutorClick = async (studentId: number) => {
    try {
      const response = await api.get<{ success: boolean, data: ProgramData[]; }>(`/listarProgramasDeTutoriaPorStudentId/${studentId}`);
      const programsData = response.data.data;
      console.log(programsData);
      setSelectedStudentPrograms(programsData);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching programs data:", error);
    }
  };

  const applyBackgroundAndWatermark = (doc: jsPDF) => {
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 210, 297, 'F'); // 210x297 is the A4 size in mm

    doc.setTextColor(220);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    for (let i = -40; i < 297; i += 20) {
      for (let j = -10; j < 210; j += 20) {
        doc.setFontSize(10);
        doc.textWithLink('PUCP', j, i, { angle: 45, url: 'https://www.pucp.edu.pe/' });
      }
    }

    doc.setTextColor(0);
    doc.setFontSize(10);
  };

  const handleExportClick = async () => {
    if (data.length > 0) {
      const doc = new jsPDF();
      const pageHeight = doc.internal.pageSize.height;
      let y = 20; // Start position for content
      const marginLeft = 20;
      const marginRight = 20;

      doc.setFont('helvetica');
      doc.setFontSize(10);
      doc.setTextColor(0);

      // Apply background and watermark for the first page
      applyBackgroundAndWatermark(doc);

      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('FICHA DE INDICADORES ALUMNOS', 105, 10, { align: 'center' });
      doc.setFontSize(8);
      doc.text('SERVICIOS DAES', 105, 14, { align: 'center' });

      y = 20;
      doc.setFontSize(10);
      doc.setFont('helvetica');

      const underlineText = (text: string, x: number, y: number) => {
        doc.text(text, x, y);
        const textWidth = doc.getTextWidth(text);
        doc.line(x, y + 1, x + textWidth, y + 1);
      };

      for (const student of data) {
        if (y + 30 > pageHeight) {
          doc.addPage();
          y = 20; // Reset y position for the new page
          applyBackgroundAndWatermark(doc); // Apply background and watermark for the new page
        }
        // Separador
        doc.line(marginLeft, y, 210 - marginRight, y);
        y += 10;

        doc.setFont('helvetica', 'bold');
        doc.text(`Nombre del estudiante:`, 20, y);
        doc.setFont('helvetica', 'normal');
        doc.text(`${student.name}`, 70, y);

        y += 5;
        doc.setFont('helvetica', 'bold');
        doc.text(`Cantidad de programas:`, 20, y);
        doc.setFont('helvetica', 'normal');
        doc.text(`${student.programCount}`, 70, y);

        y += 10;
        doc.setFont('helvetica', 'bold');
        underlineText('Programas Académicos', 20, y);

        const programsData = await fetchProgramsData(student.studentId);
        let programY = y + 5;
        programsData.forEach(program => {
          if (programY + 30 > pageHeight) {
            doc.addPage();
            programY = 20; // Reset y position for the new page
            applyBackgroundAndWatermark(doc); // Apply background and watermark for the new page
          }
          doc.setFont('helvetica', 'bold');
          const programNameLabelLines = doc.splitTextToSize(`Nombre del programa:`, 40);
          doc.text(programNameLabelLines, 20, programY);
          doc.setFont('helvetica', 'normal');
          const programNameValueLines = doc.splitTextToSize(`${program.programName}`, 130);
          doc.text(programNameValueLines, 70, programY);
          programY += Math.max(programNameLabelLines.length, programNameValueLines.length) * 5;

          doc.setFont('helvetica', 'bold');
          const programDescriptionLabelLines = doc.splitTextToSize(`Descripción:`, 40);
          doc.text(programDescriptionLabelLines, 20, programY);
          doc.setFont('helvetica', 'normal');
          const programDescriptionValueLines = doc.splitTextToSize(`${program.programDescription}`, 130);
          doc.text(programDescriptionValueLines, 70, programY);
          programY += Math.max(programDescriptionLabelLines.length, programDescriptionValueLines.length) * 5 + 5;
        });

        for (let i = 0; i < data1.length; i++) {
          if (student.studentId == data1[i].studentId) {
            if (programY + 30 > pageHeight) {
              doc.addPage();
              programY = 20; // Reset y position for the new page
              applyBackgroundAndWatermark(doc); // Apply background and watermark for the new page
            }
            doc.setFont('helvetica', 'bold');
            doc.text(`Cantidad Total de Citas:`, 20, programY);
            doc.setFont('helvetica', 'normal');
            doc.text(`${data1[i].totalAppointments}`, 70, programY);
            programY += 5;

            doc.setFont('helvetica', 'bold');
            doc.text(`Citas Registradas:`, 20, programY);
            doc.setFont('helvetica', 'normal');
            doc.text(`${data1[i].registeredCount}`, 70, programY);
            programY += 5;

            doc.setFont('helvetica', 'bold');
            doc.text(`Citas Pendientes:`, 20, programY);
            doc.setFont('helvetica', 'normal');
            doc.text(`${data1[i].pendingResultCount}`, 70, programY);
            programY += 5;

            doc.setFont('helvetica', 'bold');
            doc.text(`Citas Completadas:`, 20, programY);
            doc.setFont('helvetica', 'normal');
            doc.text(`${data1[i].completedCount}`, 70, programY);
            y = programY;
            break;
          }
        }

        y += 10;
      }
      doc.save('ficha_de_indicador.pdf');
    }
  };

  const handleBuscarAlumnosClick = async () => {
    try {
      const response = await api.get<{ success: boolean, data: Student[]; }>('/listarEstudiantes');
      let responseData = response.data.data;
      console.log("responseData inicial", responseData);
      let finalData: Student[] = [];

      if (selectedIdFacultad) {
        console.log("yyyyy");
        const responseIds = await api.get<{ success: boolean, data: number[]; }>(`/listarEstudiantePorIdFacultad/${selectedIdFacultad}`);
        console.log("responseIds", responseIds);
        let responseDataIds = responseIds.data.data;
        console.log("responseDataIds", responseDataIds);
        const filteredResponseData = responseData.filter(item => responseDataIds.includes(item.id));
        console.log(filteredResponseData);
        finalData = [...new Set([...filteredResponseData])];
        console.log("finalData", finalData);
      } else {
        console.log("xxxxx");
      }

      setStudents(finalData);
      setIsStudentModalOpen(true);
    } catch (error) {
      console.error("Error fetching students data:", error);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='w-full h-full flex flex-col gap-4'>
      <div className="flex justify-between items-end h-fit">
        <div>
          <Label value="Facultad" className='font-roboto text-primary' />
          <Combobox
            className='w-[250px]'
            options={facultades.map(facultad => ({
              id: facultad.departmentId,
              name: facultad.departmentName,
              ...facultad
            }))}
            onChange={handleOnChangeFaculty}
            value={null}
          />
        </div>
        <button className="min-h-[40px] bg-primary cursor-default rounded-xl rounded-xl text-white px-5 shadow-custom border border-solid border-[rgba(116,170,255,0.70)] active:bg-black hover:cursor-pointer ml-6" onClick={handleExportClick}>
          Exportar
        </button>
        <button className="min-h-[40px] bg-primary cursor-default rounded-xl rounded-xl text-white px-5 shadow-custom border border-solid border-[rgba(116,170,255,0.70)] active:bg-black hover:cursor-pointer ml-6" onClick={handleBuscarAlumnosClick}>
          Buscar Alumnos
        </button>
        <div className="max-h-[40px] rounded-2xl flex">
          <p className={`text-center flex items-center justify-center w-36 ${className} border-r-0 rounded-l-xl`}>Inicio:</p>
          <input
            type="date"
            className={`${className} border-l-0`}
            name="Fecha Inicio"
            id=""
          />
          <p className={`text-center flex items-center justify-center w-28 ${className} border-r-0`}>Fin:</p>
          <input
            type="date"
            className={`${className} border-l-0`}
            name="Fecha Fin"
            id=""
            onChange={(e) => console.log(e.target.value)}
          />
          <button className="rounded-r-xl bg-primary cursor-default text-white px-5 shadow-custom border border-solid border-[rgba(116,170,255,0.70)] active:bg-black hover:cursor-pointer">
            <IconSearch />
          </button>
        </div>
      </div>


      <div className="flex gap-4">
        <div className="w-1/3 h-screen">
          <div className="bg-white shadow-md rounded-md overflow-hidden max-w-lg mx-auto">
            <div className="bg-primary py-2 px-4">
              <h2 className="text-xl font-semibold text-white text-center">Alumnos Destacados por Programas</h2>
            </div>
            {topStudents.length === 0 || topStudents.every(student => student.programCount === 0) ? (
              <div className="bg-gray-200 py-4 px-6 text-center">
                No se encontraron datos para esta fecha.
              </div>
            ) : (
              <ul className="divide-y bg-gray-200">
                {topStudents.map((student, index) => (
                  <li key={index} className="flex items-center py-4 px-6 cursor-pointer hover:bg-gradient-to-r from-secondary to-blue-300" onClick={() => handleTutorClick(student.studentId)}>
                    <span className="text-gray-700 text-lg font-medium mr-4">{index + 1}.</span>
                    <img className="w-12 h-12 rounded-full object-cover mr-4" src={noAvatar} />

                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-800">{student.name}</h3>
                      <p className="text-gray-600 text-base">En {student.programCount} programas</p>
                    </div>

                    <div className="ml-auto">
                      {index === 0 && <IconTrophyGold />}
                      {index === 1 && <IconTrophySilver />}
                      {index === 2 && <IconTrophyBronze />}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex-grow bg-gray-200 flex flex-col shadow-md">
          <div className="bg-primary py-2 px-4 rounded-t-md">
            <h2 className="text-xl font-semibold text-white text-center">Cantidad de Programas Académicos por Alumno</h2>
          </div>
          <div className="h-1/3 m-4 shadow-md rounded-md overflow-hidden" id="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              {data && data.length > 0 ? (
                <BarChart
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontWeight: 'bold' }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar name="Cantidad de programas académicos" dataKey="programCount" fill="#7d2bc5" activeBar={<Rectangle fill="skyblue" stroke="blue-bold" />} />
                </BarChart>
              ) : (
                <div className="bg-gray-200 p-4 text-center">
                  No se encontraron datos para esta fecha
                </div>
              )}
            </ResponsiveContainer>
          </div>
          <div className="bg-primary py-2 px-4">
            <h2 className="text-xl font-semibold text-white text-center">Cantidad de Citas por Alumno</h2>
          </div>
          <div className="h-1/2 bg-white-300 m-4 flex-grow p-4 overflow-auto">
            <ResponsiveContainer width="100%" height="100%">
              {data1 && data1.length > 0 ? (
                <AreaChart
                  data={data1}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey={(item) => `${item.studentName} ${item.studentLastName}`}
                    tick={{ fontWeight: 'bold' }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="registeredCount" stackId="1" stroke="#7d2bc5" fill="#7d2bc5" name="Registrado" />
                  <Area type="monotone" dataKey="pendingResultCount" stackId="1" stroke="#0f5827" fill="#0f5827" name="Pendiente Resultado" />
                  <Area type="monotone" dataKey="completedCount" stackId="1" stroke="#f7db18" fill="#f7db18" name="Completado" />
                </AreaChart>
              ) : (
                <div className="bg-gray-200 p-4 text-center">
                  No se encontraron datos para esta fecha
                </div>
              )}
            </ResponsiveContainer>
          </div>
        </div>
        <ModalProgramaAcademico isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} programs={selectedStudentPrograms} />
        <ModalAlumnos isOpen={isStudentModalOpen} onClose={() => setIsStudentModalOpen(false)} students={students}
        />
      </div>
    </div>
  );
};

export default PageIndicadorAlumno;
