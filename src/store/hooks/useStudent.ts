import { useState } from "react";
import { Student } from "./../types/Student";
import { getStudentInfo } from "../services/student";

interface StudentHookReturnType {
  fetchStudentData: (idTutoringProgram: number) => Promise<void>;
  studentData: Student[];
  isLoading: boolean;
  error: Error | null;
}

function useStudent(): StudentHookReturnType {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [studentData, setStudentData] = useState<Student[]>([]);
  const fetchStudentData = async (idTutoringProgram: number) => {
    setIsLoading(true);
    try {
      const studentData = await getStudentInfo(idTutoringProgram);
      setStudentData(studentData.studentList);
    } catch (err: any) {
      setError(err);
      setStudentData([]);
      //return [];
    } finally {
      setIsLoading(false);
    }
  };
  return { fetchStudentData, studentData, isLoading, error };
}

export { useStudent };
