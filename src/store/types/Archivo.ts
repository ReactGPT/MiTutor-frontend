export type Archivo = {  
  filesId: number;
  filesName: string;
  appointmentResultId: number;
  privacyTypeId: number; 
};

export interface ExtendedFile extends File {
  nuevo: number;  
  eliminado: number;
  id_archivo: number; 
  nombre: string;
}
 
export interface FileBD {
  id_archivo: number; 
  nombre: string;
  activo: boolean;
  archivo: ExtendedFile;  
}