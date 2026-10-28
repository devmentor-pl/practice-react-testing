import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LoginForm from './LoginForm';
import CatchError from './CatchError';

describe('LoginForm', () => {
	test('renders login and password inputs', () => {
		render(<LoginForm tryAuth={() => true} />);

		expect(
			screen.getByRole('textbox', {
				name: /login/i,
			}),
		).toBeInTheDocument();

		expect(
			screen.getByRole('textbox', {
				name: /password/i,
			}),
		).toBeInTheDocument();
	});

	test('renders send button', () => {
		render(<LoginForm tryAuth={() => true} />);

		expect(
			screen.getByRole('button', {
				name: /send/i,
			}),
		).toBeInTheDocument();
	});

	test('shows error when login is too short', () => {
		render(<LoginForm tryAuth={() => true} />);

		const loginInput = screen.getByRole('textbox', {
			name: /login/i,
		});

		userEvent.type(loginInput, 'abc');

		expect(screen.getByText('The field is too short!')).toBeInTheDocument();
	});

	test('shows error when password is too short', () => {
		render(<LoginForm tryAuth={() => true} />);

		userEvent.type(
			screen.getByRole('textbox', {
				name: /password/i,
			}),
			'abc',
		);

		expect(screen.getByText('The field is too short!')).toBeInTheDocument();
	});

	test('calls tryAuth on submit', () => {
		const tryAuth = jest.fn(() => true);

		render(<LoginForm tryAuth={tryAuth} />);

		userEvent.type(
			screen.getByRole('textbox', {
				name: /login/i,
			}),
			'admin',
		);

		userEvent.type(
			screen.getByRole('textbox', {
				name: /password/i,
			}),
			'admin123',
		);

		userEvent.click(screen.getByRole('button', { name: /send/i }));

		expect(tryAuth).toHaveBeenCalledTimes(1);

		expect(tryAuth).toHaveBeenCalledWith('admin', 'admin123');
	});

	test('shows error boundary when auth failed', async () => {
		const tryAuth = jest.fn(() => false);

		render(
			<CatchError>
				<LoginForm tryAuth={tryAuth} />
			</CatchError>,
		);

		userEvent.type(
			screen.getByRole('textbox', {
				name: /login/i,
			}),
			'admin',
		);

		userEvent.type(
			screen.getByRole('textbox', {
				name: /password/i,
			}),
			'admin123',
		);

		userEvent.click(screen.getByRole('button', { name: /send/i }));

		expect(tryAuth).toHaveBeenCalledTimes(1);

		expect(await screen.findByText('Incorrect data!')).toBeInTheDocument();
	});

	test('does not show error boundary when auth succeeds', () => {
		render(
			<CatchError>
				<LoginForm tryAuth={() => true} />
			</CatchError>,
		);

		userEvent.type(
			screen.getByRole('textbox', {
				name: /login/i,
			}),
			'admin',
		);

		userEvent.type(
			screen.getByRole('textbox', {
				name: /password/i,
			}),
			'admin1234',
		);

		userEvent.click(screen.getByRole('button', { name: /send/i }));

		expect(screen.queryByText('Incorrect data!')).not.toBeInTheDocument();
	});
});
