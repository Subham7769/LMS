import React from "react";

const ContainerTile = ({
  children,
  className,
  defaultClass = true,
  loading,
  error,
}) => {
  return (
    <div
      className={`${
        defaultClass
          ? "bg-white dark:bg-gray-800 shadow-xs rounded-xl mb-8"
          : ""
      }  ${!loading && !error ? className : ""}`}
    >
      {loading ? (
        <div className="flex flex-col gap-3 animate-pulse px-3 py-6">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-4">
          <p>Oops! Something went wrong. Please try again later.</p>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default ContainerTile;
