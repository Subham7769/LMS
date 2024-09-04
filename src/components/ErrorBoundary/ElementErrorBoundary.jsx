import React from 'react';

class ElementErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Element level error: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong with this element.</div>;
    }
    return this.props.children;
  }
}

export default ElementErrorBoundary;
