import React, {Component} from 'react';

class CatchErr extends Component {
	state = { hasError: false, message: null }

	static getDerivedStateFromError(error) {
		return { hasError: true, message: error.message };
	}

	render() {
		if(this.state.hasError) {
			return <h1>{this.state.message}</h1>
		}
		return this.props.children;
	}
}

export default CatchErr;