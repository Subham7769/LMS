import React from 'react'
import { TrashIcon } from '@heroicons/react/20/solid';
import ElementErrorBoundary from '../../ErrorBoundary/ElementErrorBoundary';

const Button = ({ buttonIcon: ButtonIcon, buttonName, onClick, rectangle = false, circle = false, className, disabled=false }) => {
  const rectangleClass = 'rounded-md inline-flex items-center px-2.5 py-1.5 gap-x-1.5';
  const circleClass = 'rounded-full h-9 w-9 p-2 px-2.5';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        ${rectangle ? rectangleClass : ''}
        ${circle ? circleClass : ''}
        shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600 bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 text-white 
        ${ButtonIcon === TrashIcon ? 'bg-red-600 hover:bg-red-500 focus-visible:outline-red-600':""}
        ${className}
      `}
      disabled={disabled}
    >
      {ButtonIcon && <ButtonIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />}
      {ButtonIcon ? <span>{buttonName}</span>:<span className='text-center w-full'>{buttonName}</span>}
    </button>
  );
}

// Now wrap the entire component with ElementErrorBoundary where it's being used
const WithErrorBoundary = (props) => {
  return (
    <ElementErrorBoundary>
      <Button {...props} />
    </ElementErrorBoundary>
  );
};

export default WithErrorBoundary;
