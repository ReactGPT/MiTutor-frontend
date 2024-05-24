import React from 'react';

interface CardProps {
  title: string;
  content: string;
  subContent: string;
}

const SimpleCard: React.FC<CardProps> = ({ title, content, subContent }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-center items-center" style={{ width: '300px', height: '200px', cursor: 'pointer' }}>
      <h2 className="text-2xl font-bold mb-4 text-blue-700 text-center">{title}</h2>
      <div className="border-t border-gray-300 w-full mb-4"></div>
      <p className="text-gray-700 font-bold text-center">{content}</p>
      <p className="text-gray-700 text-center">{subContent}</p>
    </div>
  );
};

export default SimpleCard;





