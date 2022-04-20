import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Auth from './Auth';

jest.spyOn(window, 'fetch');

describe('Auth', ()=>{
    test('check if the success info is displayed when pass proper data', async ()=>{
        render(<Auth />)
        const userLogin = 'jan@domena.pl';
        const login = screen.getByLabelText(/login:/i);
        userEvent.type(login, userLogin);

        const password = screen.getByLabelText(/password:/i);
        userEvent.type(password, 'janeczek')

        const passwordHex = '8ae75b43f70f20ba564200ef4ab63a33';
        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return {Digest: passwordHex};
            },
        })
              
        await waitFor(() =>{
            const button = screen.getByRole('button', {name: 'send'} );
            userEvent.click(button);
        })
        const info = screen.getByText(`Jesteś zalogowany jako: ${userLogin}`);
        expect(info).toBeInTheDocument();
    });

    test('check if it is not possible login if pass incorrect data', async ()=>{
        render(<Auth />)

        const login = screen.getByLabelText(/login:/i);
        userEvent.type(login, 'jan@domena.pl');

        const password = screen.getByLabelText(/password:/i);
        userEvent.type(password, 'janeczek1')

        const passwordHex = '43b2099eed8d81a8ce7797c2059a0b28';
        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return {Digest: passwordHex};
            },
        })
              
        await waitFor(() =>{
            const button = screen.getByRole('button', {name: 'send'} );
            userEvent.click(button);
        })
        
        expect(login).toBeInTheDocument();
        expect(password).toBeInTheDocument();
    });
})