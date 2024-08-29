import React from 'react'
import { useRouteError } from 'react-router-dom';

const ErrorBoundary = () => {
  let error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return (
    <div>
      <div>Dang!</div>
      <div>{error.message}</div>
    </div>
  );

}

export default ErrorBoundary;