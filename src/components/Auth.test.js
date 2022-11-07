import Auth from '../components/Auth'
import {render, screen } from '@testing-library/react'
import  userEvent  from '@testing-library/user-event'

jest.spyOn(window, 'fetch')

it('should have login input', () => {
    render(<Auth/>)

    const login = screen.getByLabelText(/login/i)
    expect(login).toBeInTheDocument()
})

it('should have password input', () => {
    render(<Auth/>)

    const password = screen.getByLabelText(/password/i)
    expect(password).toBeInTheDocument()
})

it('should throw new Error when login is too short', async() => {
    render(<Auth/>)

    const login = screen.getByLabelText(/login/i)
    userEvent.type(login, 'x')

    const error = await screen.findByText(/The field is too short/i)

    expect(error).toBeInTheDocument()

})

it('should throw new Error when password is too short', async() => {
    render(<Auth/>)

    const password = screen.getByLabelText(/password/i)
    userEvent.type(password, 'x')

    const error = await screen.findByText(/The field is too short/i)

    expect(error).toBeInTheDocument()

})

test('should login user with correct data', async () => {
    render(<Auth/>)

    const login = screen.getByLabelText(/login/i) 
    const password = screen.getByLabelText(/password/i)
    const button = screen.getByRole('button', {name: /send/i})

    window.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => {
            return {Digest: '8ae75b43f70f20ba564200ef4ab63a33'}
        }
        })

    userEvent.type(login, 'jan@domena.pl')
    userEvent.type(password, 'janeczek')
    userEvent.click(button)
  
    const info = await screen.findByText(/Jesteś zalogowany jako: jan@domena.pl/i)
    expect(info).toBeInTheDocument()

    })

