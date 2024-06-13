import React, { useState } from 'react';
import IconBell from '../assets/svg/IconBell';
import { Notification } from '../store/types/Notification';
import IconAlertCircle from '../assets/svg/IconAlertCircle';
import IconCheckCircle from '../assets/svg/IconCheckCircle';
import { useAuth } from '../context';
import { TutorRoleDetails } from '../store/types';
import { useNotification } from '../store/hooks/useNotification';
import { useEffect } from 'react';
import { Spinner } from 'flowbite-react';

interface NotificationsProps {
    userAcountId: number;
  }

const Notifications : React.FC<NotificationsProps> = ({userAcountId}) => {

    const { notificaciones, fetchNotificaciones, loading } = useNotification(userAcountId);

    useEffect(() => {
        fetchNotificaciones();
      }, []);
    
    const [isOpen, setIsOpen] = useState(false);

    return(
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="bg-white text-primary hover:bg-gray-500 rounded-full p-2.5 size-13">
                <IconBell size={6} />
            </button>
            {isOpen && (
                <div className="absolute h-[450px] mt-4 w-[450px] right-0 bg-[rgba(253,250,250,1.0)] rounded-xl shadow-lg ring-1 ring-black ring-opacity-5">
                    <h1 className="text-3xl mt-4 mb-4 font-bold justify-center flex">Notificaciones</h1>
                    <div className="overflow-y-auto h-[375px]">
                    { loading ?
                        <div className="w-full h-[95%] flex items-center justify-center">
                            <Spinner size="xl" />
                        </div>
                        :
                        <div className="ml-4 mr-4">
                            {notificaciones.map((notificacion, index) => (
                                <div key={index} className="border-2 bg-white rounded-xl mt-1 h-[120px] p-3">
                                    {   (notificacion.tipo == 'informativo' || notificacion.tipo == 'completado') ? (
                                            <div className="font-bold mb-3 text-lg text-[rgba(0,150,255,1.0)] flex"><IconCheckCircle /><div className="ml-2">{notificacion.resumen}</div></div>
                                        ) :
                                        (
                                            <div className="font-bold mb-3 text-lg text-[rgba(255,0,0,1.0)] flex"><IconAlertCircle /><div className="ml-2">{notificacion.resumen}</div></div>
                                        )
                                        }
                                    <div className="text-sm ml-9 mr-9">{notificacion.descripcion}</div>
                                </div>
                            ))}
                        </div>
                    }
                    </div>
                </div>
            )}
        </div>
    );

}

export default  Notifications;