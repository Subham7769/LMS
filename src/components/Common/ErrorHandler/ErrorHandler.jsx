import React from 'react';
import SectionErrorBoundary from './SectionErrorBoundary';

const ErrorHandler = (WrappedComponent) => {
  return function ErrorHandler(props) {
    return (
      <SectionErrorBoundary>
        <WrappedComponent {...props} />
      </SectionErrorBoundary>
    );
  };
};

export default ErrorHandler;
