import {useState} from 'react';
import { crearEditarUsuario, getUsuarios } from '../services/User';
import { User } from '../types/User';


type UserHookReturnType = {
    userData: User[];
    loading: boolean;
    error: any;
    fetchUsers: () => Promise<void>;
    postUser: (user:User) => Promise<boolean>;
};
    
function useUser(): UserHookReturnType {
    const [loading, setLoading] = useState<boolean>(true);
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

    const postUser = async (user:User) => {
        setLoading(true);
        try {
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

    return { userData, loading, error, fetchUsers, postUser };
}

export {useUser}
    