import React, { Component } from 'react';

class CatchError extends Component {
    state = {
        hasError: false
    }
    static getDerivedStateFromError(error) {
        console.log(error)
        return { hasError: true, message: error.message }
    }

    componentDidCatch(error, info) {
        console.log('componentDidCatch')
        console.log(error)
        console.log(info)
    }

    render() {
        if (this.state.hasError) {
            return <h2>Somethin wrong, error: {this.state.message}</h2>
        }
        return this.props.children;
    }
}

export default CatchError;