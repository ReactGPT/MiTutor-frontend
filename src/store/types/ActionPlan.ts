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