import React from 'react';

const HoverButton = ({ icon: Icon, text, onClick }) => {

  return (
    <div
      className={`flex justify-between items-center gap-1 hover:cursor-pointer hover:text-indigo-600 hover:bg-indigo-100 rounded-lg px-2 py-1`}
      onClick={onClick}
    >
      {Icon && <Icon className="h-5 w-5" />}
      <span className={`text-sm mt-1`}>{text}</span>
    </div>
  );
};

export default HoverButton;
