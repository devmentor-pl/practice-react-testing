import { render, screen } from '@testing-library/react';
import LoginForm from '../components/LoginForm';
import userEvent from '@testing-library/user-event';

const tryAuthMock = jest.fn();

// żeby nie powtarzać inputa (stąd: https://testing-library.com/docs/example-input-event/)
// const setup = () => {
//     const utils = render(<LoginForm />);
//     const input = screen.getByLabelText('login:');
//     return {
//       input,
//       ...utils,
//     }

it('renders form with login input', () => {
	// miało być wykorzystanie powyższej funkcji w 3 testach:
	// 	const {input} = setup();
	// ale jak funkcja jest niezakomentowana, to testy się nie uruchamiają :o
	render(<LoginForm />);
	const input = screen.getByLabelText('login:');
	expect(input).toBeInTheDocument();
});

// nie wiem czy poniższy test ma sens ;D
it('shows value typed into an input', () => {
	render(<LoginForm />);
	const input = screen.getByLabelText('login:');
	userEvent.type(input, 'jan');
	expect(input).toHaveValue('jan');
});

it('shows an error when input value is incorrect', async () => {
	render(<LoginForm />);
	const input = screen.getByLabelText('login:');
	userEvent.type(input, 'ab');
	const error = await screen.findByText('The field is too short!');
	expect(error).toBeInTheDocument();
});

it('removes error when value is correct', async () => {
	render(<LoginForm />);
	const input = screen.getByLabelText('login:');
	userEvent.type(input, 'ab');
	const error = await screen.findByText('The field is too short!');
	userEvent.type(input, 'cd');
	expect(error).not.toBeInTheDocument();
});

it('returns 0 when no values passed', async () => {
	render(<LoginForm />);
	const submitBtn = screen.getByRole('button', { name: /send/i });
	userEvent.click(submitBtn);
	tryAuthMock.mock.results.value === 0; // Error: Uncaught [TypeError: tryAuth is not a function]
	// hm...
});
