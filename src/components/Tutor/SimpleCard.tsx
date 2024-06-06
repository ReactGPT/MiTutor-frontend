import React from 'react';
import avatar from "../../assets/Tutor/no-avatar.webp";

interface CardProps {
  title: string;
  content: string;
  subContent: string;
  onClick?: () => void;
}

const SimpleCard: React.FC<CardProps> = ({ title, content, subContent, onClick }) => {
  return (
    <div onClick={onClick} className="bg-white shadow-custom rounded-lg flex flex-col justify-center items-center max-w-60 max-h-80" style={{ width: '300px', height: '200px', cursor: 'pointer' }}>
      <img className="h-2/3 w-full overflow-hidden" src={avatar} />
      <div className='h-1/3 flex flex-col p-1 items-center'>
        <h2 className="text-xl font-semibold text-primary text-center">{title}</h2>
        <div className="border-t border-gray-300 w-full"></div>
        <p className="text-gray-700 text-center">{content}</p>
        <p className="text-gray-700 text-center">{subContent}</p>
      </div>
    </div>
  );
};

export default SimpleCard;





