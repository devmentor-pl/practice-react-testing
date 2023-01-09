import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../LoginForm';
import CatchError from '../CatchError';

describe('LoginForm component', () => {
    it('Component should contain password label', () => {
        render(<LoginForm />);
        const label = screen.getByLabelText('password:');
        expect(label).toBeInTheDocument();
    });
    it('Component should contain login label', () => {
        render(<LoginForm />);
        const label = screen.getByLabelText('login:');
        expect(label).toBeInTheDocument();
    });
    it('Component should contain button', () => {
        render(<LoginForm />);
        const btn = screen.getByRole('button', { name: 'send' });
        expect(btn).toBeInTheDocument();
    });
    it(`login input should throw error when validation doesn't match`, async () => {
        render(<LoginForm />);
        const label = screen.getByLabelText('login:');
        userEvent.type(label, 'Fd');
        const error = await screen.findByText('The field is too short!');
        expect(error).toBeInTheDocument();
    });
    it(`password input should throw error when validation doesn't match`, async () => {
        render(<LoginForm />);
        const label = screen.getByLabelText('password:');
        userEvent.type(label, 'Dd');
        const error = await screen.findByText('The field is too short!');
        expect(error).toBeInTheDocument();
    });
    it('throw error when the wrong data was sent', async () => {
        const mock = jest.fn();
        mock.mockReturnValue(false);

        render(<CatchError><LoginForm tryAuth={mock} ></LoginForm></CatchError>);

        const login = screen.getByLabelText('login:');

        const password = screen.getByLabelText('password:');
        const btn = screen.getByRole('button', { name: 'send' });

        userEvent.type(login, 'Xx');
        userEvent.type(password, 'Xx');

        userEvent.click(btn);

        const error = await screen.findByText('Incorrect data!');
        expect(error).toBeInTheDocument();
    });
});