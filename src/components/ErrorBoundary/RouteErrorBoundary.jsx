import React from "react";
import { useRouteError } from "react-router-dom";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import ContainerTile from "../Common/ContainerTile/ContainerTile";

const RouteErrorBoundary = () => {
  const error = useRouteError();
  const roleName = localStorage.getItem("roleName");
  console.error(error);

  return (
    <>
      <div
        className={
          "flex justify-center items-center flex-col gap-3 bg-background-light-secondary min-h-[70vh] p-8 h-fit w-[100%]"
        }
      >
        <div className="bg-white w-[90%] h-[80%] p-8 rounded-xl shadow-lg text-center">
          <FaceFrownIcon className="w-24 h-24 mx-auto text-indigo-500" />
          {/* Oops! Text */}
          <h1 className="text-4xl font-bold text-gray-900 mt-4">Oops!</h1>
          <p className="text-gray-600 my-4">Some Error Occurred</p>
          {/* Main details section for error information */}
          {roleName === "ROLE_SUPERADMIN" && (
            <details className="flex justify-center items-center w-[100%]">
              <summary className="cursor-pointer text-indigo-500">
                Details
              </summary>
              <div className="mt-2 text-left w-full">
                {/* Error message */}
                <p className="font-semibold">Error Message:</p>
                <p>{error.message}</p>

                {/* Nested collapsible details for stack trace */}
                {error.stack && (
                  <details className="mt-4">
                    <summary className="cursor-pointer text-indigo-500">
                      Stack Trace
                    </summary>
                    <pre className="text-sm text-gray-600 bg-background-light-secondary p-4 rounded mt-2 overflow-x-auto">
                      {error.stack}
                    </pre>
                  </details>
                )}

                {/* Additional error data */}
                {error.data && (
                  <>
                    <p className="font-semibold mt-4">Additional Details:</p>
                    <pre className="text-sm text-gray-600 bg-background-light-secondary p-4 rounded mt-2 overflow-x-auto">
                      {JSON.stringify(error.data, null, 2)}
                    </pre>
                  </>
                )}
              </div>
            </details>
          )}
        </div>
      </div>
    </>
  );
};

export default RouteErrorBoundary;
