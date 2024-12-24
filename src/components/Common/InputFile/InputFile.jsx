import React from "react";
import { FiUpload } from "react-icons/fi";

const InputFile = ({
  labelName,
  inputName,
  onChange,
  accept = "*",
  placeholder = "Click or drag to upload",
}) => {
  return (
    <div>
      <label className="block text-gray-700 px-1 text-sm font-semibold">
        {labelName}
      </label>
      <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-3 text-center bg-gray-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all">
        <FiUpload className="mx-auto text-gray-400 mb-2" size={20} />
        <span className="text-sm text-gray-500">{placeholder}</span>
        <input
          type="file"
          name={inputName}
          onChange={onChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          accept={accept}
        />
      </div>
    </div>
  );
};

export default InputFile;
