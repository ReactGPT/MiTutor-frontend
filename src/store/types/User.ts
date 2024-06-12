export type User = {
  id: number;
  institutionalEmail: string;
  pucpCode: string;
  isActive: boolean;
  creationDate: Date;
  modificationDate: Date;
  persona: {
    id: number;
    name: string;
    lastName: string;
    secondLastName: string;
    phone: string;
    isActive: boolean;
  };
  roles: any[] | null;
  isVerified: boolean;

  estudiante: {
    isRisk: boolean;
    specialityId: number;
    specialtyName: string;
    specialtyAcronym: string;
    facultyId: number;
    facultyName: string;
    facultyAcronym: string;
  } | null;
};

/* export type Student = {
  id: number;
  institutionalEmail: string;
  pucpCode: string;
  isActive: boolean;
  creationDate: Date;
  modificationDate: Date;
  persona: {
    id: number;
    name: string;
    lastName: string;
    secondLastName: string;
    phone: string;
    isActive: boolean;
  };
  isRisk: boolean;
  specialityId: number;
  specialtyName: string;
  specialtyAcronym: string;
  facultyId: number;
  facultyName: string;
  facultyAcronym: string;
}; */
