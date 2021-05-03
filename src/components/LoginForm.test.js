import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

const setup = () => render (<LoginForm />);

xdescribe(`<LoginForm />`, () => {
    test('should contain login field', () => {
        setup();
        const loginInput = screen.getByLabelText(/login/i);
        expect(loginInput).toBeInTheDocument();
    });

    test('should contain password field', () => {
        setup();
        const passwordInput = screen.getByRole('textbox', { name: /pasword/i });
        expect(passwordInput).toBeInTheDocument();
    });

    test('displays alert that login is too short', async () => {
        setup();
        const loginInput = screen.getByLabelText(/login/i);
        userEvent.type(loginInput, 'xy');
        const alert = await screen.findByText(/must be longer than 3/i);
       expect(alert).toBeInTheDocument();
    });

    test('displays alert that password is too short', async () => {
        setup();
        const loginInput = screen.getByLabelText(/pasword/i);
        userEvent.type(loginInput, 'yz');

        const alert = await screen.findByText(/must be longer than 3/i);
        expect(alert).toBeInTheDocument();
    });

    test('hides alert from login when user types more than 3 characters', async () => {
        setup();
        const loginInput = screen.getByLabelText(/login/i);
        userEvent.type(loginInput, 'xy');
        const alert = await screen.findByText(/must be longer than 3/i);
        expect(alert).toBeInTheDocument();
        userEvent.type(loginInput, 'xy');
        expect(alert).not.toBeInTheDocument();
    });

    test('throws if user submits with error', async () => {
        expect.assertions(4);

        const authMock = jest.fn();
        authMock.mockReturnValue(false);

        render(<LoginForm tryAuth={authMock} />);
        const login = screen.getByLabelText(/login/i);
        userEvent.type(login, 'xs');          
        const submitButton = screen.getByRole('button', { name: /send/i });
        const alert = await screen.findByText(/must be longer than 3/i);

        expect(alert).toBeInTheDocument();
        expect(() => {
            userEvent.click(submitButton);
        }).toThrow();

        
        expect(authMock).toBeCalledWith('xs', '');
        expect(authMock).toHaveBeenCalledTimes(1);
    });
    test('does not throw if form data is correct', async () => {
        const okLogin = 'Martin';
        const okPassword = 'xac)ASd__@';

        const authMock = jest.fn();
        authMock.mockReturnValue(true);

        render(<LoginForm tryAuth={authMock} />);
        const login = screen.getByLabelText(/login/i);
        const password = screen.getByLabelText(/pasword/i);
        const submitButton = screen.getByRole('button', { name: /send/i });
        
        userEvent.type(login, okLogin);
        userEvent.type(password, okPassword);

        const alert = await screen.queryByText(/must be longer than 3/i);
        
        expect.assertions(2);
        expect(() => {
            userEvent.click(submitButton);
        }).not.toThrow();
        expect(alert).not.toBeInTheDocument();
    });
});