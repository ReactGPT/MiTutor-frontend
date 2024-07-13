import React, { useState } from 'react';
import IconBell from '../assets/svg/IconBell';
import { Notification } from '../store/types/Notification';
import IconAlertCircle from '../assets/svg/IconAlertCircle';
import IconCheckCircle from '../assets/svg/IconCheckCircle';
import { useAuth } from '../context';
import { useNotification } from '../store/hooks/useNotification';
import { useEffect } from 'react';
import { Spinner } from 'flowbite-react';

function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript son 0-indexados
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

const Notifications: React.FC = () => {

  const { userData } = useAuth();
  const userAcountId = userData?.userInfo?.id || 0;

  const { notificaciones, fetchNotificaciones, loading } = useNotification(userAcountId);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log("notificaciones", notificaciones);
    fetchNotificaciones();
    if (isOpen) {
      //
    }
  }, [isOpen,]);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="bg-white text-primary hover:bg-gray-500 rounded-full p-2.5 size-13">
        <IconBell size={6} />
        {
          notificaciones.some(notificacion => notificacion.visto === false)
          &&
          <span className="absolute top-0 right-0 inline-block w-3 h-3 bg-red-500 rounded-full"></span>
        }
      </button>
      {isOpen && (
        <div className="absolute h-[450px] mt-4 w-[450px] right-0 bg-[rgba(253,250,250,1.0)] rounded-xl shadow-lg ring-1 ring-black ring-opacity-5">
          <h1 className="text-3xl mt-4 mb-4 font-bold justify-center flex">Notificaciones</h1>
          <div className="overflow-y-auto h-[375px]">
            {loading ?
              <div className="w-full h-[95%] flex items-center justify-center">
                <Spinner size="xl" />
              </div>
              :
              <div className="flex flex-col w-full h-full items-center justify-start p-5 gap-2">
                {
                  notificaciones.length === 0 ?
                    <div className='w-full h-full flex items-center justify-center text-xl font-semibold'>
                      No hay notificaciones
                    </div>
                    :
                    notificaciones.map((notificacion, index) => (
                      <div key={index} className={`w-full border-2 bg-white rounded-xl mt-1 h-[120px] p-3 ${!notificacion.visto && "border-red-500"}`}>
                        {
                          (notificacion.tipo == 'informativo' || notificacion.tipo == 'completado')
                            ?
                            (
                              <div className="font-bold mb-3 text-lg text-[rgba(0,150,255,1.0)] flex justify-between">
                                <div className='flex'>
                                  <IconCheckCircle />
                                  <div className="ml-2">
                                    {notificacion.resumen}
                                  </div>
                                </div>
                                <div className='font-semibold text-black text-sm'>
                                  {notificacion?.horaFecha ? formatDateTime(notificacion.horaFecha.toString()) : ''}
                                </div>
                              </div>
                            )
                            :
                            (
                              <div className="font-bold mb-3 text-lg text-[#b97c20] flex justify-between">
                                <div className='flex'>
                                  <IconAlertCircle />
                                  <div className="ml-2">
                                    {notificacion.resumen}
                                  </div>
                                </div>
                                <div className='font-semibold text-black text-sm'>
                                  {notificacion?.horaFecha ? formatDateTime(notificacion.horaFecha.toString()) : ''}
                                </div>
                              </div>
                            )
                        }

                        <div className="text-sm ml-9 mr-9">
                          {notificacion.descripcion}
                        </div>
                      </div>
                    ))
                }
              </div>
            }
          </div>
        </div>
      )}
    </div>
  );

};

export default Notifications;