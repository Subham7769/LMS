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
      disabled={disabled || loading}
    >
      {/* Loader Overlay */}
      {loading ? (
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin fill-current shrink-0"
            width="16"
            height="16"
            viewBox="0 0 16 16"
          >
            <path d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
          </svg>
          <span className="ml-2">Loading</span>
        </div>
      ) : (
        <div
          className={`flex items-center justify-center ${
            loading ? "opacity-50" : "opacity-100"
          }`}
        >
          {ButtonIcon && (
            <ButtonIcon className={iconClassName} aria-hidden="true" />
          )}
          {buttonName && ButtonIcon ? (
            <span className="ml-2">{buttonName}</span>
          ) : (
            <span>{buttonName}</span>
          )}
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
