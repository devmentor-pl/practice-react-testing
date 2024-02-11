import { render, screen } from '@testing-library/react';
import LoginForm from './LoginForm';
import userEvent from '@testing-library/user-event';
import CatchError from './CatchError';

const mockTryAuth = jest.fn();

describe('<LoginForm />', () => {
	test('component should have login field', () => {
		render(<LoginForm />);

		const loginField = screen.getByRole('textbox', { name: /login/i });
		expect(loginField).toBeInTheDocument();
	});

	test('component should have password field', () => {
		render(<LoginForm />);

		const passwordField = screen.getByRole('textbox', { name: /password/i });
		expect(passwordField).toBeInTheDocument();
	});

	test('should return error when entered value in login field is too short', () => {
		render(<LoginForm />);

		const loginField = screen.getByRole('textbox', { name: /login/i });
		userEvent.type(loginField, 'abc');

		const error = screen.getByText('The field is too short!');
		expect(error).toBeInTheDocument();
	});

	test('should return error when entered value in password field is too short', () => {
		render(<LoginForm />);

		const passwordField = screen.getByRole('textbox', { name: /password/i });
		userEvent.type(passwordField, 'abc');

		const error = screen.getByText('The field is too short!');
		expect(error).toBeInTheDocument();
	});

	test('handles incorrect authorization data', async () => {
		mockTryAuth.mockReturnValue(false);
		render(
			<CatchError>
				<LoginForm tryAuth={mockTryAuth} />
			</CatchError>
		);

		const submitBtn = await screen.findByRole('button', { name: /send/i });
		userEvent.click(submitBtn);

		const error = await screen.findByText('Incorrect data!');
		expect(error).toBeInTheDocument();
	});

	test('handles correct authorization data', async () => {
		mockTryAuth.mockReturnValue(true);

		render(
			<CatchError>
				<LoginForm tryAuth={mockTryAuth} />
			</CatchError>
		);

		const submitBtn = await screen.findByRole('button', { name: /send/i });
		userEvent.click(submitBtn);

		const error = screen.queryByText('Incorrect data!');
		expect(error).toBeNull();
	});
});
