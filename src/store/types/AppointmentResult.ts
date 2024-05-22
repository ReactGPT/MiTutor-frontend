import { Dayjs } from 'dayjs';

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
  startTime : string;
  endTime : string;
  isActive: boolean;
  comments: Comment[];
};

export type InitialData = {
  appointmentResult: AppointmentResult;
  studentId: number;
  tutoringProgramId: number;
  appointmentId: number;
};
