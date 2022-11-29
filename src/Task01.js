import React from 'react';
import LoginForm from './components/LoginForm';

import Catcher from './components/Cacher';

const Task01 = () => {
    function tryAuth(login, password) {
        return login.length + password.length > 6;
    }

    return (
        <section>
            <h1>Task01</h1>
            <Catcher>
                <LoginForm tryAuth={tryAuth} />
            </Catcher>

        </section>
    );
};

export default Task01;