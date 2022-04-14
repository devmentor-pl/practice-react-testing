import React, {Component} from 'react';

class CatchError extends Component {
	state = { hasError: false, message: null }

	static getDerivedStateFromError(error) {
		return { hasError: true, message: error.message };
	}


	render() {
		if(this.state.hasError) {
			return <h1>{this.state.message || 'Something went wrong!'}</h1>
		}
		return this.props.children;
	}
}

export default CatchError;