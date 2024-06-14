import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import ModalProgramaAcademico from '../../../components/ModalProgramaAcademico';
import { Button, Dropdown, SearchInput } from '../../../components';
import IconSearch from "../../../assets/svg/IconSearch";
import { TrophyIcon } from '@heroicons/react/16/solid';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ModalTutores from './ModalTutores';
import noAvatar from '../../../assets/Tutor/no-avatar.webp';


interface TutorData {
    tutorId: number;
    tutorName: string;
    tutorLastName: string;
    tutorSecondLastName: string;
    cantidadProgramas: number;
}

interface ChartData {
    name: string;
    programCount: number;
    tutorId: number;
}

interface ProgramData {
    tutoringProgramId: number;
    programName: string;
    programDescription: string;
    tutorName: string;
    lastName: string;
    secondLastName: string;
    nameFaculty: string;
}

interface TutorInfo {
    tutorId: number;
    tutorName: string;
    tutorLastName: string;
    tutorSecondLastName: string;
    totalAppointments: number;
    registeredCount: number;
    pendingResultCount: number;
    completedCount: number;
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
interface IdsTutor {
    tutorId: number;
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
const generarPDF = (tutorData: TutorData) => {
    const doc = new jsPDF();

    doc.setFont('calibri');
    doc.setFontSize(12);
    doc.setTextColor(0);

    doc.text('FICHA DE DERIVACIÓN', 20, 10);
    doc.text('SERVICIOS DAES', 20, 15);
    doc.text(`Nombre del tutor: ${tutorData.tutorName} ${tutorData.tutorLastName} ${tutorData.tutorSecondLastName}`, 20, 25);
    doc.text(`Cantidad de programas: ${tutorData.cantidadProgramas}`, 20, 30);

    doc.save('ficha_de_derivacion.pdf');
};
const PageIndicadorTutor: React.FC = () => {
    const [data, setData] = useState<ChartData[]>([]);
    const [topTutors, setTopTutors] = useState<ChartData[]>([]);
    const [selectedTutorPrograms, setSelectedTutorPrograms] = useState<ProgramData[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data1, setData1] = useState<TutorInfo[]>([]);
    const [loading1, setLoading1] = useState(true);

    const [isTutorModalOpen, setIsTutorModalOpen] = useState(false);
    const [tutors, setTutors] = useState<Tutor[]>([]);

    const [idTutors, setIdTutor] = useState<IdsTutor[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<{ success: boolean, data: TutorData[] }>('https://localhost:44369/listarTutoresConCantidadDeProgramas');
                const responseData = response.data.data;

                const transformedData: ChartData[] = responseData.map((tutor: TutorData) => ({
                    name: `${tutor.tutorName} ${tutor.tutorLastName} ${tutor.tutorSecondLastName}`,
                    programCount: tutor.cantidadProgramas,
                    tutorId: tutor.tutorId
                }));
                setData(transformedData);

                // Ordenar los datos por cantidad de programas en orden descendente y seleccionar los primeros 3
                const topTutorsData = transformedData.sort((a, b) => b.programCount - a.programCount).slice(0, 3);
                setTopTutors(topTutorsData);
            } catch (error) {
                console.error("Error fetching tutor data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<{ success: boolean, data: TutorInfo[] }>('https://localhost:44369/listarCantidadAppointments');
                const responseData = response.data.data;
                setData1(responseData);

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading1(false);
            }
        };

        fetchData();
    }, []);
    const fetchProgramsData = async (tutorId: number) => {
        try {
            const response = await axios.get<{ success: boolean, data: ProgramData[] }>(`https://localhost:44369/listarProgramasDeTutoriaPorTutorId/${tutorId}`);
            return response.data.data;
        } catch (error) {
            console.error("Error fetching programs data:", error);
            return [];
        }
    };
    const handleTutorClick = async (tutorId: number) => {
        try {
            const response = await axios.get<{ success: boolean, data: ProgramData[] }>(`https://localhost:44369/listarProgramasDeTutoriaPorTutorId/${tutorId}`);
            const programsData = response.data.data;
            setSelectedTutorPrograms(programsData);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error fetching programs data:", error);
        }
    };

