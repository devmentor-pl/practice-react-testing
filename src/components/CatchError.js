import React, { Component } from 'react'

export default class CatchError extends Component {

    state = { hasError: false };
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            message: error.message
        };
    }

  render() {
      if (this.state.hasError) {
          return <h1>{this.state.message}</h1>
      }
      return this.props.children;
  }
}
