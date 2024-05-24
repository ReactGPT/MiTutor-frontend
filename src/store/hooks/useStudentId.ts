import {useState} from 'react';
import { Student } from './../types/Student';
import { getStudentIdInfo } from '../services/studentId';

interface StudentHookReturnType {
    fetchStudentIdData: (idStudent:number)=>Promise<Student[]>;
    studentIdData: Student[];
    isLoading: boolean;
    error: Error | null;
}
    
function useStudentId(): StudentHookReturnType{
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [studentIdData,setStudentIdData] = useState<Student[]>([]);
    const fetchStudentIdData = async (idStudent:number) => {
        setIsLoading(true);
        let studentData:Student[] = [];
        try {
            const studentRes =await getStudentIdInfo(idStudent);
            studentData=studentRes.studentList;

            setStudentIdData(studentRes.studentList);
        } catch (err:any) {
            setError(err);
            setStudentIdData([]);
            
        //return [];
        } finally {
            setIsLoading(false);
            
        }

        return studentData;
    };
    return { fetchStudentIdData,studentIdData: studentIdData, isLoading, error };
}

export {useStudentId}