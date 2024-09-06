import { FaceFrownIcon, WifiIcon, LinkSlashIcon, ShieldExclamationIcon, CodeBracketSquareIcon } from '@heroicons/react/24/outline';
import React from 'react';

class ElementErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to indicate that an error has occurred
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    console.error("Error caught in ElementErrorBoundary:", error, errorInfo);
  }

  renderErrorMessage() {
    const { error } = this.state;
    const classStyle = "error-boundary text-[14px] text-wrap w-full text-center bg-white rounded-xl flex justify-center align-middle"
    // Example: You can classify errors based on their type or content
    if (error.message.includes('Network')) {
      return (
        <div className={classStyle}>
          <WifiIcon className='w-4 h-4 mx-auto text-blue-500' />
          <p className="text-blue-500">Network error occurred. Please check your connection.</p>
        </div>
      );
    } else if (error.message.includes('API')) {
      return (
        <div className={classStyle}>
          <LinkSlashIcon className='w-4 h-4 mx-auto text-yellow-500' />
          <p className="text-yellow-500">API error occurred. Please try again later.</p>
        </div>
      );
    } else if (error.message.includes('Validation')) {
      return (
        <div className={classStyle}>
          <ShieldExclamationIcon className='w-4 h-4 mx-auto text-indigo-500' />
          <p className="text-indigo-500">Validation error occurred. Please check your input.</p>
        </div>
      );
    } else if (error.message.includes('Element type')) {
      return (
        <div className={classStyle}>
          <CodeBracketSquareIcon className='w-4 h-4 mx-auto text-green-500' />
          <p className="text-green-500">Element type is invalid. Please check your JSX.</p>
        </div>
      );
    } else {
      return (
        <div className={classStyle}>
          <FaceFrownIcon className='w-4 h-4 mx-auto text-red-500' />
          <p className="text-red-500">An unexpected error occurred: {this.state.error.message}</p>
        </div>
      );
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary text-[14px] text-wrap w-full text-center bg-white rounded-xl flex justify-center align-middle">
          {this.renderErrorMessage()}
          {/* You can also render additional details like this.state.error.stack */}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ElementErrorBoundary;

