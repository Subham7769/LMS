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
          ? "shadow-md bg-white border border-gray-tertiary rounded-xl pb-8 pt-6 px-5"
          : ""
      }  ${!loading && !error ? className : ""}`}
    >
      {loading ? (
        <div className="flex flex-col gap-3 animate-pulse">
          <div className="h-4 bg-background-light-primary rounded w-full"></div>
          <div className="h-4 bg-background-light-primary rounded w-3/4"></div>
          <div className="h-4 bg-background-light-primary rounded w-1/2"></div>
          <div className="h-4 bg-background-light-primary rounded w-1/3"></div>
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
