import React from "react";
import ElementErrorBoundary from "../../ErrorBoundary/ElementErrorBoundary";

const Button = ({
  buttonIcon: ButtonIcon,
  buttonName,
  onClick,
  className,
  disabled = false,
  buttonType = "primary", // Default to "primary",
  iconClassName = "h-4 w-4",
  loading = false,
}) => {
  const buttonTypeClass = {
    primary:
      "btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white",
    secondary:
      "btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-gray-800 dark:text-gray-300",
    tertiary:
      "btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-violet-500",
    destructive:
      "btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-red-500",
    success:
      "btn bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 text-green-500",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        disabled:border-gray-200 dark:disabled:border-gray-700 disabled:bg-white dark:disabled:bg-gray-800 disabled:text-gray-300 dark:disabled:text-gray-600 disabled:cursor-not-allowed
        ${buttonTypeClass[buttonType] || buttonTypeClass.primary}
        ${className} 
        relative items-center justify-center inline-flex cursor-pointer
      `}
      disabled={disabled || loading} // Disable button when loading
    >
      <div
        className={`flex items-center justify-center ${
          loading ? "opacity-50" : "opacity-100"
        }`}
      >
        {ButtonIcon && <ButtonIcon className={iconClassName} aria-hidden="true" />}
        {buttonName && ButtonIcon ? (
          <span className="ml-2">{buttonName}</span>
        ) : (
          <span>{buttonName}</span>
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
