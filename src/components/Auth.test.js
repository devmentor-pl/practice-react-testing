import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Auth from './Auth';

const setup = () => {
	render(<Auth />);

	const loginElement = screen.getByRole('textbox', { name: /login/i });
	const passwordElement = screen.getByRole('textbox', { name: /password/i });
	const buttonElement = screen.getByRole('button', { name: /send/i });

	return { loginElement, passwordElement, buttonElement };
};

xdescribe('<Auth />', () => {
	test('fields should exist', async () => {
		const { loginElement, passwordElement } = setup();

		expect(loginElement).toBeInTheDocument();
		expect(passwordElement).toBeInTheDocument();
	});
	test('login in should work', async () => {
		const { loginElement, passwordElement, buttonElement } = setup();

		const login = 'jan@domena.pl';
		const password = 'janeczek';
		const md5 = '8ae75b43f70f20ba564200ef4ab63a33';

		const spy = jest.spyOn(window, 'fetch');
		window.fetch.mockResolvedValue({
			ok: true,
			json: async () => {
				return { digest: md5 };
			},
		});
		userEvent.type(loginElement, login);
		userEvent.type(passwordElement, password);
		userEvent.click(buttonElement);

		// const info = await screen.findByText(`Jesteś zalogowany jako: ${login}`);

		// expect(info).toBeInTheDocument();
		expect(window.fetch).toHaveBeenCalled();
		expect(window.fetch).toHaveBeenCalledWith('https://api.hashify.net/hash/md5/hex', {
			body: password,
			method: 'POST',
		});
		spy.mockClear();
	});
	test('login in shouldnt work with wrong password', async () => {
		const { loginElement, passwordElement, buttonElement } = setup();

		const login = 'jan@domena.pl';
		const password = 'janeczek2222';
		const md5 = '8ae75b43f70f20ba564200ef4ab63a33';

		const spy = jest.spyOn(window, 'fetch');
		window.fetch.mockResolvedValue({
			ok: true,
			json: async () => {
				return { digest: md5 };
			},
		});
		userEvent.type(loginElement, login);
		userEvent.type(passwordElement, password);
		userEvent.click(buttonElement);

		waitFor(async () => {
			const info = await screen.findByText(`Jesteś zalogowany jako: ${login}`);
			expect(info).not.toBeInTheDocument();
		});

		spy.mockClear();
	});
});
