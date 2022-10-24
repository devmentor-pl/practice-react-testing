import {getMd5} from '../providers/md5Provider'
import Md5Form from './Auth'
import Auth from './Auth'
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.spyOn(window,'fetch')
describe('Test API using spyOn', () => {
    it('should get test', async () => {

        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return { Digest: 'test' };
            },
        });
        const data = await getMd5()
        expect(data).toBe('test')
    })

    it('should get correct Digest', async () => {

        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return { Digest: '8ae75b43f70f20ba564200ef4ab63a33' };
            },
        });
        const data = await getMd5()
        expect(data).toBe('8ae75b43f70f20ba564200ef4ab63a33')
    })

    it('should get Digest after send password by POST', async () => {

        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return { Digest: '8ae75b43f70f20ba564200ef4ab63a31' };
            },
        });
        const data = await getMd5('test')
        expect(window.fetch).toHaveBeenCalledWith(
            'https://api.hashify.net/hash/md5/hex', 
            {"body": "test", "method": "POST"}
        );
        expect(data).toBe('8ae75b43f70f20ba564200ef4ab63a31')
        // jest.spyOn(window,'fetch').mockRestore()
    })
})

// jest.spyOn(window, 'fetch');
describe('Test Auth component using spyOn', () => {

    it('should test Input - to be in the document', () => {
        render(<Md5Form getMd5={getMd5} />);
        
        const input = screen.getByLabelText(/login:/i)
        expect(input).toBeInTheDocument();
    })

    it('should test Input - to be in the document 2', () => {
        const {debug, getByText, getByLabelText} = render(<Auth />);
        
        const input = getByLabelText(/login:/i)
        expect(input).toBeInTheDocument();
    })

    it('should logged after button cliced - using fireEvent', async () => {
        const {debug, getByText, getByLabelText} = render(<Auth />);

        const userLogin = 'jan@domena.pl';
        const login = getByLabelText(/login:/i)
        fireEvent.change(login, {target: {value: userLogin}})
        
        const password = screen.getByLabelText(/password:/i)
        fireEvent.change(password, {target: {value: 'janeczek'}})
        // console.log(debug())

        const pass = '8ae75b43f70f20ba564200ef4ab63a33';
        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return { Digest: pass };
            },
        });
        
        await waitFor(() => {
            const button = screen.getByRole('button', {name: 'send'} );
            userEvent.click(button);
        })
        const loggedUser = getByText(`Jesteś zalogowany jako: ${userLogin}`);
        // console.log(debug())

        expect(loggedUser).toBeInTheDocument();
    })
})







