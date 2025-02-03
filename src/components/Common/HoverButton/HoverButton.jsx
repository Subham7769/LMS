import React from 'react';

const HoverButton = ({ icon: Icon, text, onClick }) => {

  return (
    <div
      className={`flex justify-between items-center gap-1 bg-indigo-50 hover:cursor-pointer hover:text-indigo-600 hover:bg-indigo-100 rounded-lg px-2 py-2`}
      onClick={onClick}
    >
      {Icon && <Icon className="h-5 w-5" />}
      <span>{text}</span>
    </div>
  );
};

export default HoverButton;