    const handleExportClick = async () => {
        if (data.length > 0) {
            const doc = new jsPDF();
            doc.setFont('calibri');
            doc.setFontSize(12);
            doc.setTextColor(0);


            doc.setFillColor(200, 200, 200);
            doc.rect(0, 0, 210, 297, 'F');


            doc.setTextColor(150);
            doc.setFontSize(20);
            doc.setFont('calibri', 'bold');
            for (let i = -40; i < 297; i += 20) {
                for (let j = -10; j < 210; j += 20) {
                    doc.setFontSize(12);
                    doc.textWithLink('PUCP', j, i, { angle: 45, url: 'https://www.pucp.edu.pe/' });
                }
            }


            doc.setTextColor(0);
            doc.setFontSize(12);


            doc.setFontSize(16);
            doc.setFont('calibri', 'bold');
            doc.text('FICHA DE INDICADORES TUTORES', 105, 10, { align: 'center' });
            doc.text('SERVICIOS DAES', 105, 20, { align: 'center' });

            let y = 30;
            doc.setFontSize(12);
            doc.setFont('calibri');

            const underlineText = (text: any, x: any, y: any) => {
                doc.text(text, x, y);
                const textWidth = doc.getTextWidth(text);
                doc.line(x, y + 1, x + textWidth, y + 1);
            };

            for (const tutor of data) {
                doc.setFont('calibri', 'bold');
                doc.text(`Nombre del tutor:`, 20, y);
                doc.setFont('calibri', 'normal');
                doc.text(`${tutor.name}`, 70, y);

                y += 5;
                doc.setFont('calibri', 'bold');
                doc.text(`Cantidad de programas:`, 20, y);
                doc.setFont('calibri', 'normal');
                doc.text(`${tutor.programCount}`, 70, y);

                y += 10;
                doc.setFont('calibri', 'bold');
                underlineText('Programas Académicos', 20, y);

                const programsData = await fetchProgramsData(tutor.tutorId);
                let programY = y + 5;
                programsData.forEach(program => {
                    doc.setFont('calibri', 'bold');
                    const programNameLabelLines = doc.splitTextToSize(`Nombre del programa:`, 40);
                    doc.text(programNameLabelLines, 20, programY);
                    doc.setFont('calibri', 'normal');
                    const programNameValueLines = doc.splitTextToSize(`${program.programName}`, 130);
                    doc.text(programNameValueLines, 70, programY);
                    programY += Math.max(programNameLabelLines.length, programNameValueLines.length) * 5;

                    doc.setFont('calibri', 'bold');
                    const programDescriptionLabelLines = doc.splitTextToSize(`Descripción:`, 40);
                    doc.text(programDescriptionLabelLines, 20, programY);
                    doc.setFont('calibri', 'normal');
                    const programDescriptionValueLines = doc.splitTextToSize(`${program.programDescription}`, 130);
                    doc.text(programDescriptionValueLines, 70, programY);
                    programY += Math.max(programDescriptionLabelLines.length, programDescriptionValueLines.length) * 5 + 5;
                });

                for (let i = 0; i < data1.length; i++) {
                    if (tutor.tutorId == data1[i].tutorId) {
                        doc.setFont('calibri', 'bold');
                        doc.text(`Cantidad Total de Citas:`, 20, programY);
                        doc.setFont('calibri', 'normal');
                        doc.text(`${data1[i].totalAppointments}`, 70, programY);
                        programY += 5;

                        doc.setFont('calibri', 'bold');
                        doc.text(`Citas Registradas:`, 20, programY);
                        doc.setFont('calibri', 'normal');
                        doc.text(`${data1[i].registeredCount}`, 70, programY);
                        programY += 5;

                        doc.setFont('calibri', 'bold');
                        doc.text(`Citas Pendientes:`, 20, programY);
                        doc.setFont('calibri', 'normal');
                        doc.text(`${data1[i].pendingResultCount}`, 70, programY);
                        programY += 5;

                        doc.setFont('calibri', 'bold');
                        doc.text(`Citas Completadas:`, 20, programY);
                        doc.setFont('calibri', 'normal');
                        doc.text(`${data1[i].completedCount}`, 70, programY);
                        y = programY + 10;
                        break;
                    }
                }

                y += 10;
            }
            doc.save('ficha_de_indicador.pdf');
        }
    };




