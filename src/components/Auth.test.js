import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as md5Provider from '../providers/md5Provider';
import Auth from './Auth';

describe('Auth', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	test('calls getMd5 with password from form', () => {
		const spyGetMd5 = jest.spyOn(md5Provider, 'getMd5').mockResolvedValue('hash');

		render(<Auth />);

		userEvent.type(
			screen.getByRole('textbox', {
				name: /login/i,
			}),
			'jan@domena.pl',
		);

		userEvent.type(
			screen.getByRole('textbox', {
				name: /password/i,
			}),
			'janeczek',
		);

		userEvent.click(screen.getByRole('button', { name: /send/i }));

		expect(spyGetMd5).toHaveBeenCalledTimes(1);
		expect(spyGetMd5).toHaveBeenCalledWith('janeczek');
	});

	test('renders logged user message after successful login', async () => {
		jest.spyOn(md5Provider, 'getMd5').mockResolvedValue('8ae75b43f70f20ba564200ef4ab63a33');

		render(<Auth />);

		userEvent.type(
			screen.getByRole('textbox', {
				name: /login/i,
			}),
			'jan@domena.pl',
		);

		userEvent.type(
			screen.getByRole('textbox', {
				name: /password/i,
			}),
			'janeczek',
		);

		userEvent.click(screen.getByRole('button', { name: /send/i }));

		expect(await screen.findByText(/jesteś zalogowany jako: jan@domena.pl/i)).toBeInTheDocument();
	});

	test('does not authenticate user when credentials are incorrect', () => {
		jest.spyOn(md5Provider, 'getMd5').mockResolvedValue('wrongHash');

		render(<Auth />);

		userEvent.type(
			screen.getByRole('textbox', {
				name: /login/i,
			}),
			'jan@domena.pl',
		);

		userEvent.type(
			screen.getByRole('textbox', {
				name: /password/i,
			}),
			'abcd',
		);

		userEvent.click(screen.getByRole('button', { name: /send/i }));

		expect(screen.queryByText(/jesteś zalogowany jako/i)).not.toBeInTheDocument();
	});
});
