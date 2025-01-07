import React, { useState } from "react";
import { FiUpload, FiFile, FiX,FiDownload  } from "react-icons/fi";

const InputFile = ({
  labelName,
  inputName,
  onChange,
  accept = "*",
  placeholder = "Click or drag to upload",
}) => {
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
    if (onChange) {
      onChange(event);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      if (onChange) {
        onChange({ target: { files: [file] } });
      }
    }
  };

  const handleClearFile = () => {
    setFileName(""); // Clear local file name
    if (onChange) {
      // Dispatch an update to set the Redux state field to null
      onChange({ target: { name: inputName, value: null, type: "file" } });
    }
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-3 text-center transition-all ${
        isDragging
          ? "bg-indigo-50 border-indigo-500"
          : fileName
          ? "bg-indigo-50 border-indigo-500"
          : "bg-gray-100 hover:border-indigo-500 hover:bg-indigo-50"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <span className="absolute -top-5 left-0 text-sm text-gary-500">
        {labelName}
      </span>

      {!fileName && !isDragging && (
        <>
          <FiUpload className="mx-auto text-gray-400 mb-2" size={20} />
          <span className="text-sm text-gray-500">{placeholder}</span>
        </>
      )}

      {isDragging && (
        <>
          <FiDownload className="mx-auto text-indigo-700 mb-2" size={20} />
          <span className="text-sm text-indigo-700">
            Drop your file here...
          </span>
        </>
      )}
      {fileName && (
        <span className="block text-indigo-700 px-1 text-sm font-semibold">
          <FiFile className="mx-auto text-indigo-700 mb-2" size={20} />
          {fileName}
        </span>
      )}

      {fileName && (
        <FiX
          className="mx-auto text-white p-1 font-semibold absolute -top-4 -right-4 bg-red-500 rounded-lg cursor-pointer"
          size={28}
          onClick={handleClearFile}
        />
      )}
      <input
        type="file"
        name={inputName}
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        accept={accept}
      />
    </div>
  );
};

export default InputFile;
