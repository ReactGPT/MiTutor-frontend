import IconBack from "../../assets/svg/IconBack";
import IconBell from "../../assets/svg/IconBell";
import { useTitle } from "../../context/TitleContext";
import { useNavigate } from "react-router-dom";
const Header: React.FC = () => {
  const navigate = useNavigate();
  const { title } = useTitle();
  const handleOnClickBack = ()=>{
    navigate(-1);
  }
  return (
    <div className="w-full h-full flex flex-row justify-between items-center bg-[rgba(255,_255,_255,_0.50)] border-custom drop-shadow-md p-5">
      <div className="flex items-center justify-center">          
        <button onClick={handleOnClickBack} className="bg-white text-primary rounded-full p-2.5 size-13">
          <IconBack size={6} />
        </button>
      </div>

      <span className="font-montserrat text-4xl font-bold text-primary">{title}</span>

      <div className="flex items-center justify-center">
        <button onClick={() => { }} className="bg-white text-primary rounded-full p-2.5 size-13">
          <IconBell size={6} />
        </button>
      </div>
    </div>
  );
};

export default Header;