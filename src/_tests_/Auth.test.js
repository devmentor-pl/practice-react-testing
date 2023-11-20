import { screen, render } from "@testing-library/react";
import Auth from "../components/Auth";
import userEvent from "@testing-library/user-event";

const setup = () => {
    render(<Auth />)

    const spy = jest.spyOn(window, 'fetch')

    const loginInput = screen.getByLabelText(/login/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const button = screen.getByRole('button')

    return { loginInput, passwordInput, button, spy }
}

describe('Auth component', () => {
    it('render Auth component', () => {
        const { loginInput, passwordInput } = setup()

        expect(loginInput).toBeInTheDocument()
        expect(passwordInput).toBeInTheDocument()
    })
    it('display heading when correct login and password', async () => {
        const { loginInput, passwordInput, button, spy } = setup()

        const login = 'jan@domena.pl'
        const password = 'janeczek'

        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => {
                return { Digest: '8ae75b43f70f20ba564200ef4ab63a33' }
            }
        })

        userEvent.type(loginInput, login)
        userEvent.type(passwordInput, password)

        userEvent.click(button)


        const welcomeText = await screen.findByText(`Jesteś zalogowany jako: ${login}`);

        expect(welcomeText).toBeInTheDocument()

        spy.mockClear()
    })
    it('not display heading when incorrect login and password', async () => {
        const { loginInput, passwordInput, button, spy } = setup()

        const login = 'jan@domena.pl'
        const password = 'janeczek123'

        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => {
                return { Digest: 'wrongMd5' }
            }
        })

        userEvent.type(loginInput, login)
        userEvent.type(passwordInput, password)
        userEvent.click(button)

        const welcomeText = screen.queryByText(`Jesteś zalogowany jako: ${login}`);

        expect(welcomeText).not.toBeInTheDocument()
        expect(window.fetch).toHaveBeenCalled()
        expect(window.fetch).toHaveBeenCalledWith('https://api.hashify.net/hash/md5/hex', {
            method: 'POST',
            body: password,
        })

        spy.mockClear()
    })
})