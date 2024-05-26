import InputTutor from '../../../components/Tutor/InputTutor';
//import image from '/src/assets/Tutor/no-avatar.webp';
import { Label } from 'flowbite-react';
import { useAuth } from '../../../context';

const PageMiPerfilTutor: React.FC = () => {
  const {userData}=useAuth();
  return (
    <div className="w-full h-full flex">
      <div className="w-1/2 flex flex-col">
        <div className="flex justify-center">
          <h1 className="font-montserrat text-[50px] font-bold text-primary pt-12">{userData.username}</h1>
        </div>
        <div className="flex-1 pt-12">
          <ul className="px-11">
            <Label value="Codigo:" className="text-primary font-roboto" />
            <InputTutor texto="20004587" enable={false} />
            <Label value="Correo Electronico:" className="text-primary font-roboto" />
            <InputTutor texto={userData.email} enable={false} />
            <Label value="Telefono:" className="text-primary font-roboto" />
            <InputTutor texto="998675729" enable={false} />
          </ul>
        </div>
      </div>
      <div className="w-1/2">
        <div className="flex w-full justify-center items-center py-48">
          <img src={userData.imageUrl} alt="Imagen Tutor" className="w-[200px] h-[200px] rounded-full"/>
        </div>
      </div>
    </div>
  );
};

export default PageMiPerfilTutor;