import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from './LoginForm'
import CatchError from './CatchError'

describe('Test', () => {
    test('must be true', () => {
        expect(true).toBe(true)
    })
})
describe('checking that all elements in the component', () => {

    test('should get text 1 way - login', () => {
        render(<LoginForm />)
        const login = screen.getByLabelText(/login/i)
        expect(login).toBeInTheDocument()
    })

    test('should get text 2 way - password', async () => {
        render(<LoginForm />)
        const reg = (/password/i);
        const password = await screen.findByText(reg);
        expect(password).toBeInTheDocument()
    })

    test('should be button with the name - getByRole', () => {
        render(<LoginForm/>)
        const button = screen.getByRole('button', {name: /send/i})
        expect(button).toBeInTheDocument()
    })

    test('should be button with the name - findByRole', async () => {
        render(<LoginForm/>)
        const button = await screen.findByRole('button', {name: 'send'})
        expect(button).toBeInTheDocument()
    })

    test('should Error when login is too short', async () => {
        render(<LoginForm/>)
        const login = screen.getByLabelText(/login/i)
        userEvent.type(login, 'a')
        const errorText = await screen.findByText(/The field is too short/i)
        expect(errorText).toBeInTheDocument()
    })

    test('should Error when password is too short', async () => {
        render(<LoginForm/>)
        const login = screen.getByLabelText(/password/i)
        userEvent.type(login, 'a')
        const errorText = await screen.findByText(/The field is too short/i)
        expect(errorText).toBeInTheDocument()
    })

    test('should Error when send wrong data- getByRole', async () => {
        const authMock = jest.fn()
        authMock.mockReturnValue(false)

        render(<CatchError><LoginForm tryAuth={authMock} /></CatchError>)

        const login = screen.getByLabelText(/login/i)
        userEvent.type(login, 'a')

        const password = screen.getByLabelText(/password/i)
        userEvent.type(password, 'a')

        const button = screen.getByRole('button', {name: /send/i})

        userEvent.click(button)

        const errorText = await screen.findByText(/Somethin wrong, error: Error apeared/i)
        expect(errorText).toBeInTheDocument()
    })  

    test('should Error when send wrong data - getByRole & waitFor', async () => {
        const authMock = jest.fn()
        authMock.mockReturnValue(false)

        render(<CatchError><LoginForm tryAuth={authMock} /></CatchError>)

        const login = screen.getByLabelText(/login/i)
        userEvent.type(login, 'a')

        const password = screen.getByLabelText(/password/i)
        userEvent.type(password, 'a')

        await waitFor(() => {
            const button = screen.getByRole('button', {name: /send/i})
            userEvent.click(button)
        })

        const errorText = await screen.findByText(/Somethin wrong, error: Error apeared/i)
        expect(errorText).toBeInTheDocument()
    })    
})


















