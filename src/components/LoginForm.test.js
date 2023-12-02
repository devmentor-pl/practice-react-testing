import { fireEvent, render, screen } from '@testing-library/react';
import LoginForm from './LoginForm';
import Task01 from '../Task01';

const tryAuthMock = jest.fn();

describe('<LoginForm />', () => {
	describe('Rendering Elements', () => {
		test('input named login rendered correctly', () => {
			render(<LoginForm />);
			expect(screen.getByLabelText(/login/i)).toBeInTheDocument();
		});

		test('input named password rendered correctly', () => {
			render(<LoginForm />);
			expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
		});

		test('button rendered correctly', () => {
			render(<LoginForm />);
			expect(screen.getByRole('button', { name: 'send' })).toBeInTheDocument();
		});
	});

	describe('Testing OnChange', () => {
		test('displays error message for too short login', () => {
			render(<LoginForm />);
			fireEvent.change(screen.getByLabelText(/login/i), { target: { value: 'abc' } });
			expect(screen.getByText('The field is too short!')).toBeInTheDocument();
		});

		test('displays error message for too short password', () => {
			render(<LoginForm />);
			fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'abc' } });
			expect(screen.getByText('The field is too short!')).toBeInTheDocument();
		});

		test('no error message, login value is correct', () => {
			render(<LoginForm />);
			fireEvent.change(screen.getByLabelText(/login/i), { target: { value: 'abc45' } });
			expect(screen.queryByText('The field is too short!')).not.toBeInTheDocument();
		});

		test('no error message, password value is correct', () => {
			render(<LoginForm />);
			fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'aasa44' } });
			expect(screen.queryByText('The field is too short!')).not.toBeInTheDocument();
		});
	});

	describe('Testing OnSubmit', () => {
		test('displays error message when form is submitted with empty inputs', async () => {
			render(<Task01 />);
			fireEvent.click(screen.getByRole('button', { name: 'send' }));

			await expect(screen.getByText('Incorrect data!')).toBeInTheDocument();
		});
		test('tryAuth gets only 1 param', async () => {
			const tryAuthMock = jest.fn((login, password) => Promise.resolve());

			render(<LoginForm tryAuth={tryAuthMock} />);

			fireEvent.change(screen.getByLabelText(/login/i), { target: { value: 'aasa44' } });

			fireEvent.click(screen.getByRole('button', { name: 'send' }));

			expect(tryAuthMock).toHaveBeenCalledWith('aasa44', '');
		});

		test('tryAuth gets 2 params', async () => {
			const tryAuthMock = jest.fn((login, password) => Promise.resolve());
			render(<LoginForm tryAuth={tryAuthMock} />);

			fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'aasa44' } });
			fireEvent.change(screen.getByLabelText(/login/i), { target: { value: 'aasa44' } });

			fireEvent.click(screen.getByRole('button', { name: 'send' }));

			expect(tryAuthMock).toHaveBeenCalledWith('aasa44', 'aasa44');
		});

		test('tryAuth gets only 1 param(password) and droped error', async () => {
			const tryAuthMock = jest.fn((login, password) => Promise.resolve);
			render(<Task01 />);
			fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'aasa44' } });
			fireEvent.click(screen.getByRole('button', { name: 'send' }));

			await expect(screen.getByText('Incorrect data!')).toBeInTheDocument();
		});
		test('tryAuth gets only 1 param(login) and droped error', async () => {
			const tryAuthMock = jest.fn((login, password) => Promise.resolve);
			render(<Task01 />);
			fireEvent.change(screen.getByLabelText(/login/i), { target: { value: 'aasa44' } });
			fireEvent.click(screen.getByRole('button', { name: 'send' }));

			await expect(screen.getByText('Incorrect data!')).toBeInTheDocument();
		});
	});
});
