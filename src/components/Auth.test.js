import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { md5FetchResolvedOnce } from '../testUtils';

import Auth from './Auth'

jest.spyOn(window, 'fetch');

const setup = () => {
    const auth = render(<Auth />);
    const loginField = screen.getByText(/login/);
	const passwordField = screen.getByText(/pasword/);
    const submitButton = screen.getByRole('button', { name: 'send' });
    return { ...auth, loginField, passwordField, submitButton };
};

describe('<Auth />', () => {
    test('should render login field and password field', () => {
        const { loginField, passwordField } = setup();
        
        expect(loginField).toBeInTheDocument();
        expect(passwordField).toBeInTheDocument();
    })
    
    test('should log in user with correct credentials', async () => {
        const { loginField, passwordField, submitButton } = setup();
        
        const login = 'jan@domena.pl';
        const password = 'janeczek';
        const encryptedPass = '8ae75b43f70f20ba564200ef4ab63a33';
        
        md5FetchResolvedOnce(window.fetch, encryptedPass);

        userEvent.type(loginField, login);
        userEvent.type(passwordField, password);
        userEvent.click(submitButton);
        
        const userLoggedIn = await screen.findByText(`Jesteś zalogowany jako: ${login}`);
        
        expect(userLoggedIn).toBeInTheDocument();
        expect(window.fetch).toHaveBeenCalled()
        expect(window.fetch).toHaveBeenCalledWith(
            'https://api.hashify.net/hash/md5/hex',
			{
                method: 'POST',
				body: password,
			}
            );
        })
        
        test('should NOT log user in with incorrect credentials', () => {
        const { loginField, passwordField, submitButton } = setup();
            
        const login = 'login';
		const password = 'password';

        md5FetchResolvedOnce(window.fetch, password);

        userEvent.type(loginField, login);
		userEvent.type(passwordField, password);
		userEvent.click(submitButton);
        
        const userLoggedIn = screen.queryByText(/zalogowany/gi);
        
        expect(userLoggedIn).not.toBeInTheDocument();
        expect(window.fetch).toHaveBeenCalledTimes(1);
		expect(window.fetch).toHaveBeenCalledWith(
			'https://api.hashify.net/hash/md5/hex',
			{
				method: 'POST',
				body: password,
			}
		);
    })
});

