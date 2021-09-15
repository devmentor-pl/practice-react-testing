import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../components/LoginForm';

describe('Test loging form', () => {
	it('should contain password input', function () {
		render(<LoginForm />);

		const loginInput = screen.getByLabelText(/password/i);
		expect(loginInput).toBeInTheDocument();
	});

	it('should contain login input', function () {
		render(<LoginForm />);

		const passwordInput = screen.getByLabelText(/login/i);
		expect(passwordInput).toBeInTheDocument();
	});

	it('should contain send button', function () {
		render(<LoginForm />);

		const button = screen.getByRole('button', {name: /send/i});
		expect(button).toBeInTheDocument();
	});

	it('should return error if short login', async function () {
		render(<LoginForm />);

		const loginInput = screen.getByLabelText(/login/i);

		userEvent.type(loginInput, 'Ma');

		const alert = await screen.findByText(/The field is too short/i);
		expect(alert).toBeInTheDocument();
	});

	it('should return error if short password', async function () {
		render(<LoginForm />);

		const passwordInput = screen.getByLabelText(/password/i);

		userEvent.type(passwordInput, '123');

		const alert = await screen.findByText(/The field is too short/i);
		expect(alert).toBeInTheDocument();
	});

	it('should return error if wrong data submitted', async function () {
		const authMock = jest.fn();
		authMock.mockReturnValue(false);

		render(
			<LoginForm tryAuth={authMock} />);

		const loginInput = screen.getByLabelText(/login/i);
		userEvent.type(loginInput, 'Ma');

		const passwordInput = screen.getByLabelText(/password/i);
		userEvent.type(passwordInput, '123');

		const button = screen.getByRole('button', {name: /send/i});


		expect(() => {
			userEvent.click(button);
		}).toThrow();

		expect(authMock).toBeCalledWith('Ma', '123');
	});
})