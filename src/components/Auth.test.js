import React from 'react';
import { render, fireEvent, waitFor,screen } from '@testing-library/react';
import Auth from './Auth';

jest.mock('./LoginForm', () => {
    return {
      __esModule: true,
      default: jest.fn(() => <div data-testid="login-form">LoginForm</div>),
    };
  });
  
  
  describe('Auth component', () => {
    it('should renders LoginForm when user is not authenticated', () => {
        render(<Auth />);
        expect(screen.getByTestId('login-form')).toBeInTheDocument();
    });

    it('should renders user information when authenticated', async () => {
        const originalUsers = global.users;
        global.users = [
          {
            login: 'jan@domena.pl',
            password: '8ae75b43f70f20ba564200ef4ab63a33',
          },
          {
            login: 'marcin@domena.pl',
            password: 'c5450079ce3aa5440cdea45c4be193bb',
          },
        ];
    
        render(<Auth />);
        const loginInput = screen.getByLabelText(/login/i);
        const passwordInput = screen.getByLabelText(/password/i);
    
        fireEvent.change(loginInput, { target: { value: 'jan@domena.pl' } });
        fireEvent.change(passwordInput, { target: { value: 'janeczek' } });
    
        const submitButton = screen.getByTestId('login-form-button');
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Jesteś zalogowany jako: jan@domena.pl')).toBeInTheDocument();
          });
          
        await waitFor(() => {
            expect(screen.queryByTestId('login-form')).not.toBeInTheDocument();
          });
    
        global.users = originalUsers;
      }); 
});