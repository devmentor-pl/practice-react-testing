import { render, screen } from "@testing-library/react";
import Auth from "./Auth";
import userEvent from "@testing-library/user-event";

const setup = () => {
  render(<Auth />)

  const loginElement = screen.getByRole('textbox', { name: /login/i })
  const passwordElement = screen.getByRole('textbox', { name: /password/i })
  const buttonElement = screen.getByRole('button')

  return {
    loginElement,
    passwordElement,
    buttonElement
  }
}

describe('Auth', () => {
  it('should fields exists', async () => {
    const { loginElement, passwordElement } = setup()

    expect(loginElement).toBeInTheDocument()
    expect(passwordElement).toBeInTheDocument()
  })

  it('should log in', async () => {
    const { loginElement, passwordElement, buttonElement } = setup()

    const login = 'jan@domena.pl'
    const password = 'janeczek'
    const md5 = '8ae75b43f70f20ba564200ef4ab63a33'

    const spy = jest.spyOn(window, 'fetch')

    window.fetch.mockResolvedValue({
      ok: true,
      json: async () => {
        return { Digest: md5 }
      }
    })

    userEvent.type(loginElement, login)
    userEvent.type(passwordElement, password)
    userEvent.click(buttonElement)

    const info = await screen.findByText(`Jesteś zalogowany jako: ${login}`)
    expect(info).toBeInTheDocument()
    expect(window.fetch).toHaveBeenCalled()
    expect(window.fetch).toHaveBeenCalledWith(
      'https://api.hashify.net/hash/md5/hex',
      {
        method: 'POST',
        body: password
      }
    )

    spy.mockClear()
  })

  it('should not log in', async () => {
    const { loginElement, passwordElement, buttonElement } = setup()

    const login = 'jan@domena.pl'
    const password = 'janeczek'
    const md5 = '8ae75b43f70f20ba564200ef4ab63a33dd'

    const spy = jest.spyOn(window, 'fetch')

    window.fetch.mockResolvedValue({
      ok: true,
      json: async () => {
        return { Digest: md5 }
      }
    })

    userEvent.type(loginElement, login)
    userEvent.type(passwordElement, password)
    userEvent.click(buttonElement)

    const info = screen.queryByText(`Jesteś zalogowany jako: ${login}`)
    expect(info).not.toBeInTheDocument()

    spy.mockClear()
  })
})