import React, { ReactElement, createContext, useContext, useEffect, useMemo, useState } from "react";
import { CredentialResponse, googleLogout } from "@react-oauth/google";
import googleCredentialDecode from "../utils/googleCredentialDecode";
//import { useNavigate } from "react-router-dom";
type UserData= {
    username:string;
    email:string;
    imageUrl:string;
    domainEmail:string;
    isAuthenticated:boolean;
    token:string;
};

type AuthContextType = {
    userData:UserData;
    handleSuccessLogin: (credentialResponse: CredentialResponse) => void;
    handleError:()=>void;
    handleLogout:()=>void;
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
    //const navigate=useNavigate();
    const [credential,setCredentials] = useState<any>(null);

    useEffect(()=>{
        setCredentials(null);
    },[])
    
    const handleSuccess= (credentialResponse: CredentialResponse)=>{
        //console.log(credentialResponse);
        if(credentialResponse.credential){
            const {payload} = googleCredentialDecode(credentialResponse.credential);
            setCredentials(payload);
            //console.log(payload);
        }
        //return <Landing/>
    }
    const handleError = ()=>{

    }
    const handleLogout=()=>{
        setCredentials(null);
        googleLogout();
        

    }
    
    const userData:UserData = useMemo(()=>{
        return {
            username: credential? credential.name:'',
            email:credential?credential.email:'',
            imageUrl:credential?credential.picture:'',
            domainEmail:credential?credential.hd:'',
            isAuthenticated:credential?true:false,
            token:''

        }
    },[credential]);

    useEffect(()=>{
        console.log(userData);

    },[userData]);

    return (
      <AuthContext.Provider value={{userData:userData, handleSuccessLogin:handleSuccess,handleError:handleError,handleLogout:handleLogout }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export { AuthContext, AuthProvider, useAuth };