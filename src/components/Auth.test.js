import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Auth from '../components/Auth'

jest.spyOn(window, 'fetch')

describe('Auth tests suite', () => {
	
	test('user logged in on correct credentials', async () => {
		render(<Auth />)

		const loginEl = screen.getByLabelText('login:')
		const passwordEl = screen.getByLabelText('pasword:')
		const submitEl = screen.getByRole('button', { name: /send/i })

		const login = 'jan@domena.pl'
		const password = 'janeczek'
		const expectedMD5 = '8ae75b43f70f20ba564200ef4ab63a33'

		userEvent.type(loginEl, login)
		userEvent.type(passwordEl, password)

		window.fetch.mockResolvedValueOnce({
			ok: true,
			json: async () => {
				return { Digest: expectedMD5 };
			},
		})

		userEvent.click(submitEl)

		const response = await screen.findByText(`Jesteś zalogowany jako: ${login}`)

		expect(response).toBeInTheDocument()
	})

	test('user not logged in on incorrect credentials', () => {
		render(<Auth />)

		const loginEl = screen.getByLabelText('login:')
		const passwordEl = screen.getByLabelText('pasword:')
		const submitEl = screen.getByRole('button', { name: /send/i })

		const login = 'jan@domena.pl'
		const password = 'wrongPassword'
		const expectedMD5 = '8e8210c8d03064930e4ee7f2f1f6e2c2'

		userEvent.type(loginEl, login)
		userEvent.type(passwordEl, password)

		window.fetch.mockResolvedValueOnce({
			ok: true,
			json: async () => {
				return { Digest: expectedMD5 };
			},
		})

		userEvent.click(submitEl)

		const response = screen.queryByText(`Jesteś zalogowany jako: ${login}`)

		expect(response).not.toBeInTheDocument()
	})

})
