import React from 'react'

const Button = ({ buttonIcon: ButtonIcon, buttonName, onClick, rectangle = false, circle = false, className }) => {
  const rectangleClass = 'rounded-md inline-flex items-center px-2.5 py-1.5 gap-x-1.5';
  const circleClass = 'rounded-full h-9 w-9 p-2 px-2.5';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        ${className}
        ${rectangle ? rectangleClass : ''}
        ${circle ? circleClass : ''}
        shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-white bg-indigo-600
      `}
    >
      {ButtonIcon && <ButtonIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />}
      {buttonName}
    </button>
  );
}

export default Button;
