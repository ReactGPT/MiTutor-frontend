type Comment = {
  commentId: number;
  message: string;
  isActive: boolean;
  appointmentResultId: number;
  privacyTypeId: number;
};

type AppointmentResult = {
  appointmentResultId: number;
  asistio: boolean;
  isActive: boolean;
  comments: Comment[];
};

export type InitialData = {
  appointmentResult: AppointmentResult;
  studentId: number;
  tutoringProgramId: number;
  appointmentId: number;
};
