import React from 'react';
import { screen, render } from '@testing-library/react';
import Auth from './Auth';
import userEvent from '@testing-library/user-event';

describe('<Auth/>', () => {
	test('component should display the login fields', () => {
		render(<Auth />);

		const loginField = screen.getByRole('textbox', { name: /login/i });
		const passwordField = screen.getByRole('textbox', { name: /password/i });
		const submitBtn = screen.getByRole('button', { name: /send/i });

		expect(loginField).toBeInTheDocument();
		expect(passwordField).toBeInTheDocument();
		expect(submitBtn).toBeInTheDocument();
	});

	test('should display a message after successful login', async () => {
		const spy = jest.spyOn(window, 'fetch');

		window.fetch.mockResolvedValue({
			ok: true,
			json: async () => {
				return { Digest: '8ae75b43f70f20ba564200ef4ab63a33' };
			},
		});

		render(<Auth />);

		const loginField = screen.getByRole('textbox', { name: /login/i });
		const passwordField = screen.getByRole('textbox', { name: /password/i });
		const submitBtn = screen.getByRole('button', { name: /send/i });

		userEvent.type(loginField, 'jan@domena.pl');
		userEvent.type(passwordField, 'janeczek');
		userEvent.click(submitBtn);

		const message = await screen.findByText(
			'Jesteś zalogowany jako: jan@domena.pl'
		);
		expect(message).toBeInTheDocument();
		expect(window.fetch).toHaveBeenCalledTimes(1);
		spy.mockClear();
	});

	test('should not display a message in case of incorrect login', async () => {
		const spy = jest.spyOn(window, 'fetch');

		window.fetch.mockResolvedValue({
			ok: true,
			json: async () => {
				return { Digest: '97555cfdad135f42e459cd30a8e34137' };
			},
		});

		render(<Auth />);

		const loginField = screen.getByRole('textbox', { name: /login/i });
		const passwordField = screen.getByRole('textbox', { name: /password/i });
		const submitBtn = screen.getByRole('button', { name: /send/i });

		userEvent.type(loginField, 'jan@domena.pl');
		userEvent.type(passwordField, 'błędnehasło');
		userEvent.click(submitBtn);

		const message = screen.queryByText('Jesteś zalogowany jako: jan@domena.pl');
		expect(message).not.toBeInTheDocument();

		spy.mockClear();
	});
});
