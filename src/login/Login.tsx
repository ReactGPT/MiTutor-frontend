import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context";
import logo from '../assets/logo.png';
import { Spinner } from "../components";
import { useUserAccountAuth } from "../store/hooks";
import loginImg from "../assets/Tutor/login.webp";

function Login() {
  const { handleSuccessLogin: handleSuccess, handleError } = useAuth();
  const { isLoading } = useUserAccountAuth();
  return (
    <div className="w-screen bg-gradient-to-br from-white to-blue-300 h-screen flex justify-center items-center">

      <div className="flex w-full h-full max-h-[720px] max-w-[1044px] justify-center items-center">
        <div className="flex w-3/4 h-3/4 justify-center items-center border-custom shadow-custom overflow-hidden">
          <div className="w-1/2 h-full">
            <img className="w-full h-full object-cover" alt='People Image' src={loginImg} draggable={false} />
          </div>
          <div className="flex w-1/2 h-full flex-col bg-white">

            <div className='flex w-full h-1/6 bg-primary items-center gap-3 px-10 font-montserrat'>
              <img alt='Logo' src={logo} draggable={false} />
              <span className='text-white text-4xl font-semibold letter-spacing-title'>MiTutor</span>
            </div>

            <div className="flex flex-col w-full h-5/6 gap-10 py-10 px-8">

              <label className="font-roboto font-normal">
                Bienvenido a
                <label className="text-primary"> MiTutor</label>
              </label>

              <h6 className="w-full font-roboto text-5xl font-medium text-black">Ingresar</h6>

              <div className="flex items-center justify-center">
                {isLoading ? <Spinner color="primary" size='md' /> :
                  <GoogleLogin onSuccess={handleSuccess} onError={handleError} />}
              </div>

            </div>

          </div>
        </div>

      </div>

    </div >
  );
}

export default Login;