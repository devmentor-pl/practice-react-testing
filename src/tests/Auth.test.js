import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Auth from '../components/Auth'

jest.spyOn(window, 'fetch');

const setup = () => {
    const auth = render(<Auth />);
    const loginInput = screen.getByText(/login/);
	const passwordInput = screen.getByText(/password/);
    const submitButton = screen.getByRole('button', { name: 'send' });
    return { ...auth, loginInput, passwordInput, submitButton };
};

describe('Auth login form test', () => {
    test('should render login field and password field', () => {
        const { loginInput, passwordInput } = setup();

        expect(loginInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
    })

    test('should log in user with correct credentials', async () => {
        const { loginInput, passwordInput, submitButton } = setup();

        const login = 'marcin@domena.pl';
        const password = 'marcinek';
        const encryptedPass = 'c5450079ce3aa5440cdea45c4be193bb';

        window.fetch.mockResolvedValueOnce({
			ok: true,
			json: async () => {
				return { Digest: encryptedPass };
			},
		});

        userEvent.type(loginInput, login);
        userEvent.type(passwordInput, password);
        userEvent.click(submitButton);

        const userLoggedIn = await screen.findByText(`Jesteś zalogowany jako: ${login}`);

        expect(userLoggedIn).toBeInTheDocument();
        })

        test('should NOT log user in with incorrect credentials', () => {
        const { loginInput, passwordInput, submitButton } = setup();

        const login = 'login';
		const password = 'password';

        window.fetch.mockResolvedValueOnce({
			ok: true,
			json: async () => {
				return { Digest: password };
			},
		});

        userEvent.type(loginInput, login);
		userEvent.type(passwordInput, password);
		userEvent.click(submitButton);

        const userLoggedIn = screen.queryByText(`Jesteś zalogowany jako: ${login}`)

        expect(userLoggedIn).not.toBeInTheDocument();

    })
});