import React from 'react';

const HoverButton = ({ icon: Icon, text, color = 'gray', onClick }) => {
  // Generate hover color and background color based on the provided color
  const hoverColor = `hover:text-${color}-800`;
  const backgroundColor = `hover:bg-${color}-100`;

  return (
    <div
      className={`flex justify-between items-center gap-1 hover:cursor-pointer ${hoverColor} ${backgroundColor} rounded-lg px-2 py-1`}
      onClick={onClick}
    >
      {Icon && <Icon className="h-5 w-5" />}
      <span className={`text-sm text-${color}-800 mt-1`}>{text}</span>
    </div>
  );
};

export default HoverButton;
