import React from 'react';
import LoginForm from './components/LoginForm';
import CatchErr from './components/CatchErr';

const Task01 = () => {
    function tryAuth(login, password) {
        return login.length + password.length > 6;
    }

    return (
        <CatchErr>
            <h1>Task01</h1>
            <LoginForm tryAuth={ tryAuth }/>
        </CatchErr>
    );
};

export default Task01;