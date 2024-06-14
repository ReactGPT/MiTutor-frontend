import InputTutor from '../../../components/Tutor/InputTutor';
import image from '/src/assets/Tutor/no-avatar.webp';
import Button from '../../../components/Button';
import { useAuth } from '../../../context';
import { useNavigate } from "react-router-dom";

const PageMiPerfilTutor: React.FC = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const goToDerivaciones = () => {
    navigate("/miPerfil/derivaciones");
  };

  return (
    <div className="flex w-full h-full justify-center items-center">

      <div className="flex w-2/3 h-full justify-center items-center">
        <div className="flex-col w-2/3 justify-center items-center gap-6">
          <h1 className="font-montserrat text-4xl font-bold text-primary">{`${userData?.userInfo?.personInfo.name} ${userData?.userInfo?.personInfo.lastName} ${userData?.userInfo?.personInfo.secondLastName}`}</h1>
          <InputTutor titulo="Código" texto={userData?.userInfo?.pucpCode} enable={false} />
          <InputTutor titulo="Correo Electrónico" texto={userData?.email} enable={false} />
          <InputTutor titulo="Telefono" texto={userData?.userInfo?.personInfo.phone} enable={false} />
        </div>
      </div>

      {/*<div className="flex w-1/3 h-full flex-col justify-center items-center">
        <div className="flex w-full">
          {userData ?
            <img src={userData?.imageUrl} alt="Imagen Tutor" className="w-[200px] h-[200px] rounded-full" />
            :
            <img src={image} alt="Imagen Tutor" className="w-[200px] h-[200px] rounded-full" />
          }
        </div>
        <div className="flex w-full mt-4 ml-20">
          <Button onClick={goToDerivaciones} variant="primario" text="Derivaciones" />
        </div>
        </div>*/}
      <div className="w-1/2">
        <div className="flex justify-center">
          {userData ?
            <img src={userData?.imageUrl} alt="Imagen Tutor" className="w-[200px] h-[200px] rounded-full" />
            :
            <img src={image} alt="Imagen Tutor" className="w-[200px] h-[200px] rounded-full" />
          }
        </div>
        <div>
          <div className="flex justify-center">
            <div className="space-x-4 pt-5">
              <ul className="flex flex-col items-center w-full">
                <li className='mb-4'>
                  <Button onClick={goToDerivaciones} variant="call-to-action" text="Derivaciones" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageMiPerfilTutor;