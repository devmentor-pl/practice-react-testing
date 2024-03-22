import React from 'react';
import LoginForm from './components/LoginForm';
import ErrorBoundary from './components/ErrorBoundary';

const Task01 = () => {
    function tryAuth(login, password) {
        return login.length + password.length > 6;
    }

    return (
        <section>
            <h1>Task01</h1>
            <ErrorBoundary>
                <LoginForm tryAuth={tryAuth} />
            </ErrorBoundary>
        </section>
    );
};

export default Task01;