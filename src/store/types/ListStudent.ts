export type ListStudent = {
  studentId: number;
  name: string;
  lastName: string;
  secondLastName: string;
  pucpCode: string;
  institutionalEmail: string;
  phone: string;
  specialtyName: string;
  facultyName: string;
};

export type ListStudent2 = {
  studentId: number;
  name: string;
  lastName: string;
  secondLastName: string;
  pucpCode: string;
  isRisk: boolean;
  asistio: boolean;
  appointmentResultId : number;
  tutoringProgramId : number;
  appointmentId : number;
  message1: string;
  message2:string;
};