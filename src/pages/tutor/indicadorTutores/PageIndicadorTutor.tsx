import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import ModalProgramaAcademico from '../../../components/ModalProgramaAcademico';
import { Button, Dropdown, SearchInput } from '../../../components';
import IconSearch from "../../../assets/svg/IconSearch";
import { TrophyIcon } from '@heroicons/react/16/solid';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


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
    const handleExportClick = () => {
        if (data.length > 0) {
            const doc = new jsPDF();
            doc.setFont('calibri');
            doc.setFontSize(12);
            doc.setTextColor(0);
            doc.text('FICHA DE DERIVACIÓN', 20, 10);
            doc.text('SERVICIOS DAES', 20, 15);
            let y = 30;
            data.forEach(tutor => {
                doc.text(`Nombre del tutor: ${tutor.name} `, 20, y);
                doc.text(`Cantidad de programas: ${tutor.programCount}`, 20, y + 5);
                y += 10;
            });
            doc.save('ficha_de_derivacion.pdf');
        }
    };
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="mb-4 flex justify-between">
            <button className="bg-primary cursor-default rounded-l-full rounded-r-full text-white px-5 shadow-custom border border-solid border-[rgba(116,170,255,0.70)] active:bg-black hover:cursor-pointer ml-6" onClick={handleExportClick}>
                    Exportar
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
                    />
                    <button className="bg-primary cursor-default rounded-r-2xl text-white px-5 shadow-custom border border-solid border-[rgba(116,170,255,0.70)] active:bg-black hover:cursor-pointer">
                        <IconSearch />
                    </button>
                </div>
            </div>


            <div className="flex">
                <div className="w-1/3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-300 h-screen">
                    <div className="bg-white shadow-md rounded-md overflow-hidden max-w-lg mx-auto mt-16">
                        <div className="bg-gray-100 py-2 px-4">
                            <h2 className="text-xl font-semibold text-gray-800 text-center">Top Tutores-Programas Académicos</h2>
                        </div>

                        <ul className="divide-y bg-gradient-to-r from-indigo-600 via-green-200 to-blue-200">
                            {topTutors.map((tutor, index) => (
                                <li key={index} className="flex items-center py-4 px-6 cursor-pointer hover:bg-gray-200" onClick={() => handleTutorClick(tutor.tutorId)}>
                                    <span className="text-gray-700 text-lg font-medium mr-4">{index + 1}.</span>
                                    <img className="w-12 h-12 rounded-full object-cover mr-4" src={`https://randomuser.me/api/portraits/men/${index + 40}.jpg`} alt="User avatar" />

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

                <div className="flex-grow bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-600 to-90% flex flex-col">
                    <div className="bg-gray-100 py-2 px-4">
                        <h2 className="text-xl font-semibold text-gray-800 text-center">Tutores Programas</h2>
                    </div>
                    <div className="h-1/2 bg-gradient-to-r from-green-200 m-4" id="chart-container">
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
                    <div className="bg-gray-100 py-2 px-4">
                        <h2 className="text-xl font-semibold text-gray-800 text-center">Citas Tutores</h2>
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
            </div>
        </>
    );
};

export default PageIndicadorTutor;
