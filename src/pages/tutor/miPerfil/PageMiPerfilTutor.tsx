import InputTutor from '../../../components/Tutor/InputTutor';
import image from '/src/assets/Tutor/no-avatar.webp';
import { Label } from 'flowbite-react';
import { useAuth } from '../../../context';

const PageMiPerfilTutor: React.FC = () => {
  const { userData } = useAuth();
  return (
    <div className="flex w-full h-full justify-center items-center">

      <div className="flex w-2/3 h-full justify-center items-center">
        <div className="flex-col w-2/3 justify-center items-center gap-6">
          <h1 className="font-montserrat text-4xl font-bold text-primary">{`${userData?.userInfo?.personInfo.name} ${userData?.userInfo?.personInfo.lastName} ${userData?.userInfo?.personInfo.secondLastName}`}</h1>
          <InputTutor titulo="Código" texto="20004587" enable={false} />
          <InputTutor titulo="Correo Electrónico" texto={userData?.email} enable={false} />
          <InputTutor titulo="Telefono" texto="998675729" enable={false} />
        </div>
      </div>

      <div className="flex w-1/3 h-full justify-center items-center">
        <div className="flex w-full">
          {userData ?
            <img src={userData?.imageUrl} alt="Imagen Tutor" className="w-[200px] h-[200px] rounded-full" />
            :
            <img src={image} alt="Imagen Tutor" className="w-[200px] h-[200px] rounded-full" />
          }
        </div>
      </div>

    </div>
  );
};

export default PageMiPerfilTutor;