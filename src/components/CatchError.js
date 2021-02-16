import React, { Component } from "react";

class CatchError extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    console.log(error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("ERROR DID CATCH");
    console.log(error);
    console.log(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Oops</h1>;
    }

    return this.props.children;
  }
}

export default CatchError;
