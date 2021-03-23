import React from 'react';

class CatchError extends React.Component {
	state = { hasError: false, errorMsg: '' };

	static getDerivedStateFromError(error) {
		console.log('I got an error, yay!');
		return { hasError: true, errorMsg: error.message };
	}

	render() {
		if (this.state.hasError) {
			console.log('Wanna show an error in h1');
			return <h1>Hello {this.state.errorMsg}</h1>;
		}

		return this.props.children;
	}
}

export default CatchError;
