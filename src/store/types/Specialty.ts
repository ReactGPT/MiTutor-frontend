type Persona = {
  id: number;
  name: string;
  lastName: string;
  secondLastName: string | null;
  phone: string | null;
  isActive: boolean;
  usuario: any | null;

};

export type SpecialtyManager = {
  id: number;
  institutionalEmail: string;
  pucpCode: string;
  isActive: boolean;
  persona: Persona;
  roles: any[] | null;
  isVerified: boolean;
  creationDate: string;
  modificationDate: string;
};

type Facultad = {
  facultyId: number;
  name: string;
  acronym: string;
  numberOfStudents: number;
  numberOfTutors: number;
  isActive: boolean;
  facultyManager: any | null;
  specialties: any[] | null;
};

export type Specialty = {
  id: number;
  name: string;
  acronym: string;
  numberOfStudents?: number;
  isActive?: boolean;
  faculty: Facultad;
  specialtyManager?: SpecialtyManager;
  personalApoyo?: SpecialtyManager;
  creationDate?: string;
  modificationDate?: string;
  students?: any[] | null;
  tutoringPrograms?: any[] | null;
  numberStudents?: number;
  facultyId: number;
  specialtyId?: number;
  // COMPLETAR CON DATOS DEL RESPONSABLE
};