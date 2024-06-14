import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Bar, Sector, Cell } from 'recharts';
import { IconSearch } from '../../../assets';
import jsPDF from 'jspdf';
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

const TutorDetail: React.FC = () => {
    const location = useLocation();
    const tutor = (location.state as { tutor: Tutor })?.tutor;

    const [programs, setPrograms] = useState<Program[]>([]);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [programVirtualFace, setProgramVirtualFace] = useState<ProgramVirtualFace[]>([]);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const [programsTutor, setProgramsTutor] = useState<Program[]>([]);
    useEffect(() => {
        fetchData();
        fetchAppointments();
        fetchProgramVirtualFace();
        fetchProgramaTutorias();
    }, []);
    const fetchProgramaTutorias = async () => {
        try {
            // Realiza la petición al servicio para obtener los programas de tutoría del tutor
            const response = await fetch(`https://localhost:44369/listarProgramasDeTutoriaPorTutorId/${tutor?.tutorId}`);
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
            let url = `https://localhost:44369/listarProgramaFecha/${tutor?.tutorId}`;
            if (startDate && endDate) {
                url += `?startDate=${startDate}&endDate=${endDate}`;
            }
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            // Añadir colores únicos a cada programa
            const colors = ['#ffc658', '#8884d8', '#82ca9d', '#ff8042', '#0088fe'];
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
            let url = `https://localhost:44369/listarAppointmentPorFecha/${tutor?.tutorId}`;
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
            let url = `https://localhost:44369/listarProgramaVirtualFace/${tutor?.tutorId}`;
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

    const handleSearch = () => {
        fetchData();
        fetchAppointments();
        fetchProgramVirtualFace();
    };

    if (!tutor) {
        return <div>No tutor data available.</div>;
    }
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
    ] : [];

    const handleExportClick = async () => {
        if (programsTutor.length > 0) {
            const doc = new jsPDF();
            doc.setFont('calibri');
            doc.setFontSize(12);
            doc.setTextColor(0);

            // Definir márgenes
            const marginLeft = 20;
            const marginTop = 20;
            const marginRight = 20;
            const marginBottom = 20;

            // Función para imprimir una cita
            const printAppointment = (doc: any, appointment: any, x: any, y: any, height: any) => {
                doc.setFontSize(12);
                doc.setFont('calibri', 'normal');

                // Hora de inicio
                const startTime = new Date(appointment.startTime);
                const formattedStartTime = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                doc.text(`Hora de inicio: ${formattedStartTime}`, x, y);
                y += 5;

                // Hora de fin
                const endTime = new Date(appointment.endTime);
                const formattedEndTime = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                doc.text(`Hora de fin: ${formattedEndTime}`, x, y);
                y += 5;

                // Fecha de creación
                const creationDate = new Date(appointment.creationDate);
                const formattedCreationDate = creationDate.toLocaleDateString();
                doc.text(`Fecha de creación: ${formattedCreationDate}`, x, y);
                y += 5;

                // Razón
                doc.text(`Razón: ${appointment.reason}`, x, y);
                y += 5;

                // Cantidad de estudiantes
                doc.text(`Cantidad de estudiantes: ${appointment.studentCount}`, x, y);
            };

            // Agregar un fondo gris transparente
            doc.setFillColor(200, 200, 200);
            doc.rect(0, 0, 210, 297, 'F'); // 210x297 es el tamaño A4 en mm

            // Agregar marca de agua "PUCP"
            doc.setTextColor(150);
            doc.setFontSize(20); // Reducir el tamaño del texto de la marca de agua
            doc.setFont('calibri', 'bold');
            for (let i = -40; i < 297; i += 20) { // Reducir el espaciado vertical
                for (let j = -10; j < 210; j += 20) { // Reducir el espaciado horizontal
                    doc.setFontSize(12); // Tamaño más pequeño para "PUCP"
                    doc.textWithLink('PUCP', j, i, { angle: 45, url: 'https://www.pucp.edu.pe/' });
                }
            }

            // Restablecer el color del texto y el tamaño
            doc.setTextColor(0);
            doc.setFontSize(12);

            // Nombre del tutor
            doc.setFontSize(16);
            doc.setFont('calibri', 'bold');
            doc.text(`${tutor.userAccount.persona.name} ${tutor.userAccount.persona.lastName} ${tutor.userAccount.persona.secondLastName}`, 105, marginTop + 10, { align: 'center' });

            // Detalles del tutor
            let y = marginTop + 30;

            // Título de Programas
            doc.setFontSize(14);
            doc.setFont('calibri', 'bold');
            doc.text('Programas Académicos', 105, y, { align: 'center' });
            y += 10;

            // Detalles de los programas académicos
            programsTutor.forEach(program => {
                // Nombre del programa
                doc.setFontSize(12);
                doc.setFont('calibri', 'bold');
                doc.text(`Nombre del programa:`, marginLeft, y);
                doc.setFont('calibri', 'normal');
                doc.text(`${program.programName}`, marginLeft + 60, y); // Ajustamos la posición en x
                y += 10;

                // Descripción del programa
                const descriptionLines = doc.splitTextToSize(program.programDescription, 170);
                descriptionLines.forEach((line: string) => {
                    doc.text(line, marginLeft, y);
                    y += 5;
                });


                // Facultad
                doc.setFontSize(12);
                doc.setFont('calibri', 'bold');
                doc.text(`Facultad:`, marginLeft, y);
                doc.setFont('calibri', 'normal');
                doc.text(`${program.nameFaculty}`, marginLeft + 20, y); // Ajustamos la posición en x
                y += 10;

                // Separador
                doc.line(marginLeft, y, 210 - marginRight, y);
                y += 5;
            });

            // Separador
            doc.line(marginLeft, y, 210 - marginRight, y);
            y += 10;

            // Título de las citas
            doc.setFontSize(14);
            doc.setFont('calibri', 'bold');
            doc.text('Citas del Tutor', 105, y, { align: 'center' });
            y += 10;

            // Dividir las citas en dos columnas
            const halfAppointments = Math.ceil(appointments.length / 2);
            const firstColumnAppointments = appointments.slice(0, halfAppointments);
            const secondColumnAppointments = appointments.slice(halfAppointments);

            // Determinar el espacio vertical disponible para cada columna
            const availableHeight = doc.internal.pageSize.height - y - marginBottom;
            const columnHeight = Math.max(firstColumnAppointments.length, secondColumnAppointments.length) * 60; // Asumiendo 60 unidades de altura por cita

            // Calcular la altura de cada fila en función del espacio disponible
            const rowHeight = Math.min(availableHeight, columnHeight) / Math.max(firstColumnAppointments.length, secondColumnAppointments.length);

            // Imprimir las citas en dos columnas
            let xFirstColumn = marginLeft;
            let xSecondColumn = 105 + marginRight; // Separación de columnas
            let index = 0;
            while (index < Math.max(firstColumnAppointments.length, secondColumnAppointments.length)) {
                // Primera columna
                if (index < firstColumnAppointments.length) {
                    const appointment = firstColumnAppointments[index];
                    printAppointment(doc, appointment, xFirstColumn, y, rowHeight);
                }

                // Segunda columna
                if (index < secondColumnAppointments.length) {
                    const appointment = secondColumnAppointments[index];
                    printAppointment(doc, appointment, xSecondColumn, y, rowHeight);
                }


                y += rowHeight;

                index++;
            }


            doc.save('detalle_tutor.pdf');
        }
    };



    const printAppointment = (doc: any, appointment: any, x: any, y: any, height: any) => {
        doc.setFontSize(12);
        doc.setFont('calibri', 'normal');


        const startTime = new Date(appointment.startTime);
        const formattedStartTime = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        doc.text(`Hora de inicio: ${formattedStartTime}`, x, y);
        y += 5;


        const endTime = new Date(appointment.endTime);
        const formattedEndTime = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        doc.text(`Hora de fin: ${formattedEndTime}`, x, y);
        y += 5;


        const creationDate = new Date(appointment.creationDate);
        const formattedCreationDate = creationDate.toLocaleDateString();
        doc.text(`Fecha de creación: ${formattedCreationDate}`, x, y);
        y += 5;


        doc.text(`Razón: ${appointment.reason}`, x, y);
        y += 5;


        doc.text(`Cantidad de estudiantes: ${appointment.studentCount}`, x, y);
    };





    return (
        <div>
            <div className="mb-4 flex justify-between">
                <button className="bg-primary cursor-default rounded-l-full rounded-r-full text-white px-5 shadow-custom border border-solid border-[rgba(116,170,255,0.70)] active:bg-black hover:cursor-pointer ml-6" onClick={handleExportClick}>
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
            <div className="bg-gray-100 py-2 px-4 text-center">
                <h1 className="font-montserrat text-2xl font-bold text-primary">
                    {`${tutor.userAccount.persona.name} ${tutor.userAccount.persona.lastName} ${tutor.userAccount.persona.secondLastName}`}
                </h1>
            </div>

            <div className="flex">
                <div className="flex-grow bg-white shadow-md  overflow-hidden flex flex-col">
                    <div className="bg-primary py-2 px-4 mb-4">
                        <h2 className="text-xl font-semibold text-white text-center">Programas Académicos</h2>
                    </div>
                    <div className="h-1/2 m-4 flex-grow flex flex-col">
                        <div className="flex-grow bg-gray-200">

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


                    <div className="h-1/2 m-4 flex-grow flex">
                        <div className="h-full w-1/2 flex flex-col">
                            <div className="bg-primary py-2 px-4">
                                <h2 className="text-xl font-semibold text-white text-center">Citas de Tutoría</h2>
                            </div>
                            <div className="flex-grow bg-gray-200">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={appointments}
                                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        {/* Modificar el eje X */}
                                        <XAxis dataKey="appointmentId" tick={{ fontWeight: 'bold' }} tickFormatter={(value, index) => `Cita ${index + 1}`} />
                                        <YAxis domain={[0, 4]} tickCount={5} tick={{ fontWeight: 'bold' }} interval={0} tickFormatter={(value) => Math.round(value) === value ? value : ''} />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Legend />
                                        <Bar dataKey="studentCount" fill="#1d4ed8" stackId="1" stroke="#8884d8" name="Cantidad de Alumnos" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="h-full w-1/2 flex flex-col">
                            <div className="bg-primary py-2 px-4">
                                <h2 className="text-xl font-semibold text-white text-center">Modalidad Cita</h2>
                            </div>
                            <div className="flex-grow bg-gray-200">
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
                <div className="w-1/3 bg-gray-200  h-screen ">
                    <div className="bg-primary py-2 px-4">
                        <h2 className="text-xl font-semibold text-white text-center">Consolidado de Programas</h2>
                    </div>
                    <div className="overflow-auto h-full">
                        <ul className="divide-y divide-gray-200">
                            {programsTutor.map((program) => (
                                <li key={program.tutoringProgramId} className="px-4 py-2 font-montserrat">
                                    <h3 className="font-semibold font-montserrat underline">{program.programName}</h3>
                                    <p><span className="font-semibold font-montserrat">Descripción:</span> {program.programDescription}</p>
                                    <p><span className="font-semibold font-montserrat">Facultad:</span> <span className="font-montserrat">{program.nameFaculty}</span></p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorDetail;
