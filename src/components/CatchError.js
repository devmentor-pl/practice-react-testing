
import React from 'react';

class CatchError extends React.Component {
state = { hasError: false }
static getDerivedStateFromError() {
        return { hasError: true };
        }
        componentDidCatch(error) {
            // this.setState({
            //     error: error,
            //   })
        }



 render() {
    if(this.state.hasError) {
      return <h1>Something went wrong</h1>
    }
      return this.props.children;
    }
}
export default CatchError;