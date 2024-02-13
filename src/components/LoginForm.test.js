import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginForm from './LoginForm';
import CatchError from './CatchError';
import userEvent from '@testing-library/user-event';

describe('LoginForm Component', () => {
  let tryAuthMock;

  beforeEach(() => {
    tryAuthMock = jest.fn();
  });

  test('Should have login field', async () => {
    render(
      <CatchError>
        <LoginForm tryAuth={tryAuthMock} />
      </CatchError>
    );

    const loginInput = screen.getByLabelText(/login/i);
    expect(loginInput).toBeInTheDocument();
    expect(loginInput).toHaveAttribute('name', 'login');
  });

  test('Should have password field', async () => {
    render(
      <CatchError>
        <LoginForm tryAuth={tryAuthMock} />
      </CatchError>
    );

    const passwordInput = screen.getByLabelText(/password:/i);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('name', 'password');
  });

  test('Shows error for short login input', async () => {
    render(
      <CatchError>
        <LoginForm tryAuth={tryAuthMock} />
      </CatchError>
    );

    const loginInput = screen.getByLabelText(/login/i);
    userEvent.type(loginInput, 'abc');
    userEvent.tab();

    const errorMessage = await screen.findByText('The field is too short!');
    expect(errorMessage).toBeInTheDocument();
  });

  test('Shows error for short password input', async () => {
    render(
      <CatchError>
        <LoginForm tryAuth={tryAuthMock} />
      </CatchError>
    );

    const passwordInput = screen.getByLabelText(/password:/i);
    userEvent.type(passwordInput, '123');
    userEvent.tab();

    const errorMessage = await screen.findByText('The field is too short!');
    expect(errorMessage).toBeInTheDocument();
  });

  test('Handles incorrect authorization data', async () => {
    tryAuthMock.mockRejectedValue(false);
    render(
      <CatchError>
        <LoginForm tryAuth={tryAuthMock} />
      </CatchError>
    );

    const submitBtn = await screen.findByRole('button', { name: /send/i });
    userEvent.click(submitBtn);

    const error = await screen.findByText('Incorrect data!');
    expect(error).toBeInTheDocument();
  });

  test('Handles correct authorization data', async () => {
    tryAuthMock.mockReturnValue(true);
    render(
      <CatchError>
        <LoginForm tryAuth={tryAuthMock} />
      </CatchError>
    );

    const submitBtn = await screen.findByRole('button', { name: /send/i });
    userEvent.click(submitBtn);

    const error = screen.queryByText('Incorrect data!');
    expect(error).toBeNull();
  });

  test('Calls tryAuth with login and password on submission', async () => {
    tryAuthMock.mockReturnValue(true);
    render(
      <CatchError>
        <LoginForm tryAuth={tryAuthMock} />
      </CatchError>
    );

    const loginInput = screen.getByLabelText(/login/i);
    const passwordInput = screen.getByLabelText(/password:/i);
    userEvent.type(loginInput, 'user');
    userEvent.type(passwordInput, 'pass');

    const submitBtn = await screen.findByRole('button', { name: /send/i });
    userEvent.click(submitBtn);

    expect(tryAuthMock).toHaveBeenCalledWith('user', 'pass');
  });
});
