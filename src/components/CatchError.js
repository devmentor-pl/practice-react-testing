import React from "react";

class CatchError extends React.Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <div>{this.props.children}</div>
          <h1>Invalid form</h1>
        </div>
      )
    }

    return this.props.children
  }
}

export default CatchError