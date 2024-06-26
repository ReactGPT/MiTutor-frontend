import { getUserInfo } from '../services';
import { useEffect, useState } from 'react';
import { UserAccount } from "../types";


type ProgramaTutoriaHookReturnType = {
  fetchUserInfo: (email?: string, codigoPUCP?: string) => Promise<any>;
  resetUserInfo: () => void;
  userInfo: UserAccount | null;
  isLoading: boolean;
  error: Error | null;
};

function useUserAccountAuth(): ProgramaTutoriaHookReturnType {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [userInfo, setUserInfo] = useState<UserAccount | null>(null);

  const fetchUserInfo = async (email: string = '', codigoPUCP: string = '') => {
    setIsLoading(true);
    let response = null;
    try {
      response = await getUserInfo(email, codigoPUCP);
      if (response.success) {
        setUserInfo(response.data);
      }

    } catch (err: any) {
      setError(err);
      setUserInfo(null);

      //return [];
    } finally {
      setIsLoading(false);
    }
    return response;
  };

  const resetUserInfo = () => { setUserInfo(null); };

  useEffect(() => {
    //resetUserInfo();
  }, []);

  return { fetchUserInfo, resetUserInfo, userInfo, isLoading, error };

}


export { useUserAccountAuth };