import React, { Component } from "react";

class CatchError extends Component {
  state = { hasError: false, errorMessage: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message };
  }

  render() {
    if (this.state.hasError) {
      return <h1>{this.state.errorMessage || "Something went wrong"}</h1>;
    }

    return this.props.children;
  }
}

export default CatchError;
