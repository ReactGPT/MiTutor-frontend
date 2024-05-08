export type TutoringProgram = {
  id?:number;
  tutorId?: number;
  tutorProgramTutorTypeId?: number;
  tutoringProgramId?: number;
  faceToFace: boolean;
  groupBased: boolean;
  individualBased: boolean;
  membersCount: number;
  programName: string;
  description: string;
  facultyId: number;
  facultyName: string;
  specialtyId: number;
  specialtyName: string;
  tutorTypeId?: number;
  tutorTypeDescription?: string;
};