import React, { ReactElement, createContext, useContext, useEffect, useState } from "react";
import { CredentialResponse, googleLogout } from "@react-oauth/google";
import googleCredentialDecode from "../utils/googleCredentialDecode";
import { useUserAccountAuth } from "../store/hooks";
import { UserAccount } from "../store/types";

type UserData = {
  username: string;
  email: string;
  imageUrl: string;
  isLogged: boolean;
  token: string;
  userInfo: UserAccount | null;
};

type AuthContextType = {
  userData: UserData | null;
  error: boolean;
  isLoading: boolean;
  handleSuccessLogin: (credentialResponse: CredentialResponse) => void;
  handleError: () => void;
  handleLogout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth solo se puede usar dentro del AuthProvider");
  }
  return context;
};

type AuthProviderProps = {
  children: ReactElement;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { fetchUserInfo, userInfo, resetUserInfo, isLoading } = useUserAccountAuth();
  const [user, setUser] = useState<UserData | null>(() => {
    const storedUser = localStorage.getItem("authCredential");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [error, setError] = useState<boolean>(false);

  /* const handleSuccess = (credentialResponse: CredentialResponse) => {
    console.log("ejecutando handleSuccess");
    if (credentialResponse.credential) {
      const { payload } = googleCredentialDecode(credentialResponse.credential);
      console.log("payload: ");
      console.log(payload);
      fetchUserInfo(payload.email.toString())
        .then((response) => {
          console.log("response: ");
          console.log(response);
          console.log("userInfo: ");
          console.log(userInfo);
          if (userInfo?.isVerified && response.success) { // aca esta el error de el doble login
            const newUser = {
              email: payload.email,
              imageUrl: payload.picture,
              token: '',
              isLogged: true,
              userInfo: response.data,
              username: payload.username
            };
            console.log("newUser: ");
            console.log(newUser);
            setUser(newUser);
            localStorage.setItem("authCredential", JSON.stringify(newUser));
          }
          else {
            setUser(null);
          }
        });
      //console.log(payload);
    }
    //return <Landing/>
  }; */

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    setError(false);
    //console.log("ejecutando handleSuccess");
    if (credentialResponse.credential) {
      const { payload } = googleCredentialDecode(credentialResponse.credential);
      //console.log("payload: ");
      //console.log(payload);
      try {
        const response = await fetchUserInfo(payload.email.toString());
        //console.log("response: ");
        //console.log(response);

        if (response.data?.isVerified && response.success) {
          const newUser = {
            email: payload.email,
            imageUrl: payload.picture,
            token: '',
            isLogged: true,
            userInfo: response.data,
            username: payload.username
          };
          //console.log("newUser: ");
          //console.log(newUser);
          setUser(newUser);
          localStorage.setItem("authCredential", JSON.stringify(newUser));
          //setError(false);
        } else {
          setUser(null);
          setError(true);
        }
      } catch (error) {
        //console.error("Error fetching user info: ", error);
        setUser(null);
        setError(true);
      }
    }
  };

  const handleLogout = () => {
    //console.log("ejecutando LogOut!");
    setUser(null);
    googleLogout();
    localStorage.removeItem("authCredential");
  };

  const handleError = () => {
    try {
      googleLogout();
    }
    catch {

    }
    resetUserInfo();
    localStorage.removeItem("authCredential");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("authCredential");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      //console.log("SI esta logueado, se encontró los datos en localStorage");
    } else {
      //console.log("NO esta logueado, no se encontró los datos en localStorage");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userData: user, error: error, handleSuccessLogin: handleSuccess, handleError: handleError, handleLogout: handleLogout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider, useAuth };
