import {render, screen} from '@testing-library/react'
import  userEvent  from '@testing-library/user-event'
import LoginForm from '../components/LoginForm'
import CatchError from  '../components/CatchError'


describe('Login form test', () => {
    test('should contain a login label', () => {
        render(<LoginForm/>)

        const login = screen.getByLabelText(/login/i)
        expect(login).toBeInTheDocument()
    })

    test('should contain a password label', () => {
        render(<LoginForm/>)

        const password = screen.getByLabelText(/password/i)
        expect(password).toBeInTheDocument()
    })

    test('should contain a button', () => {
        render(<LoginForm/>)

        const button = screen.getByRole('button', {name: /send/i})
        expect(button).toBeInTheDocument()
    })

    test('throw error when login is too short', async () => {
        render(<LoginForm/>)

        const login = screen.getByLabelText(/login/i)
        userEvent.type(login, 'An')

        const alert = await screen.findByText(/The field is too short/i)
        expect(alert).toBeInTheDocument()
    })

    test('throw error when password is too short', async () => {
        render(<LoginForm/>)

        const password = screen.getByLabelText(/password/i)
        userEvent.type(password, 'xx')

        const alert = await screen.findByText(/The field is too short/i)
        expect(alert).toBeInTheDocument()
    })

    test('throw error when the wrong data was sent', async () => {
        const authMock = jest.fn()
        authMock.mockReturnValue(false)

        render(<CatchError><LoginForm tryAuth={authMock} /></CatchError>)

        const login = screen.getByLabelText(/login/i)
        userEvent.type(login, 'An')

        const password = screen.getByLabelText(/password/i)
        userEvent.type(password, 'xx')

        const button = screen.getByRole('button', {name: /send/i})

        userEvent.click(button)

        const alert = await screen.findByText(/Incorrect data!/i)
        expect(alert).toBeInTheDocument()

    })

})