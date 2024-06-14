import { useState } from 'react';
import { getNotificationByUserAcountId } from '../services/notification';
import { Notification } from '../types/Notification';

type NotificationHooksReturn = {
    notificaciones : Notification[];
    loading: boolean;
    error: any;
    fetchNotificaciones: () => Promise<void>;
}

function useNotification(userAcountId: number): NotificationHooksReturn {

    const [notificaciones, setNotificaciones] = useState<Notification[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    const fetchNotificaciones = async () => {
        try{
            const data = await getNotificationByUserAcountId(userAcountId);
            setNotificaciones(data.notificaciones);
            setLoading(false);
        }catch(error){
            setError("Error en useNotification");
            setLoading(false);
        }
    };

    return { notificaciones,loading ,error, fetchNotificaciones};

}

export { useNotification };