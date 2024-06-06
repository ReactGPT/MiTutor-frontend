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
    //domainEmail:string;
    isLogged:boolean;
    token:string;
    userInfo:UserAccount|null;
};

type AuthContextType = {
    userData:UserData|null;
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
    
    
    //const [credential,setCredentials] = useState<any>(null);
    const {fetchUserInfo,userInfo,resetUserInfo}=useUserAccountAuth();
    const [user,setUser] = useState<UserData|null>(()=>{
      const storedUser = localStorage.getItem("authCredential");
      return storedUser? JSON.parse(storedUser):null;
    });

    const handleSuccess= (credentialResponse: CredentialResponse)=>{
      //console.log(credentialResponse);
      if(credentialResponse.credential){
          const {payload} = googleCredentialDecode(credentialResponse.credential);
          //console.log(payload);
          fetchUserInfo(payload.email.toString())
          //fetchUserInfo("tutortest@pucp.edu.pe")//Usar el que necesites
          .then((response)=>{
            //setCredentials(payload);
            if(userInfo?.isVerified&&response.success){
              const newUser = {
                email:payload.email,
                imageUrl:payload.picture,
                token:'',
                isLogged:true,
                userInfo:response.data,
                username:payload.username
              };
              setUser(newUser);
              localStorage.setItem("authCredential",JSON.stringify(newUser));
            }
            else{
              setUser(null);
            }
          });
          //console.log(payload);
      }
      //return <Landing/>
  };
    
    
    const handleLogout=()=>{
      //setCredentials(null);
      setUser(null);
      //resetUserInfo();
      googleLogout();
      localStorage.removeItem("authCredential");
    }
    
    // const storedCredential = useMemo(()=>{
    //   return localStorage.getItem("authCredential");
    // },[]);
    
    // useEffect(()=>{
      
    //   if (storedCredential) {
    //       const parsedCredential = JSON.parse(storedCredential);
    //       setCredentials(parsedCredential);
    //       console.log("Paso 1 Fetch User");  
    //       fetchUserInfo(parsedCredential.email.toString());
    //     }
    //     else{
    //       setCredentials(null);
    //       resetUserInfo();
    //     }
    // },[]);
    
    
    const handleError = ()=>{
      try{
        
        googleLogout();
      }
      catch{
        
      }
        //setCredentials(null);
        resetUserInfo();
        localStorage.removeItem("authCredential");
    };
    
    
    // const userData:UserData = useMemo(()=>{
    //   console.log("Actualiza user data");  
    //   return {
    //         username: credential? credential.name:'',
    //         email:credential?credential.email:'',
    //         imageUrl:credential?credential.picture:'',
    //         //domainEmail:storedCredential?JSON.parse(storedCredential).hd:'',
    //         isLogged:credential?true:false,
    //         token:'',
    //         userInfo:userInfo
    //     }
    // },[userInfo]);
    // useEffect(()=>{
    //   if(userData.isLogged){
    //     localStorage.setItem("authCredential", JSON.stringify(userData));
    //   }
    //   else{
    //     localStorage.removeItem("authCredential");
    //   }
    // },[userData.userInfo])
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
    useEffect(()=>{
      const storedUser = localStorage.getItem("authCredential");
      if(storedUser){
        setUser(JSON.parse(storedUser));
      }
    },[]);
    return (
      <AuthContext.Provider value={{userData:user, handleSuccessLogin:handleSuccess,handleError:handleError,handleLogout:handleLogout }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export { AuthContext, AuthProvider, useAuth };
