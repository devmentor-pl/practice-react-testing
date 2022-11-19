import Auth from '../components/Auth';
import {  render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";

jest.spyOn(window, 'fetch')

const setup = () => {
 return render(<Auth />)
}

describe('Auth', () => {
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

  it('should display logged user whent input data is correct', async () => {
    setup()
    const loginInput = screen.getByLabelText(/login/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole(/button/i, { name: /send/i })

    const login = 'marcin@domena.pl'
    const passwordTypedByUser = 'marcinek'
    const passwordMd5 = 'c5450079ce3aa5440cdea45c4be193bb'

    userEvent.type(loginInput, login)
    userEvent.type(passwordInput, passwordTypedByUser)

    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => {
        return { Digest: passwordMd5 }
      }
    })
   
    userEvent.click(submitButton)
    
    const loggedUserText = await screen.findByText(`Jesteś zalogowany jako: ${login}`)
    expect(loggedUserText).toBeInTheDocument()
  })  
})