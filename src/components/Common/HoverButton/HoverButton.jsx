import React from 'react';

const HoverButton = ({ icon: Icon, text, onClick }) => {

  return (
    <div
      className={`flex justify-between items-center gap-1 bg-white dark:bg-gray-600 hover:cursor-pointer hover:text-sky-600 hover:bg-sky-100 rounded-lg px-2 py-2`}
      onClick={onClick}
    >
      {Icon && <Icon className="h-5 w-5" />}
      <span>{text}</span>
    </div>
  );
};

export default HoverButton;