    const handleBuscarTutoresClick = async () => {
        try {
            const response = await axios.get<{ success: boolean, data: Tutor[] }>('https://localhost:44369/listarTutores');
            const tutorsData = response.data.data;
            setTutors(tutorsData);
            setIsTutorModalOpen(true);
        } catch (error) {
            console.error("Error fetching tutors data:", error);
        }
    };
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="ml-[-24px] mb-4 flex justify-between">
                <button className="bg-primary cursor-default rounded-xl rounded-xl text-white px-5 shadow-custom border border-solid border-[rgba(116,170,255,0.70)] active:bg-black hover:cursor-pointer ml-6" onClick={handleExportClick}>
                    Exportar
                </button>
                <button className="bg-primary cursor-default rounded-l-full rounded-r-full text-white px-5 shadow-custom border border-solid border-[rgba(116,170,255,0.70)] active:bg-black hover:cursor-pointer ml-6" onClick={handleBuscarTutoresClick}>
                    Buscar Tutores
                </button>
                <div className="max-h-[40px] rounded-2xl flex">
                    <p className={`text-center flex items-center justify-center w-36 ${className} border-r-0 rounded-l-full`}>Inicio:</p>
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
                    <button className="bg-primary cursor-default rounded-r-2xl text-white px-5 shadow-custom border border-solid border-[rgba(116,170,255,0.70)] active:bg-black hover:cursor-pointer">
                        <IconSearch />
                    </button>
                </div>
            </div>


            <div className="flex gap-4">
                <div className="w-1/3 h-screen">
                    <div className="bg-white shadow-md rounded-md overflow-hidden max-w-lg mx-auto">
                        <div className="bg-primary py-2 px-4">
                            <h2 className="text-xl font-semibold text-white text-center">Top Tutores Programas Académicos</h2>
                        </div>

                        <ul className="divide-y bg-gray-200">
                            {topTutors.map((tutor, index) => (
                                <li key={index} className="flex items-center py-4 px-6 cursor-pointer hover:bg-gradient-to-r from-secondary to-blue-300" onClick={() => handleTutorClick(tutor.tutorId)}>
                                    <span className="text-gray-700 text-lg font-medium mr-4">{index + 1}.</span>
                                    <img className="w-12 h-12 rounded-full object-cover mr-4" src={noAvatar} alt="User avatar" />

                                    <div className="flex-1">
                                        <h3 className="text-lg font-medium text-gray-800">{tutor.name}</h3>
                                        <p className="text-gray-600 text-base">{tutor.programCount} programas</p>
                                    </div>

                                    <div className="ml-auto">
                                        {index === 0 && <IconTrophyGold />}
                                        {index === 1 && <IconTrophySilver />}
                                        {index === 2 && <IconTrophyBronze />}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex-grow bg-gray-200 flex flex-col shadow-md">
                    <div className="bg-primary py-2 px-4">
                        <h2 className="text-xl font-semibold text-white text-center">Tutores Programas</h2>
                    </div>
                    <div className="h-1/3 m-4 shadow-md rounded-md overflow-hidden" id="chart-container">
                        <ResponsiveContainer width="100%" height="100%">
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
                        </ResponsiveContainer>
                    </div>
                    <div className="bg-primary py-2 px-4">
                        <h2 className="text-xl font-semibold text-white text-center">Citas Tutores</h2>
                    </div>
                    <div className="h-1/2 bg-white-300 m-4 flex-grow p-4 overflow-auto">
                        <ResponsiveContainer width="100%" height="100%">
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
                                    dataKey={(item) => `${item.tutorName} ${item.tutorLastName}`}
                                    tick={{ fontWeight: 'bold' }}
                                />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Area type="monotone" dataKey="registeredCount" stackId="1" stroke="#7d2bc5" fill="#7d2bc5" name="Registrado" />
                                <Area type="monotone" dataKey="pendingResultCount" stackId="1" stroke="#0f5827" fill="#0f5827" name="Pendiente Resultado" />
                                <Area type="monotone" dataKey="completedCount" stackId="1" stroke="#f7db18" fill="#f7db18" name="Completado" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <ModalProgramaAcademico isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} programs={selectedTutorPrograms} />
                <ModalTutores isOpen={isTutorModalOpen} onClose={() => setIsTutorModalOpen(false)} tutors={tutors}
                />
            </div>
        </>
    );
};

export default PageIndicadorTutor;
