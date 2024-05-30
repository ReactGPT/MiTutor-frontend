import React, { ReactElement, createContext, useContext, useEffect, useMemo, useState } from "react";
import { CredentialResponse, googleLogout } from "@react-oauth/google";
import googleCredentialDecode from "../utils/googleCredentialDecode";
//import { useNavigate } from "react-router-dom";
import { useUserAccountAuth } from "../store/hooks";
import { UserAccount } from "../store/types";
import { useRouter } from "./RouterContext";
import { Routes } from "../data/routes";
type UserData= {
    username:string;
    email:string;
    imageUrl:string;
    domainEmail:string;
    isAuthenticated:boolean;
    token:string;
    userInfo:UserAccount|null;
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
    //const {handleSetRoutes}= useRouter();
    const [credential,setCredentials] = useState<any>(null);
    const {fetchUserInfo,userInfo,resetUserInfo}=useUserAccountAuth();
    useEffect(()=>{
        setCredentials(null);
    },[])
    
    const handleSuccess= (credentialResponse: CredentialResponse)=>{
        //console.log(credentialResponse);
        if(credentialResponse.credential){
            const {payload} = googleCredentialDecode(credentialResponse.credential);
            fetchUserInfo(payload.email.toString())//
            //fetchUserInfo("tutortest@pucp.edu.pe")//Usar el que necesites
            .then(()=>{
              setCredentials(payload);
            });
            //console.log(payload);
        }
        //return <Landing/>
    }
    const handleError = ()=>{
      try{
        
        googleLogout();
      }
      catch{
        
      }
        setCredentials(null);
        resetUserInfo();
    }
    const handleLogout=()=>{
        setCredentials(null);
        resetUserInfo();
        googleLogout();
    }
    
    const userData:UserData = useMemo(()=>{
        return {
            username: credential? credential.name:'',
            email:credential?credential.email:'',
            imageUrl:credential?credential.picture:'',
            domainEmail:credential?credential.hd:'',
            isAuthenticated:credential?true:false,
            token:'',
            userInfo:userInfo
        }
    },[credential,userInfo]);

    // useEffect(()=>{
    //     //console.log(userData);
    //     if(userData.isAuthenticated){
    //       fetchUserInfo("tutortest@pucp.edu.pe")
    //       .then(()=>{
    //         console.log("USER INFO: ",userInfo)
    //       });
    //     }
    // },[userData]);
    // useEffect(()=>{
    //   console.log("USER INFO: ",userData);
    //   if(userInfo && userInfo.isVerified){
    //     handleSetRoutes(userInfo.roles);
    //   }
    // },[userInfo])
    return (
      <AuthContext.Provider value={{userData:userData, handleSuccessLogin:handleSuccess,handleError:handleError,handleLogout:handleLogout }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export { AuthContext, AuthProvider, useAuth };