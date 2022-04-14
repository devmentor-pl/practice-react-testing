import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Auth from '../components/Auth'

jest.spyOn(window, 'fetch')

describe('Auth tests', () => {

it('check user logged correctly', async () => {
    
    render(<Auth />);

    const password = screen.getByLabelText('password:');
    const login = screen.getByLabelText('login:');
    const button= screen.getByRole('button', {name: /send/i});

    const loginExample = 'jan@domena.pl';
    const passwordExample = 'janeczek';
    const md5 = '8ae75b43f70f20ba564200ef4ab63a33';
    
    userEvent.type(login, loginExample);
    userEvent.type(password, passwordExample);

    window.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => {
            return {Digest: md5}
        }
    })

    userEvent.click(button);
    const message = await screen.findByText(`Jesteś zalogowany jako: ${loginExample}`);

  
        expect(message).toBeInTheDocument();
    })



    it('show nothing if data is wrong', async () => {
        render(<Auth />);
    
        const password = screen.getByLabelText('password:');
        const login = screen.getByLabelText('login:');
        const button= screen.getByRole('button', {name: /send/i});
    
        const loginExample = 'marcin@domena.pl';
        const passwordExample = 'wrongpassword';
        const md5 = 'c5450079ce3aa5440cdea45c4be193bb';
    
        
        userEvent.type(login, loginExample);
        userEvent.type(password, passwordExample);
    
        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return {Digest: md5}
            }
        })
    
        userEvent.click(button);

        waitFor(() => {
            const message = screen.queryByText(`Jesteś zalogowany jako: ${loginExample}`);
            expect(message).not.toBeInTheDocument();
        });
       
});
});
