import React from "react";

class CatchError extends React.Component {
    state = {hasError: false, error: null}
    static getDerivedStateFromError(err){
        return {
            hasError: true,
            error: err.message
        }
    }
   
    render () {
        if(this.state.hasError) {
            return <h1>{this.state.error}</h1>
        }
        return this.props.children
    }
}
export default CatchError