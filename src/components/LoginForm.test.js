import LoginForm from "./LoginForm";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import CatchError from '../CatchError'

it('should have login label', () => {
    render(<LoginForm/>)

    const login = screen.getByLabelText(/login/i)
    expect(login).toBeInTheDocument()
})

it('should have password label', () => {
    render(<LoginForm/>)

    const password = screen.getByLabelText(/password/i)
    expect(password).toBeInTheDocument()
})

it('should have button', () => {
    render(<LoginForm/>)

    const button = screen.getByRole(/button/i)
    expect(button).toBeInTheDocument()

})

it('should throw new Error when input value is too short', async () => {
    render(<LoginForm/>)

    const login = screen.getByLabelText(/login/i)
    userEvent.type(login, 'x')

    const error = await screen.findByText(/The field is too short/i)
    expect(error).toBeInTheDocument()

})

it('should throw new Error when password is too short', async () => {
    render(<LoginForm/>)

    const password = screen.getByLabelText(/password/i)
    userEvent.type(password, 'x')

    const error = await screen.findByText(/The field is too short/i)
    expect(error).toBeInTheDocument()
})
