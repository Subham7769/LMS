import React from "react";
import { TrashIcon } from "@heroicons/react/20/solid";
import ElementErrorBoundary from "../../ErrorBoundary/ElementErrorBoundary";

const Button = ({
  buttonIcon: ButtonIcon,
  buttonName,
  onClick,
  rectangle = false,
  circle = false,
  className,
  disabled = false,
  buttonType = "primary", // Default to "primary",
  loading = false,
}) => {
  const rectangleClass =
    "rounded-md inline-flex items-center px-2.5 py-1.5 gap-x-1.5";
  const circleClass = "rounded-full h-9 w-9 p-2 px-2.5";
  const buttonTypeClass = {
    primary:
      "bg-green-500 hover:bg-green-600 focus-visible:outline-green-500 text-white shadow-sm",
    secondary:
      "bg-gray-500 hover:bg-gray-600 focus-visible:outline-gray-500 text-white shadow-sm",
    tertiary: "bg-white shadow-md hover:shadow text-blue-600 border",
    destructive:
      "bg-red-500 hover:bg-red-600 focus-visible:outline-red-500 text-white",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        ${rectangle ? rectangleClass : ""}
        ${circle ? circleClass : ""}
        disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:bg-background-light-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
        ${buttonTypeClass[buttonType] || buttonTypeClass.primary}
        ${className} 
        relative flex items-center justify-center
      `}
      disabled={disabled || loading} // Disable button when loading
    >
      <div className={`flex items-center justify-center ${loading ? "opacity-50" : "opacity-100"}`}>
        {ButtonIcon && <ButtonIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />}
        {ButtonIcon ? (
          <span>{buttonName}</span>
        ) : (
          <span className="text-center w-full">{buttonName}</span>
        )}
      </div>
  
      {/* Loader Overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
            ></path>
          </svg>
        </div>
      )}
    </button>
  );
  
};

// Now wrap the entire component with ElementErrorBoundary where it's being used
const WithErrorBoundary = (props) => {
  return (
    <ElementErrorBoundary>
      <Button {...props} />
    </ElementErrorBoundary>
  );
};

export default WithErrorBoundary;
