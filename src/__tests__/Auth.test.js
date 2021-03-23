import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// import LoginForm from '../components/LoginForm';
import Auth from '../components/Auth';

jest.spyOn(window, 'fetch');

it('displays user login when login data correct', async () => {
	render(<Auth />);

	const loginInput = screen.getByLabelText('login:');
	const passwordInput = screen.getByLabelText('pasword:');
	const submitBtn = screen.getByRole('button', { name: /send/i });

	const login = 'marcin@domena.pl';
	const passwordTypedIn = 'marcinek';
	const passwordFromMd5 = 'c5450079ce3aa5440cdea45c4be193bb';

	userEvent.type(loginInput, login);
	userEvent.type(passwordInput, passwordTypedIn);

	window.fetch.mockResolvedValueOnce({
		ok: true,
		json: async () => {
			return { Digest: passwordFromMd5 };
		},
	});

	act(() => userEvent.click(submitBtn));

	const text = await screen.findByText(`Jesteś zalogowany jako: ${login}`);

	expect(text).toBeInTheDocument();
});

it('does nothing when login data correct', async () => {
	render(<Auth />);

	const loginInput = screen.getByLabelText('login:');
	const passwordInput = screen.getByLabelText('pasword:');
	const submitBtn = screen.getByRole('button', { name: /send/i });

	const login = 'marcin@domena.pl';
	const passwordTypedIn = 'xxx';

	userEvent.type(loginInput, login);
	userEvent.type(passwordInput, passwordTypedIn);

	act(() => userEvent.click(submitBtn));

	const text = screen.queryByText(`Jesteś zalogowany jako: ${login}`);

	expect(text).not.toBeInTheDocument();
});
