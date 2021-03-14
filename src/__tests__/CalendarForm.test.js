import { render, screen } from '@testing-library/react';
import LoginForm from '../components/LoginForm';
import CatchError from '../components/CatchError';
import userEvent from '@testing-library/user-event';

// żeby nie powtarzać inputa (stąd: https://testing-library.com/docs/example-input-event/)
const setup = () => {
	const utils = render(<LoginForm />);
	const input = screen.getByLabelText('login:');
	return {
		input,
		...utils,
	};
};

it('renders form with login input', () => {
	const { input } = setup();
	expect(input).toBeInTheDocument();
});

it('shows value typed into an input', () => {
	const { input } = setup();
	userEvent.type(input, 'jan');
	expect(input).toHaveValue('jan');
});

it('shows an error when input value is incorrect', async () => {
	const { input } = setup();
	userEvent.type(input, 'ab');
	const error = await screen.findByText('The field is too short!');
	expect(error).toBeInTheDocument();
});

it('removes error when value is correct', async () => {
	const { input } = setup();
	userEvent.type(input, 'ab');
	const error = await screen.findByText('The field is too short!');
	userEvent.type(input, 'cd');
	expect(error).not.toBeInTheDocument();
});

it('returns false when no values passed', async () => {
	const tryAuthMock = jest.fn();
	tryAuthMock.mockReturnValueOnce(false);
	render(
		<CatchError>
			<LoginForm tryAuth={tryAuthMock} />
		</CatchError>
	);
	const submitBtn = screen.getByRole('button', { name: /send/i });
	userEvent.click(submitBtn);
	expect(tryAuthMock).toHaveBeenLastCalledWith('', '');
});
