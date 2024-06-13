import React from 'react';
import avatar from "../../assets/Tutor/no-avatar.webp";

interface CardProps {
  title: string;
  content: string;
  subContent?: string;
  onClick?: () => void;
}

const SimpleCard: React.FC<CardProps> = ({ title, content, subContent, onClick }) => {
  return (
    <div onClick={onClick} className="bg-white shadow-custom rounded-lg flex flex-col justify-center items-center w-full h-full p-3 cursor-pointer">
      <img className="w-16 h-16 object-cover rounded-full mb-3" src={avatar} alt="Avatar" />
      <div className="flex flex-col items-center justify-center w-full">
        <h2 className="text-xl font-semibold text-primary text-center mb-2">{title}</h2>
        <div className="border-t border-gray-300 mb-2 w-full"></div>
        <p className="text-gray-700 mb-2 text-center">{content}</p>
        {subContent && <p className="text-gray-700 mb-2 text-center">{subContent}</p>}
      </div>
    </div>
  );
};

export default SimpleCard;