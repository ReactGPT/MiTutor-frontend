import {GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context";

function Login() {
    const {handleSuccessLogin:handleSuccess,handleError}=useAuth();
  return (
    <div className="w-screen bg-gradient-to-br from-white to-blue-300 h-screen flex justify-center">
        <div className="flex w-full h-full max-h-[720px] max-w-[1044px] justify-center">
            <GoogleLogin useOneTap onSuccess={handleSuccess} onError={handleError} />
        </div>
        
    </div>
  )
}

export default Login