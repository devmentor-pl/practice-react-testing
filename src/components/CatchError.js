import React, { Component } from 'react';

class CatchError extends Component {
    state = { hasError: false };

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <h1>Invalida form data</h1>;
        }

        return this.props.children;
    }
}

export default CatchError;
