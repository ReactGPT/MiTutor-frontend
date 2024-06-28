import {useState} from 'react';

import { crearEditarUsuario, eliminarUsuario, getUsuarios, getStudents, crearEditarAlumno,getUsuariosSinEstudiantes, listarTiposRoles, modificarRolesUsuario } from '../services/User';

import { User } from '../types/User';
import { Faculty, Specialty, TipoRol } from '../types';
import { UnitDerivation } from '../types/UnitDerivation';


type UserHookReturnType = {
    userData: User[];
    loading: boolean;
    error: any;
    fetchUsers: () => Promise<void>;
    fetchUsersNoStudents: () => Promise<void>;
    postUser: (user:User) => Promise<boolean>;
    postStudent: (user:User) => Promise<boolean>;
    deleteUser: (id:number) => Promise<boolean>;
    fetchStudents: () => Promise<void>;
    fetchStudentsSingleSet:()=> Promise<User[]>;
    fetchUsersSingleSet:()=> Promise<User[]>;
    fetchRoles:(id:number)=>Promise<TipoRol[]>;
    postRoles:(id:number,listaRoles:TipoRol[],faculty:Faculty|null,specialty:Specialty|null,derivatioUnit:UnitDerivation|null)=>Promise<boolean>;
};
    
function useUser(): UserHookReturnType {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);
    const [userData,setUserData] = useState<User[]>([]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await getUsuarios();
            setUserData(response.userList);            
        } catch (err:any) {
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
        } catch (err:any) {
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
        } catch (err:any) {
            setError(err);
            setUserData([]);
        } finally {
            setLoading(false);
        }
    }
    const fetchStudentsSingleSet=async ()=>{
        setLoading(true);
        try {
            const response = await getStudents();
            //setUserData(response.userList);     
            return response.userList;       
        } catch (err:any) {
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
        } catch (err:any) {
            setError(err);
            //setUserData([]);
            return [];
        } finally {
            setLoading(false);
        }
    }

    const postUser = async (user:User) => {
        setLoading(true);
        try {
            //console.log("user en postUser: ",user)
            const response = await crearEditarUsuario(user);
            if(!response.sucess){
                throw new Error(response.message);
            }
            return true;
        } catch (err:any) {
            setError(err);
            return false;
        } finally {
            setLoading(false);
        }
    }

    const postStudent = async (user:User) => {
        setLoading(true);
        try {
            //console.log("user en postUser: ",user)
            const response = await crearEditarAlumno(user);
            if(!response.sucess){
                throw new Error(response.message);
            }
            return true;
        } catch (err:any) {
            setError(err);
            return false;
        } finally {
            setLoading(false);
        }
    }

    const deleteUser = async (id:number) => {
        setLoading(true);
        try {
            const response = await eliminarUsuario(id);
            if(!response.sucess){
                throw new Error(response.message);
            }
            return true;
        } catch (err:any) {
            setError(err);
            return false;
        } finally {
            setLoading(false);
        }
    }

    const fetchRoles = async(id:number=-1)=>{
        setLoading(true);
        //let tiposRoles: TipoRol[]=[]
        try {
            const response = await listarTiposRoles(id);
            if(!response.sucess){
                throw new Error(response.message);
            }
            //console.log(response.data);
            return response.data;
        } catch (err:any) {
            setError(err);
            return [];
        } finally {
            setLoading(false);
        }
    }
    const postRoles = async(id:number,listaRoles:TipoRol[],faculty:Faculty|null,specialty:Specialty|null,derivatioUnit:UnitDerivation|null)=>{
        setLoading(true);
        //let tiposRoles: TipoRol[]=[]
        try {
            const response = await modificarRolesUsuario(id,listaRoles,faculty,specialty,derivatioUnit);
            if(!response.sucess){
                throw new Error(response.message);
            }
            //console.log(response.data);
            return true;
        } catch (err:any) {
            setError(err);
            return false;
        } finally {
            setLoading(false);
        }
    }

    return { userData, loading, error, fetchUsers,fetchUsersNoStudents, postUser,postStudent, deleteUser, fetchStudents,fetchStudentsSingleSet, fetchUsersSingleSet,fetchRoles,postRoles };

}

export {useUser}
    