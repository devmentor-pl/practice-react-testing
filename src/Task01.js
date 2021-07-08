import React from "react";
import CatchError from "./components/CatchError";
import LoginForm from "./components/LoginForm";

const Task01 = () => {
  function tryAuth(login, password) {
    return login.length + password.length > 6;
  }

  return (
    <CatchError>
      <section>
        <h1>Task01</h1>
        <LoginForm tryAuth={tryAuth} />
      </section>
    </CatchError>
  );
};

export default Task01;
