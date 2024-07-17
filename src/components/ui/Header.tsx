import IconBack from "../../assets/svg/IconBack";
import { useTitle } from "../../context/TitleContext";
import { useNavigate } from "react-router-dom";
import Notifications from "../Notifications";
import React from 'react';
import { useAuth } from "../../context";
import { getTutorId } from "../../store/hooks/RolesIdTutor";
import MeetingRoom from "../MeetingRoom";

const Header: React.FC = () => {
  const { userData } = useAuth();

  const idTutor = getTutorId(userData);

  const navigate = useNavigate();
  const { title } = useTitle();

  const handleOnClickBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full h-full flex flex-row justify-between items-center bg-[rgba(255,_255,_255,_0.50)] border-custom drop-shadow-md p-5">
      <div className="flex items-center justify-center">
        <button onClick={handleOnClickBack} className="bg-white text-primary rounded-full p-2.5 size-13">
          <IconBack size={6} />
        </button>
      </div>

      <span className="font-montserrat text-4xl font-bold text-primary">{title}</span>

      <div className="flex gap-5">
        <div className="flex items-center justify-center">
          {idTutor !== 0 && <MeetingRoom />}
        </div>
        <div className="flex items-center justify-center">
          <Notifications />
        </div>
      </div>
    </div>
  );
};

export default Header;