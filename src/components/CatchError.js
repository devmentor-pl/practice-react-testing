import React from "react";

export class CatchError extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return <h1>Error in script</h1>;
    }

    return this.props.children;
  }
}
