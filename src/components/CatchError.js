import React, { Component } from "react";

class CatchError extends Component {
  state = { hasError: false, errorMsg: '' };

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMsg: error.message };
  }

  render() {
    if (this.state.hasError) {
      return <h1>{ this.state.errorMsg }</h1>;
    }

    return this.props.children;
  }
}

export default CatchError;