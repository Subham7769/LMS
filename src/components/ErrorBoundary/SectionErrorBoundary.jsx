import { FaceFrownIcon } from '@heroicons/react/24/outline';
import React from 'react';

class SectionErrorBoundary extends React.Component {
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
    console.error("Error caught in SectionErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary text-wrap w-full text-center bg-white rounded-xl flex flex-col justify-center align-middle py-8">
          <FaceFrownIcon className='w-8 h-8 mx-auto text-red-500' />
          <p className="text-red-500">{this.state.error.message}</p>
          {/* You can also render this.error.stack or any additional details */}
        </div>
      );
    }

    return this.props.children;
  }
}

export default SectionErrorBoundary;
