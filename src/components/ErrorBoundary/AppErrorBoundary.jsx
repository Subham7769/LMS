import React from 'react';
import Button from '../Common/Button/Button';  // Assuming similar Button component is used
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";  // Example of a warning icon
import { ArrowPathIcon } from "@heroicons/react/20/solid";  // Icon for retry

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Application level error: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorUI />;
    }
    return this.props.children;
  }
}

const ErrorUI = () => {

  // Function to reload the page
  const handleRetry = () => {
    window.location.reload();  // Reload the page
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-[80%] h-[80%] p-8 rounded-xl shadow-lg text-center">
        {/* Warning Icon */}
        <ExclamationTriangleIcon className="h-24 w-24 text-yellow-500 mx-auto" />

        {/* Error Message */}
        <h1 className="text-4xl font-bold text-gray-900 mt-4">Oops! Something Went Wrong</h1>

        {/* Description */}
        <p className="text-gray-600 my-4">
          An unexpected error occurred in the application. Please try reloading the page or contact the developers for assistance.
        </p>

        {/* Action Button to Retry (Reload Page) */}
        <Button
          buttonIcon={ArrowPathIcon}
          buttonName={"Retry"}
          onClick={handleRetry}
          rectangle={true}
        />

        {/* Contact Developer Link */}
        <div className="mt-4">
          <a href="mailto:developer@example.com" className="text-gray-500 hover:text-gray-900 transition">
            Please contact the developers team.
          </a>
        </div>
      </div>
    </div>
  );
};

export default AppErrorBoundary;
