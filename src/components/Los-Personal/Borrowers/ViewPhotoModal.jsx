import { XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useSelector } from "react-redux";

const ShimmerTable = () => {
  return (
    <div className="grid grid-cols-4 gap-4 animate-pulse">
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded"></div>
    </div>
  );
};

const ViewPhotoModal = ({ isOpen, onClose, photoData }) => {
  if (!isOpen) return null;

  const { loading } = useSelector((state) => state.personalBorrowers);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/30 backdrop-blur-sm">
        <div className="relative w-3/4 xl:w-1/3 p-5 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all duration-500 ease-in-out">
          <div className="flex flex-col gap-4 pb-8 pt-6 px-5 mt-3">
            <ShimmerTable />
            <ShimmerTable />
            <ShimmerTable />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/30 backdrop-blur-sm">
        <div className="relative w-3/4 xl:w-1/3 p-5 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all duration-500 ease-in-out max-h-[80vh]">
          {/* Close Button */}
          {/* Close Button */}
          <XMarkIcon
            onClick={onClose}
            className="absolute top-1 right-1 h-6 w-6 cursor-pointer"
          />

          {/* Profile Image */}
          <div className="flex justify-center items-center w-full h-full overflow-hidden mt-2">
            <img
              src={photoData}
              alt="Client Profile Not Uploaded Yet"
              className="rounded-lg max-w-full max-h-[60vh] w-auto h-auto"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewPhotoModal;
