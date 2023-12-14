import React from 'react';
import { render, fireEvent, waitFor,screen } from '@testing-library/react';
import LoginForm from './LoginForm';

  it('should renders form inputs and submit button', () => {
    render(<LoginForm />);
    const loginInput = screen.getByLabelText(/login/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByText(/send/i);

    expect(loginInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('should throw error when input value is too short', () => {
    render(<LoginForm />);
    const loginInput = screen.getByLabelText(/login/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(loginInput, { target: { value: 'abc' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });

    expect(loginInput.value).toBe('abc');
    expect(screen.getByText('The field is too short!')).toBeInTheDocument();
    expect(passwordInput.value).toBe('123');
    expect(screen.getByText('The field is too short!')).toBeInTheDocument();
  });

  it('should throw error when form submission with tryAuth returning a promise', async () => {
    const tryAuth = jest.fn(() => Promise.resolve());
    render(<LoginForm tryAuth={tryAuth} />);
    const loginInput = screen.getByLabelText(/login/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByText(/send/i);

    fireEvent.change(loginInput, { target: { value: 'validUser' } });
    fireEvent.change(passwordInput, { target: { value: 'validPassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(tryAuth).toHaveBeenCalledWith('validUser', 'validPassword');
    });
  });

  it('should handles form submission with tryAuth returning an error', async () => {
    const tryAuth = jest.fn(() => Promise.reject());
    render(<LoginForm tryAuth={tryAuth} />);
    const loginInput = screen.getByLabelText(/login/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByText(/send/i);

    fireEvent.change(loginInput, { target: { value: 'validUser' } });
    fireEvent.change(passwordInput, { target: { value: 'validPassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(tryAuth).toHaveBeenCalledWith('validUser', 'validPassword');
      });
      
    await waitFor(() => {
        expect(screen.getByText('Incorrect data!')).toBeInTheDocument();
      });
  });

  it('throws an error for a short password', () => {
    render(<LoginForm />);
    const passwordInput = screen.getByLabelText(/password/i);

    expect(() => {
      fireEvent.change(passwordInput, { target: { value: '123' } });
    }).toThrowError('The field is too short');
  });
