import LoginForm from "./LoginForm";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CatchError from "../CatchError";

const setup = () => {
 return render(<LoginForm />)
}

describe('Login form', () => {

  it('should have login input', () => {
    setup()
    const loginInput = screen.getByLabelText(/login/i)
    expect(loginInput).toBeInTheDocument()
  })

  it('should have password input', () => {
    setup()
    const passwordInput = screen.getByLabelText(/password/i)
    expect(passwordInput).toBeInTheDocument()
  })
  
  it('should have button', () => {
    setup()
    const button = screen.getByRole(/button/i)
    expect(button).toBeInTheDocument()
  })

  it('should throw Error when input value is too short', async () => {
    setup()
    const loginInput = screen.getByLabelText(/login/i)
    userEvent.type(loginInput, 'a')
    const error = await screen.findByText(/The field is too short/i)
    expect(error).toBeInTheDocument()
  })

  it('should throw Error when data sent is incorrect', async () => {
    const tryAuthMock = jest.fn()
    tryAuthMock.mockReturnValue(false)

    render(
      <CatchError>
        <LoginForm tryAuth={ tryAuthMock } />
      </CatchError>
    )

    const loginInput = screen.getByLabelText(/login/i)
    userEvent.type(loginInput, 'a')
    const passwordInput = screen.getByLabelText(/password/i)
    userEvent.type(passwordInput, 'a')
    
    await waitFor(() => {
      const submitButton = screen.getByRole(/button/i, { name: /send/i })
      userEvent.click(submitButton)
    })
  
    const errorMessage = await screen.findByText(/Incorrect data/i)
    expect(errorMessage).toBeInTheDocument()
  })
})