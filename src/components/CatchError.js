import React, { Component } from 'react';

class CatchError extends Component {
	state = { err: false };

	static getDerivedStateFromError(err) {
		return { err: true };
	}

	render() {
		if (this.state.err) {
			console.log('error present');
			return <div> Login or password is too short! </div>;
		}
		return this.props.children;
	}
}

export default CatchError;