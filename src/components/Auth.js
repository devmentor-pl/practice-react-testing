import React, { useState } from 'react';
import users from './../db/users';
import { getMd5 } from './../providers/md5Provider';
import LoginForm from './LoginForm';

const Auth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  async function findUser(login, password) {
    try {
      const md5 = await getMd5(password);
      console.log(md5, login);
      const userFromDB = users.find(
        (u) => u.login === login && u.password === md5
      );
      if (userFromDB) {
        setUser(userFromDB);
        return userFromDB;
      }
    } catch (e) {
      setError('Service unavailable');
      console.error(e);
    }
    return null;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  if (user) {
    return <h1>Jesteś zalogowany jako: {user.login}</h1>;
  }

  return <LoginForm tryAuth={findUser} />;
};

export default Auth;
