import { isEmpty } from "lodash";
import React from "react";
import { FaImage, FaFileAlt, FaUser, FaFont, FaFileWord, FaPlusCircle, FaFilePdf, FaCamera } from "react-icons/fa";

const uploadOptions = [
  { label: "Image", icon: <FaImage />, accept: "image/jpeg,image/png" },
  { label: "PDF", icon: <FaFilePdf />, accept: "application/pdf" },
  { label: "Camera", icon: <FaCamera />, accept: "image/*", capture: "environment" },
  // { label: "SVG", icon: <FaFileAlt />, accept: ".svg" },
  // { label: "Initial", icon: <FaUser />, accept: ".txt" },
  // { label: "Font Icon", icon: <FaFont />, accept: ".woff,.ttf" },
  // { label: "Word", icon: <FaFileWord />, accept: ".doc,.docx" },
  // { label: "Custom", icon: <FaPlusCircle />, accept: "*" },
];

const UploadOptions = ({ showUploader, setShowUploader }) => {
  const handleFileChange = (e, label) => {
    const files = e.target.files;
    if (!isEmpty(files)) {
      Array.from(files).map((f) => console.log(`File selected:`, f.name));
      setShowUploader(false); // Close the uploader after selection
    }
  };

  return (
    <div
      className={`absolute bottom-20 left-4 z-50 grid grid-cols-3 gap-2 md:gap-4 md:p-4 p-2 max-w-md bg-white dark:bg-gray-600 md:rounded-2xl rounded-md shadow-xl 
  transform transition-all duration-1000 ${showUploader
          ? 'opacity-100 scale-100 translate-y-0 ease-out'
          : 'opacity-0 scale-90 translate-y-4 ease-in pointer-events-none'}
`}
      onClick={(e) => e.stopPropagation()}
    >
      {uploadOptions.map(({ label, icon, accept, capture }) => (
        <label
          key={label}
          className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg md:p-4 p-2 px-1 cursor-pointer transition hover:shadow-xl hover:shadow-indigo-100 border-2 hover:border-2 hover:border-indigo-500 hover:scale-105 "
        >
          <div className="md:text-3xl text-md text-indigo-500 mb-2">{icon}</div>
          <div className="md:text-sm md:font-medium text-xs text-gray-700">{label}</div>
          <input
            type="file"
            accept={accept}
            capture={capture}
            className="hidden"
            multiple // Allow multiple file selection
            onChange={(e) => handleFileChange(e, label)}
          />
        </label>
      ))}
    </div>
  );
};

export default UploadOptions;
