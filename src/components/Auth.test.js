import { getByLabelText, render, screen } from '@testing-library/react';
import { md5FetchResolvedOnce } from '../testUtils';
import { getMd5 } from './../providers/md5Provider';

import Auth from './Auth'

jest.spyOn(getMd5);

const setup = () => {
    const auth = render(<Auth />);
    return { auth };
};

describe('<Auth />', () => {
    test('should render login field and password field', () => {
        setup();

        const loginField = screen.getByText(/login/);
        const passwordField = screen.getByText(/pasword/);
        
        expect(loginField).toBeInTheDocument();
        expect(passwordField).toBeInTheDocument();
    })
    
    test('should log in user with correct credentials', () => {
        render(<Auth />);

        
    })
    
})

