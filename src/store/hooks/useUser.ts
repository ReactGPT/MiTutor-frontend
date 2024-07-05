import { useState } from 'react';

import { crearEditarUsuario, eliminarUsuario, getUsuarios, getStudents, crearEditarAlumno, getUsuariosSinEstudiantes, validarCodigoPUCP, getUsuariosSinAdminSinAlumnos } from '../services/User';

import { User } from '../types/User';


type UserHookReturnType = {
  userData: User[];
  loading: boolean;
  error: any;
  fetchUsers: () => Promise<void>;
  fetchUsersNoAdminNoStudents: () => Promise<void>;
  fetchUsersNoStudents: () => Promise<void>;
  postUser: (user: User) => Promise<boolean>;
  postStudent: (user: User) => Promise<boolean>;
  deleteUser: (id: number) => Promise<boolean>;
  fetchStudents: () => Promise<void>;
  fetchStudentsSingleSet: () => Promise<User[]>;
  fetchUsersSingleSet: () => Promise<User[]>;
  validateUserByPucpCode: (pucpCode: string) => Promise<boolean>;
};

function useUser(): UserHookReturnType {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [userData, setUserData] = useState<User[]>([]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsuarios();
      setUserData(response.userList);
    } catch (err: any) {
      setError(err);
      setUserData([]);
    } finally {
      setLoading(false);
    }
  }

  const fetchUsersNoAdminNoStudents = async () => {
    setLoading(true);
    try {
      const response = await getUsuariosSinAdminSinAlumnos();
      setUserData(response.userList);
    } catch (err: any) {
      setError(err);
      setUserData([]);
    } finally {
      setLoading(false);
    }
  }

  const fetchUsersNoStudents = async () => {
    setLoading(true);
    try {
      const response = await getUsuariosSinEstudiantes();
      setUserData(response.userList);
    } catch (err: any) {
      setError(err);
      setUserData([]);
    } finally {
      setLoading(false);
    }
  }
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await getStudents();
      setUserData(response.userList);
    } catch (err: any) {
      setError(err);
      setUserData([]);
    } finally {
      setLoading(false);
    }
  }
  const fetchStudentsSingleSet = async () => {
    setLoading(true);
    try {
      const response = await getStudents();
      //setUserData(response.userList);     
      return response.userList;
    } catch (err: any) {
      setError(err);
      //setUserData([]);
      return [];
    } finally {
      setLoading(false);
    }
  }
  const fetchUsersSingleSet = async () => {
    setLoading(true);
    try {
      const response = await getUsuarios();
      //setUserData(response.userList);   

      return response.userList;
    } catch (err: any) {
      setError(err);
      //setUserData([]);
      return [];
    } finally {
      setLoading(false);
    }
  }

  const postUser = async (user: User) => {
    setLoading(true);
    try {
      //console.log("user en postUser: ",user)
      const response = await crearEditarUsuario(user);
      if (!response.sucess) {
        throw new Error(response.message);
      }
      return true;
    } catch (err: any) {
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  }

  const postStudent = async (user: User) => {
    setLoading(true);
    try {
      //console.log("user en postUser: ",user)
      const response = await crearEditarAlumno(user);
      if (!response.sucess) {
        throw new Error(response.message);
      }
      return true;
    } catch (err: any) {
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  }

  const deleteUser = async (id: number) => {
    setLoading(true);
    try {
      const response = await eliminarUsuario(id);
      if (!response.sucess) {
        throw new Error(response.message);
      }
      return true;
    } catch (err: any) {
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  }

  const validateUserByPucpCode = async (pucpCode: string) => {
    setLoading(true);
    try {
      const response = await validarCodigoPUCP(pucpCode);
      //setUserData(response.userList);
      return true;
    } catch (err: any) {
      setError(err);
      setUserData([]);
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { userData, loading, error, fetchUsers, fetchUsersNoStudents, postUser, postStudent, deleteUser, fetchStudents, fetchStudentsSingleSet, fetchUsersSingleSet, validateUserByPucpCode, fetchUsersNoAdminNoStudents };

}

export { useUser }
