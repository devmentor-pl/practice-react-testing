import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Auth from '../components/Auth'

jest.spyOn(window, 'fetch')

describe('Auth login form test', () => {

	it('should return ok if user logged correctly', async () => {
		render(<Auth/>);

		const loginElement = screen.getByLabelText('login:');
		const passwordElement = screen.getByLabelText('password:');
		const submitElement = screen.getByRole('button', {name: /send/i});

		const loginExample = 'jan@domena.pl';
		const passwordExample = 'janeczek';
		const md5 = '8ae75b43f70f20ba564200ef4ab63a33';

		userEvent.type(loginElement, loginExample);
		userEvent.type(passwordElement, passwordExample);

		window.fetch.mockResolvedValueOnce({
			ok: true,
			json: async () => {
				return {Digest: md5};
			},
		});

		userEvent.click(submitElement);
		const response = await screen.findByText(`Jesteś zalogowany jako: ${loginExample}`);

		expect(response).toBeInTheDocument();
	})

	it('should not return anything if wrong data provide', async () => {
		render(<Auth/>);

		const loginElement = screen.getByLabelText('login:');
		const passwordElement = screen.getByLabelText('password:');
		const submitElement = screen.getByRole('button', {name: /send/i});

		const loginExample = 'marcin@domena.pl';
		const passwordExample = 'wrongPassword';
		const md5 = 'c5450079ce3aa5440cdea45c4be193bb';

		userEvent.type(loginElement, loginExample);
		userEvent.type(passwordElement, passwordExample);

		window.fetch.mockResolvedValueOnce({
			ok: true,
			json: async () => {
				return { Digest: md5 };
			},
		});

		userEvent.click(submitElement);

		waitFor(() => {
			const response = screen.queryByText(`Jesteś zalogowany jako: ${loginExample}`);
			expect(response).not.toBeInTheDocument();
		});
		// testy przechodzily ale nie dostawalem erorr " When testing, code that causes React state updates should be wrapped into act(...):"
		// ze zmieniam stan i kazali uzyc act ale czytajac na stackoverflow polecaja uzywac waitFor. Mam nadziej ze to dobrze ?
	});

})