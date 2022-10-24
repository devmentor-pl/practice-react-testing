import React from 'react';
import LoginForm from './components/LoginForm';

class Task01 extends React.Component {
    tryAuth(login, password) {
        return login.length + password.length > 6;
    }
    state = {
        hasError: false,
    }

    static getDerivedStateFromError(error) {
        console.log('getDerivedStateFromError')
        return { hasError: true, message: error.message }
    }

    render() {
        return (
            <section>
                <h1>Task01</h1>
                {
                    this.state.hasError ?
                    <h2>Error: {this.state.message}</h2> :
                    <LoginForm tryAuth={this.tryAuth} />
                }
            </section>
        );
    }
};

export default Task01;