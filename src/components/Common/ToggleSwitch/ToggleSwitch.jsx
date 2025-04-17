import React from "react";

const ToggleSwitch = ({
  label,
  description,
  inputName,
  inputChecked,
  onChange,
  disabled,
}) => {
  return (
    <li className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700/60">
      {/* Left */}
      <div>
        <div className="text-gray-800 dark:text-gray-100 font-semibold">
          {label}
        </div>
        {description && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {description}
          </div>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center ml-4">
        <div className="text-sm text-gray-400 dark:text-gray-500 italic mr-2">
          {inputChecked ? "On" : "Off"}
        </div>
        <div className="form-switch relative inline-block w-11 mr-2 align-middle select-none transition duration-200 ease-in">
          <input
            type="checkbox"
            name={inputName}
            id={inputName}
            className="sr-only"
            checked={inputChecked}
            onChange={onChange}
            disabled={disabled}
          />
          <label
            htmlFor={inputName}
            className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
          >
            <span
              className={`dot absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition ${
                inputChecked ? "transform translate-x-5" : ""
              }`}
            ></span>
          </label>
        </div>
      </div>
    </li>
  );
};

export default ToggleSwitch;
