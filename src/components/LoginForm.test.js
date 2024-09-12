import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';
import CatchError from '../CatchError';

const mockTryAuth = jest.fn()

describe('LoginForm', () => {
    it('should find form elements after render', () => {
        render(<LoginForm/>);

        //nie rozumiem dlaczego 'password:' a nie 'password'; 
        const loginInput = screen.getByRole('textbox', {name: 'password:'});
        const passwordInput = screen.getByRole('textbox', {name: 'login:'});
        const submitButton = screen.getByRole('button', {name: 'send'});
        expect(loginInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();

        expect(mockTryAuth).not.toHaveBeenCalled();
    });
    describe('successful scenarios', () => {
        it('should call mockTryAuth function with correct arguments', () => {
            render(<LoginForm tryAuth={mockTryAuth}/>);
            const username = 'testuser';
            const password = 'testpassword';
            const loginInput = screen.getByText('login:');
            const passwordInput = screen.getByText('password:');
    
            const submitButton = screen.getByText('send');
            userEvent.type(loginInput, username);
            userEvent.type(passwordInput, password);
            mockTryAuth.mockReturnValueOnce(true);
            userEvent.click(submitButton);
            expect(mockTryAuth).toHaveBeenCalled();
            expect(mockTryAuth).toHaveBeenCalledWith(username, password);
        });
    })
    describe('failed scenarios', () => {
        it('should find two warnings if both login and password are too short', () => {
            render(<LoginForm tryAuth={mockTryAuth}/>);
            const username = 'abc';
            const password = 'def';
            const loginInput = screen.getByText('login:');
            const passwordInput = screen.getByText('password:');
            
            userEvent.type(loginInput, username);
            userEvent.type(passwordInput, password);
            const errors = screen.queryAllByText('The field is too short!');
    
            expect(errors).toHaveLength(2)
        });
        it('should render `Incorrect data!` when submited with too short parameters', async () => {
            const mockTryAuth = jest.fn(() => false);
            const spy = jest.spyOn(console, 'error')
            render(<CatchError>
                <LoginForm tryAuth={mockTryAuth}/>
            </CatchError>);
            const username = 'abc';
            const password = 'def';
            const loginInput = screen.getByText('login:');
            const passwordInput = screen.getByText('password:');
            const submitButton = screen.getByRole('button',{name: 'send'});
            
            userEvent.type(loginInput, username);
            userEvent.type(passwordInput, password);
            userEvent.click(submitButton)
    
            expect(spy).toHaveBeenCalled();
            
            await waitFor(() => screen.findByText('Incorrect data!'));
    
            expect(screen.getByText('Incorrect data!')).toBeInTheDocument()
        });
    })
})