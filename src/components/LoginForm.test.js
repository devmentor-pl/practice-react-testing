import { fireEvent, render, screen } from '@testing-library/react';
import LoginForm from './LoginForm';

xdescribe('<loginForm />', () => {
	describe('Rendering Elements', () => {
		test('input named login rendered correctly', () => {
			expect.assertions(1);
			render(<LoginForm />);

			expect(screen.getByLabelText(/login/i)).toBeInTheDocument();
		});

		test('input named password rendered correctly', () => {
			expect.assertions(1);
			render(<LoginForm />);

			expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
		});

		test('button rendered correctly', () => {
			expect.assertions(1);
			render(<LoginForm />);

			expect(screen.getByRole('button', { name: 'send' })).toBeInTheDocument();
		});
	});
	describe('Testing OnChange', () => {
		test('displays error message for too short login', () => {
			expect.assertions(1);
			render(<LoginForm />);
			fireEvent.change(screen.getByLabelText(/login/i), { target: { value: 'abc' } });

			expect(screen.getByText('The field is too short!')).toBeInTheDocument();
		});

		test('displays error message for too short password', () => {
			expect.assertions(1);
			render(<LoginForm />);
			fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'abc' } });

			expect(screen.getByText('The field is too short!')).toBeInTheDocument();
		});

		test('no error message, login value is correct', () => {
			expect.assertions(1);
			render(<LoginForm />);
			fireEvent.change(screen.getByLabelText(/login/i), { target: { value: 'abc45' } });

			expect(screen.queryByText('The field is too short!')).not.toBeInTheDocument();
		});

		test('no error message, password value is correct', () => {
			expect.assertions(1);
			render(<LoginForm />);
			fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'aasa44' } });

			expect(screen.queryByText('The field is too short!')).not.toBeInTheDocument();
		});
	});
	describe('Testing OnSubmit', () => {
		test('submitting incorrect values', async () => {
			expect.assertions(1);

			const mock = jest.fn();
			mock.mockReturnValueOnce(false);

			render(<LoginForm tryAuth={mock} />);

			const button = await screen.findByRole('button');
			try {
				fireEvent.click(button);
			} catch (e) {
				expect(e.message).toBe('Incorrect data!');
			}
		});

		test('tryAuth gets only 1 param(password) and drops error', async () => {
			const mock = jest.fn();
			mock.mockReturnValueOnce(false);

			render(<LoginForm tryAuth={mock} />);

			fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'aasa44' } });

			const button = await screen.findByRole('button');

			try {
				fireEvent.click(button);
			} catch (e) {
				expect(e.message).toBe('Incorrect data!');
			}
		});
	});
});
