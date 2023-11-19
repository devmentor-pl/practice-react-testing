/* eslint-disable testing-library/no-debugging-utils */
import { screen, render } from "@testing-library/react";
import Auth from "../components/Auth";
import userEvent from "@testing-library/user-event";

jest.spyOn(window, 'fetch')

xdescribe('Auth component', () => {
    it('render Auth component', () => {
        render(<Auth />)

        screen.debug()
        expect(screen.getByText(/login/i)).toBeInTheDocument()
    })
    it('display heading when correct login and password', async () => {
        render(<Auth />)

        const login = 'jan@domena.pl'
        const password = 'janeczek'

        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => {
                return { Digest: '8ae75b43f70f20ba564200ef4ab63a33' }
            }
        })

        const loginInput = screen.getByLabelText(/login/i)
        const passwordInput = screen.getByLabelText(/password/i)
        const button = screen.getByRole('button')

        userEvent.type(loginInput, login)
        userEvent.type(passwordInput, password)

        userEvent.click(button)


        const welcomeText = await screen.findByText(`Jesteś zalogowany jako: ${login}`);
        // const welcomeText = await screen.findByRole('heading', { name: /jesteś zalogowany jako: jan@domena\.pl/i })

        expect(welcomeText).toBeInTheDocument()
    })
    it('not display heading when incorrect login and password', async () => {
        render(<Auth />)

        const login = 'jan@domena.pl'
        const password = 'janeczek123'

        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => {
                return { Digest: 'wrongMd5' }
            }
        })

        const loginInput = screen.getByLabelText(/login/i)
        const passwordInput = screen.getByLabelText(/password/i)
        const button = screen.getByRole('button')

        userEvent.type(loginInput, login)
        userEvent.type(passwordInput, password)
        userEvent.click(button)

        const welcomeText = screen.queryByText(`Jesteś zalogowany jako: ${login}`);

        expect(welcomeText).not.toBeInTheDocument()
    })
})