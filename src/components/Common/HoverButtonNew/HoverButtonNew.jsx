import React from 'react'

const HoverButtonNew = ({
    buttonIcon: ButtonIcon,
    buttonName,
    onClick,
    color,
  }) => {
    return (
      <div
        onClick={onClick}
        className={`p-3 flex flex-col justify-center items-center text-sm font-semibold rounded-lg hover:cursor-pointer 
        text-${color}-500 bg-${color}-50 hover:text-white hover:bg-${color}-500 transition-all duration-300 ease-in-out hover:scale-105`}
      >
        <div className="flex">
          <ButtonIcon className="h-5 w-5 mr-2" />
          {buttonName}
        </div>
      </div>
    );
  };

export default HoverButtonNew