import {useState} from 'react';
import { crearEditarUsuario, eliminarUsuario, getUsuarios, getStudents } from '../services/User';
import { User } from '../types/User';


type UserHookReturnType = {
    userData: User[];
    loading: boolean;
    error: any;
    fetchUsers: () => Promise<void>;
    postUser: (user:User) => Promise<boolean>;
    deleteUser: (id:number) => Promise<boolean>;
    fetchStudents: () => Promise<void>;
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

    return { userData, loading, error, fetchUsers, postUser, deleteUser, fetchStudents };
}

export {useUser}
    