
interface Persona {
  id: number;
  name: string;
  lastName: string;
  secondLastName: string;
  phone: string | null;
  isActive: boolean;
}
 
interface UserAccount {
  id: number;
  institutionalEmail: string;
  pucpCode: string | null;
  isActive: boolean;
  persona: Persona;
}
 
export type Tutor={
  tutorId: number;
  meetingRoom: string | null;
  isActive: boolean;
  userAccount: UserAccount;
  faculty: string | null;
  tutoringProgram: string | null;
}

export type tutorxalumno = {

  tutorId : number;
  tutorName : string;
  tutorLastName : string;
  tutorSecondLastName : string;
  state : string;

}