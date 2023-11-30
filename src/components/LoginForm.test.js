import { fireEvent, render, screen } from '@testing-library/react';
import LoginForm from './LoginForm';

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
		test('tryAuth gets 0 params', async () => {
			// ten test nie ma sensu...
			tryAuthMock.mockResolvedValue(undefined);

			render(<LoginForm tryAuth={tryAuthMock} />);

			fireEvent.click(screen.getByRole('button', { name: 'send' }));

			expect(tryAuthMock).toHaveBeenCalledWith('', '');
		});
		test('tryAuth gets only 1 param', async () => {
			tryAuthMock.mockResolvedValue(undefined);

			render(<LoginForm tryAuth={tryAuthMock} />);

			fireEvent.change(screen.getByLabelText(/login/i), { target: { value: 'aasa44' } });

			fireEvent.click(screen.getByRole('button', { name: 'send' }));

			expect(tryAuthMock).toHaveBeenCalledWith('aasa44', '');
		});
		test('tryAuth gets 2 params', async () => {
			tryAuthMock.mockResolvedValue(undefined);

			render(<LoginForm tryAuth={tryAuthMock} />);

			fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'aasa44' } });
			fireEvent.change(screen.getByLabelText(/login/i), { target: { value: 'aasa44' } });

			fireEvent.click(screen.getByRole('button', { name: 'send' }));

			expect(tryAuthMock).toHaveBeenCalledWith('aasa44', 'aasa44');
		});
		// test('handles async tryAuth with resolved promise', async () => {
        //     // to nie ma sensu skoro zaznaczam true na sztywno?
        //     // czy ja nie powinenem zrobic mocka ktory bedzie funkcja tryAuth i bedzie zwracac true?
		// 	tryAuthMock.mockResolvedValue(true);

		// 	render(<LoginForm tryAuth={tryAuthMock} />);

		// 	fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'asccs45' } });
		// 	fireEvent.change(screen.getByLabelText(/login/i), { target: { value: 'asscc45' } });

		// 	await expect(screen.getByRole('button', { name: 'send' })).resolves.toBeTruthy();
		// });

		// test('handles async tryAuth with rejected promise', async () => {
		// 	tryAuthMock.mockRejectedValue(false);

		// 	render(<LoginForm tryAuth={tryAuthMock} />);

		// 	fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'ass45' } });
		// 	fireEvent.change(screen.getByLabelText(/login/i), { target: { value: 'ass45' } });

		// 	await expect(screen.getByRole('button', { name: 'send' })).rejects.toThrow('Incorrect data!');
		// });
	});
});
