import React from 'react'

class CatchError extends React.Component {
    state = { 
        hasError: false 
    }

    static getDerivedStateFromError() {       
        return { hasError: true };
    }

    render() {
        if(this.state.hasError) {
            return <h1>{ this.props.message }</h1>
        }
        else {
            return this.props.children;
        }

    }
}

export default CatchError;