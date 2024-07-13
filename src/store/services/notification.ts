import axios from 'axios';
import { Notification } from "../types/Notification";
import { Services as ServicesProperties } from '../../config';

type NotificationResponse = {
  notificaciones: Notification[];
};

async function getNotificationByUserAcountId(userAcountId: number): Promise<NotificationResponse> {

  try {
    const response = await axios.get(`${ServicesProperties.BaseUrl}/listarNotificaciones/${userAcountId}`);
    const notificaciones: Notification[] = response.data.data.map((item: any) => {
      return {
        id: item.id,
        resumen: item.resumen,
        descripcion: item.descripcion,
        tipo: item.tipo,
        visto: item.visto,
        horaFecha: item.horaFecha
      };
    });

    return { notificaciones: notificaciones };

  } catch (error) {
    throw new Error("Error en getNotificationByUserAcountId");
  }
}

async function notificarCancelacionCita(AppointmentId: number): Promise<void> {
  try {
    await axios.post(`${ServicesProperties.BaseUrl}/api/notification/crearCancelNotificacionByAppointmentId/${AppointmentId}`);
  } catch (error) {
    throw new Error("Error en notificarCancelacionCita");
  }
}

export { getNotificationByUserAcountId, notificarCancelacionCita };