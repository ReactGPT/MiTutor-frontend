export type ListTutoringProgram = {
  tutoringProgramId: number;
  programName: string;
  description: string;
  faceToFace?: boolean;
  virtual?: boolean;
  facultyName: string;
  specialtyName: string;
  tutorType: string;
};

export type programaDeTutoriaAlumno = {
  tutoringProgramId: number;
  programName: string;
  programDescription: string;
  faceToFace: boolean;
  virtual: boolean;
  facultyName: string;
  specialtyName: string;
  tutorType: string;
};