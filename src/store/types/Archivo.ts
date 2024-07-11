export type Archivo = {  
  filesId: number;
  filesName: string;
  appointmentResultId: number;
  privacyTypeId: number; 
};

export type ArchivoStudent = {  
  filesId: number;
  filesName: string;
  studentId: number;
  privacyTypeId: number; 
  date: string;
};

export interface ExtendedFile extends File {
  nuevo: number;  
  eliminado: number; 
  id_archivo: number; 
  nombre: string;
  date: string;
}
 
export interface FileBD {
  id_archivo: number; 
  nombre: string;
  activo: boolean;
  archivo: ExtendedFile;  
}