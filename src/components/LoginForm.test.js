import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

describe('<LoginForm>', () => {
  it('check if login input exists', () => {
    render(<LoginForm />);
    const loginInput = screen.getByLabelText(/login:/i);
    expect(loginInput).toBeInTheDocument();
  });

  it('check if password input exists', () => {
    render(<LoginForm />);
    const passwordInput = screen.getByLabelText(/password:/i);
    expect(passwordInput).toBeInTheDocument();
  });

  it('check if login input is too short', async () => {
    render(<LoginForm />);
    const loginInput = screen.getByLabelText(/login:/i);
    userEvent.type(loginInput, 'ra');

    const errorMessage = await screen.findByText(/The field is too short!/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('check if password input is too short', async () => {
    render(<LoginForm />);
    const passwordInput = screen.getByLabelText(/login:/i);
    userEvent.type(passwordInput, 'ra');

    const errorMessage = await screen.findByText(/The field is too short!/i);
    expect(errorMessage).toBeInTheDocument();
  });

  //Mateusz, nie mam pomysłu jak tutaj zastosować tego mocka :/ Będę wdzięczny za jakąś wskazówkę.
});
