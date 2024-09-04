import React from 'react';

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
      return <div>Something went wrong in the application.</div>;
    }
    return this.props.children;
  }
}

export default AppErrorBoundary;
