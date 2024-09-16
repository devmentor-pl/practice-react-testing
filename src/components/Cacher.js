import React from "react";

class Catcher extends React.Component {
    state = { hasError: false }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    render() {
        const { hasError } = this.state;
        if (hasError) {
            return <h1>Jest błąd!</h1>
        }

        return this.props.children;
    }
}

export default Catcher;