export type Notification = {
  id: number;
  resumen: string;
  descripcion: string;
  tipo: string;
  visto?: boolean;
  horaFecha?: Date;
};