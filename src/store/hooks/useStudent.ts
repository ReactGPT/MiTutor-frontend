import { useState } from "react";
import { Student } from '../types/Student';
import { getStudentInfo, getStudentIdInfo, getAllStudentsInfo, getStudentsBySpecialtyInfo, getStudentsByFacultyInfo } from "../services";

interface StudentHookReturnType {
  fetchStudentData: (idTutoringProgram: number) => Promise<Student[]>;
  fetchStudentIdData: (students:Student[]) => Promise<Student[]>;
  setStudentData: React.Dispatch<React.SetStateAction<Student[]>>;
  fetchAllStudentsData: () => Promise<Student[]>;
  fetchStudentSpecialtyData: (idEspecialidad: number) => Promise<Student[]>;
  fetchStudentFacultyData: (idFacultad: number) => Promise<Student[]>;
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
    } finally {
      setIsLoading(false);
    }
    return studentData;
  };

  const fetchStudentIdData = async (students:Student[]) => {
    setIsLoading(true);
    let studentData: Student[] = [];
    try {
      const studentRes = await getStudentIdInfo(students);
      studentData = studentRes.studentList;

      setStudentData(studentRes.studentList);
    } catch (err: any) {
      setError(err);
      setStudentData([]);

    } finally {
      setIsLoading(false);
    }
    return studentData;
  };
  const fetchAllStudentsData = async () => {
    setIsLoading(true);
    let studentData: Student[] = [];
    try {
      const studentRes = await getAllStudentsInfo();
      studentData = studentRes.studentList;

      setStudentData(studentRes.studentList);
    } catch (err: any) {
      setError(err);
      setStudentData([]);

    } finally {
      setIsLoading(false);
    }
    return studentData;
  };
  const fetchStudentSpecialtyData = async (idEspecialidad: number) => {
    setIsLoading(true);
    let studentData: Student[] = [];
    try {
      const studentRes = await getStudentsBySpecialtyInfo(idEspecialidad);
      studentData = studentRes.studentList;

      setStudentData(studentRes.studentList);
    } catch (err: any) {
      setError(err);
      setStudentData([]);

    } finally {
      setIsLoading(false);
    }
    return studentData;
  };
  const fetchStudentFacultyData = async (idFacultad: number) => {
    setIsLoading(true);
    let studentData: Student[] = [];
    try {
      const studentRes = await getStudentsByFacultyInfo(idFacultad);
      studentData = studentRes.studentList;

      setStudentData(studentRes.studentList);
    } catch (err: any) {
      setError(err);
      setStudentData([]);

    } finally {
      setIsLoading(false);
    }
    return studentData;
  };
  return { fetchAllStudentsData, fetchStudentData, setStudentData, fetchStudentIdData, fetchStudentSpecialtyData,fetchStudentFacultyData, studentData, isLoading, error };
}

export { useStudent };
