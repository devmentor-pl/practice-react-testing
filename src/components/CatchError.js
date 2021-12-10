import React from "react";

class CatchError extends React.Component {
    state = { hasError: false };
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            console.log("error!");
            return <h1>Show me this error!</h1>;
        }
        return this.props.children;
    }
}
export default CatchError;
