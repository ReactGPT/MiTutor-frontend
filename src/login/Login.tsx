import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context";
import logo from '../assets/logo.png';
function Login() {
  const { handleSuccessLogin: handleSuccess, handleError } = useAuth();
  return (
    <div className="w-screen bg-gradient-to-br from-white to-blue-300 h-screen flex justify-center">

      <div className="flex w-full h-full max-h-[720px] max-w-[1044px] justify-center items-center">
        <div className="flex flex-col border-custom drop-shadow-md w-[300px] h-[350px] items-center bg-white gap-10">
          <div className='flex items-center justify-center gap-3 px-4 py-3 font-montserrat min-h-[60px] h-[25%]'>
            <img alt='Logo' src={logo} draggable="false"></img>
            <span className='text-neutral-950 text-4xl font-semibold letter-spacing-title'>MiTutor</span>
          </div>
          <div className="flex flex-col gap-8 items-center justify-center">
            <h6 className="font-montserrat text-xl font-semibold text-primary">Ingresar</h6>
            <GoogleLogin useOneTap onSuccess={handleSuccess} onError={handleError} />
          </div>
        </div>

      </div>

    </div>
  );
}

export default Login;