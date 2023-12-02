import React from 'react';

class CatchError extends React.Component {
	state = { hasError: false };

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	render() {
		const { errorMessage } = this.props;
		if (this.state.hasError) {
			return <h1>{errorMessage}</h1>;
		}

		return this.props.children;
	}
}

export default CatchError;
