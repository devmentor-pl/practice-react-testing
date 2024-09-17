import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../components/LoginForm';

describe('Test loging form', () => {
	test('should contain password field', function () {
		render(<LoginForm />);

		const password = screen.getByLabelText(/password/i);
		expect(password).toBeInTheDocument();
	});

	test('should contain login field', function () {
		render(<LoginForm />);

		const login = screen.getByLabelText(/login/i);
		expect(login).toBeInTheDocument();
	});

	test('should contain send button', function () {
		render(<LoginForm />);

		const button = screen.getByRole('button', {name: /send/i});
		expect(button).toBeInTheDocument();
	});

	test('throw error when login is incorrect', async function () {
		render(<LoginForm />);

		const login = screen.getByLabelText(/login/i);

		userEvent.type(login, 'bh');

		const alert = await screen.findByText(/The field is too short/i);
		expect(alert).toBeInTheDocument();
	});

	test('throw error when password is incorrect', async function () {
		render(<LoginForm />);

		const password = screen.getByLabelText(/password/i);

		userEvent.type(password, 'erd');

		const alert = await screen.findByText(/The field is too short/i);
		expect(alert).toBeInTheDocument();
	});

	test('should return error if wrong data submitted', async function () {
		const authMock = jest.fn();
		authMock.mockReturnValue(false);

		render(
			<LoginForm tryAuth={authMock} />);

		const login = screen.getByLabelText(/login/i);
		userEvent.type(login, 'fg');

		const password = screen.getByLabelText(/password/i);
		userEvent.type(password, '124');

		const button = screen.getByRole('button', {name: /send/i});

		expect(() => {
			userEvent.click(button);
		}).toThrow();

		expect(authMock).toBeCalledWith('fg', '124');
	});
}) 