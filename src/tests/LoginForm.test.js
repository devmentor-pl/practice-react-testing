// Tym razem Twoim zadaniem będzie napisanie testów przy pomocy Jest oraz React Testing Library dla komponentu <LoginForm>.

// Dla propsa o nazwie tryAuth() utwórz odpowiedni Mock, który umożliwi Ci przetestowanie różnych scenariuszy.



import LoginForm from '../components/LoginForm';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


describe('LoginForm tests', () => {

    it('should have a login label', () => {
        render(<LoginForm />);

        const passwordLabel= screen.getByLabelText(/password/i);
        expect(passwordLabel).toBeInTheDocument();
    });

    it('should have a password label', () => {
        render(<LoginForm />);

        const loginLabel= screen.getByLabelText(/login/i);
        expect(loginLabel).toBeInTheDocument();
    });

    it('should have a send button', () => {
        render(<LoginForm />);

        const button= screen.getByRole('button', {name: /send/i});
        expect(button).toBeInTheDocument();
    });

    it('check the label contain login', () => {
        render(<LoginForm />);

        const loginLabel= screen.getByLabelText(/password/i);
        expect(loginLabel).toBeInTheDocument();
    });

    it('show error if login is too short', async () => {
		render(<LoginForm />);

		const loginLabel = screen.getByLabelText(/login/i);

		userEvent.type(loginLabel, 'Ma');

		const alert = await screen.findByText(/The field is too short/i);
		expect(alert).toBeInTheDocument();
	});

    it('show error if password is too short', async () => {
		render(<LoginForm />);

		const passwordLabel = screen.getByLabelText(/password/i);

		userEvent.type(passwordLabel, '123');

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

