import React from 'react';
import { useRouteError } from 'react-router-dom';
import { FaceFrownIcon } from "@heroicons/react/20/solid";
import ContainerTile from '../Common/ContainerTile/ContainerTile';

const RouteErrorBoundary = () => {
  const error = useRouteError();
  const roleName = localStorage.getItem("roleName");
  console.error(error);


  return (
    <>
      {
        roleName === "ROLE_SUPERADMIN" ? (
          <div className='h-[100vh] flex justify-center items-center'>
            <ContainerTile className={"flex justify-center items-center flex-col gap-3 text-center  min-h-[90vh] h-fit w-[90vw]"}>
              <h1 className='text-indigo-500 text-9xl'>Oops!</h1>
              <FaceFrownIcon className='h-48 w-48 shrink-0 text-indigo-500 ' />

              {/* Main details section for error information */}
              <details className="flex justify-center items-center w-[100%]">
                <summary className="cursor-pointer text-indigo-500">Details</summary>
                <div className="mt-2 text-left w-full">
                  {/* Error message */}
                  <p className='font-semibold'>Error Message:</p>
                  <p>{error.message}</p>

                  {/* Nested collapsible details for stack trace */}
                  {error.stack && (
                    <details className="mt-4">
                      <summary className="cursor-pointer text-indigo-500">Stack Trace</summary>
                      <pre className="text-sm text-gray-600 bg-gray-100 p-4 rounded mt-2 overflow-x-auto">
                        {error.stack}
                      </pre>
                    </details>
                  )}

                  {/* Additional error data */}
                  {error.data && (
                    <>
                      <p className='font-semibold mt-4'>Additional Details:</p>
                      <pre className="text-sm text-gray-600 bg-gray-100 p-4 rounded mt-2 overflow-x-auto">
                        {JSON.stringify(error.data, null, 2)}
                      </pre>
                    </>
                  )}
                </div>
              </details>

            </ContainerTile>
          </div>

        ) : (<div>Error</div>)
      }
    </>
  )

}


export default RouteErrorBoundary;
