import React from 'react';

class PageErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Page level error: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong on this page.</div>;
    }
    return this.props.children;
  }
}

export default PageErrorBoundary;
