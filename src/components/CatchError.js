import React from "react";

class CatchError extends React.Component {
  state = { hasError: false, message: '' };

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error.message };
  }

  render() {
    if (this.state.hasError) {
      return <p>{this.state.message}</p>;
    }
    return this.props.children;
  }
}

export default CatchError;