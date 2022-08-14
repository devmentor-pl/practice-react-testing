import {render, screen, waitFor} from '@testing-library/react'
import  userEvent  from '@testing-library/user-event'
import Auth from '../components/Auth'

jest.spyOn(window, 'fetch');

describe('Auth form test', () => {
    test('should contain login and password inputs', () => {
        render(<Auth/>)

        const login = screen.getByLabelText(/login/i) 
        const password = screen.getByLabelText(/password/i)
        expect(login).toBeInTheDocument()
        expect(password).toBeInTheDocument()
    })

    test('should throw error when login and password are too short', async () => {
        render(<Auth/>)

        const login = screen.getByLabelText(/login/i) 
        const password = screen.getByLabelText(/password/i)
        userEvent.type(login, 'Jan')
        userEvent.type(password, 'jan')

        const alert = await screen.findByText(/The field is too short/i)
        expect(alert).toBeInTheDocument()

    })

    test('should login user when data are correct', async () => {
        render(<Auth/>)

        const login = screen.getByLabelText(/login/i) 
        const password = screen.getByLabelText(/password/i)
        const button = screen.getByRole('button', {name: /send/i})
        const passwordCode = '8ae75b43f70f20ba564200ef4ab63a33'

        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return {Digest: passwordCode}
            }
        })

        await waitFor(() => {
            userEvent.type(login, 'jan@domena.pl')
            userEvent.type(password, 'janeczek')
            userEvent.click(button)
        }) 
          
        const information = screen.getByText(/Jesteś zalogowany jako: jan@domena.pl/i)
        expect(information).toBeInTheDocument()
    })

    test('should not login user when data are incorrect', async () => {
        render(<Auth/>)

        const login = screen.getByLabelText(/login/i) 
        const password = screen.getByLabelText(/password/i)
        const button = screen.getByRole('button', {name: /send/i})
        const passwordCode = '8ae75b43f70f20ba564200ef4ab63a33'

        
        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return {Digest: passwordCode}
            }
        })
            const user = 'anna@domena.pl'
            await waitFor(() => {
                userEvent.type(login, user)
                userEvent.type(password, 'anna')
                userEvent.click(button)
            }) 

        const information = screen.queryByText(`Jesteś zalogowany jako: ${user}`)
        expect(information).not.toBeInTheDocument()
    })


})