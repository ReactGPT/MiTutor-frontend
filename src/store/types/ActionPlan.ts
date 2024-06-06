export type ActionPlan = {
  actionPlanId: number;
  name: string;
  description: string;
  isActive: boolean;
  studentProgramId: number;
  TutorId: number;
  creationDate: Date;
  modificationDate: Date;
};

export type ActionPlanUpdate = {
  actionPlanId: number;
  name: string | undefined;
  description: string | undefined;
  isActive: boolean | undefined; // O ajusta el tipo según tu necesidad
  studentProgramId: number;
  tutorId: number;
  creationDate: string;
  modificationDate: string;
};
