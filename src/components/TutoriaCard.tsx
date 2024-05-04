import Button from "./Button";
import { useNavigate } from "react-router-dom";
import {
    BiMenu
} from "react-icons/bi";

interface CardProps {
    title: string;
    description: string;
    facultad: string;
    especialidad: string;
    rol: string;
}

const TutoriaCard: React.FC<CardProps> = ({ title, description, facultad, especialidad, rol }) => {
    const navigate = useNavigate();
    const toDetail = () => { 
        navigate('/programasDeTutoria/detalle-programa')
    }
    return (
        <div className="flex flex-row rounded overflow-hidden shadow-lg relative">
            <div className="h-full w-10 shrink-0 grow-0 bg-green-600 absolute left-0 inset-y-0 rounded"/>
            <div className="ml-10 px-6 py-4 basis-1/3">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">
                    {description}
                </p>
            </div>
            <div className="px-6 py-4 basis-1/4">
                <div className="text-xl mb-2">{facultad}</div>
            </div>
            <div className="px-6 py-4 basis-1/4">
                <div className="text-xl mb-2">{especialidad}</div>
            </div>
            <div className="px-6 py-4 basis-1/4">
                <div className="text-xl mb-2">{rol}</div>   
            </div>
            <div className="flex items-center justify-center ">
            <Button onClick={toDetail} variant="call-to-action" icon={< BiMenu/>} />
            </div>
            
        </div>
    );
};

export default TutoriaCard;