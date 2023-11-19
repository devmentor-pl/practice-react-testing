import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import LoginForm from "../components/LoginForm";
import CatchError from "../components/CatchError";

const mock = jest.fn()

xdescribe('LoginForm', () => {
    it('shows login', () => {
        render(<LoginForm tryAuth={mock} />)

        const login = screen.getByText(/login/i)
        expect(login).toBeInTheDocument()
    })
    it('shows password', () => {
        render(<LoginForm tryAuth={mock} />)

        const password = screen.getByText(/password/i)
        expect(password).toBeInTheDocument()
    })
    it('shows an error when login is too short', async () => {
        render(<LoginForm tryAuth={mock} />)

        const loginInput = screen.getByLabelText('login:')

        userEvent.type(loginInput, 'aaa')

        const error = await screen.findByText('The field is too short!')

        expect(error).toBeInTheDocument()
    })
    it('shows an error when password is too short', () => {
        render(<LoginForm tryAuth={mock} />)

        const password = screen.getByLabelText('password:')

        userEvent.type(password, 'aaa')

        const error = screen.getByText('The field is too short!')
        expect(error).toBeInTheDocument()
    })
    it('shows error message when tryAuth returns false', async () => {
        mock.mockReturnValue(false)

        render(
            <CatchError>
                <LoginForm tryAuth={mock} />
            </CatchError>);

        const button = screen.getByRole('button', { name: 'send' })

        userEvent.click(button)

        const error = await screen.findByText('Incorrect data!')

        expect(error).toBeInTheDocument()
    })
}) 