export type Derivation = { 
  derivationId: number;
  reason: string;
  comment: string;
  status: string;
  creationDate: string;
  unitDerivationId: number;
  userAccountId: number;
  appointmentId: number;
  isActive: boolean;
};

export type ListDerivation = {  
  reason: string;
  comment: string;
  status: string;
  creationDate: string;
  unitDerivationName: string; 
  nombreAlumno:string; 
  codigo:string;
  programName:string; 
  derivationId:number;
};

export type DerivationBienestar = {
  derivationId: number;
  reason: string;
  comment: string;
  status: string;
  creationDate: string;
  unitDerivationName: string;
  idUsuarioAlumno: number;
  correoAlumno: string;
  nombreAlumno: string;
  codigoAlumno: string;
  idTutor: number;
  idUsuarioTutor: number;
  correoTutor: string;
  nombreTutor: string;
  codigoTutor: string;
  programName: string;
  observaciones: string;
};
