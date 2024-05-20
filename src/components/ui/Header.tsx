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
      <button onClick={() => { }} className="bg-white text-primary rounded-full p-2.5 size-13">
        <div className="flex items-center justify-center">
          <button onClick={handleOnClickBack}>
          <IconBack size={6} />
          </button>
        </div>
      </button>

      <span className="font-montserrat text-4xl font-bold text-primary">{title}</span>

      <button onClick={() => { }} className="bg-white text-primary rounded-full p-2.5 size-13">
        <div className="flex items-center justify-center">
          <IconBell size={6} />
        </div>
      </button>
    </div>
  );
};

export default Header;