import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LoginForm from './LoginForm.js';
import CatchError from './CatchError';

describe('LoginForm', () => {
    test('check if login field exist', ()=>{
        render(<LoginForm/>) 

        const login = screen.getByLabelText(/login:/i);
        expect(login).toBeInTheDocument();
    });
  
    test('check if password field exist', ()=>{
        render(<LoginForm/>) 

        const password = screen.getByLabelText(/password:/i);
        expect(password).toBeTruthy();
    });

    test('check if button tag exist', ()=>{
        render(<LoginForm/>) 

        const button = screen.getByRole('button', {name: 'send'} );
        expect(button).toBeInTheDocument();
    });

    test('check if login has appropriate length', ()=>{
        render(<LoginForm/>) 

        const login = screen.getByLabelText(/login:/i);
        userEvent.type(login, 'mk')

        const info = screen.getByText(/The field is too short!/i);
        expect(info).toBeInTheDocument();
    });

    test('check if password has appropriate length', ()=>{
        render(<LoginForm/>) 

        const password = screen.getByLabelText(/password:/i);
        userEvent.type(password, '1')

        const info = screen.getByText(/The field is too short!/i);
        expect(info).toBeInTheDocument();
    });

    test('should throw an error when login and password have not appropriate length', async () =>{
        const mockFn = jest.fn();
        mockFn.mockReturnValue(false);
        
        render(<LoginForm tryAuth={mockFn}/>);
        
        const login = screen.getByLabelText(/login:/i);
        userEvent.type(login, 'mk');

        const password = screen.getByLabelText(/password:/i);
        userEvent.type(password, '123');

        expect(()=> {
            const button = screen.getByRole('button', {name: /send/i});
            userEvent.click(button); 
        }).toThrow('Incorrect data!');
    });

    test('should throw an error when login and password have not appropriate length no.2', async () =>{
        const mockFn = jest.fn();
        mockFn.mockReturnValue(false);
        
        render(<CatchError><LoginForm tryAuth={mockFn}/></CatchError>);
        
        await waitFor(()=> {
            const button = screen.getByRole('button', {name: /send/i});
            userEvent.click(button); 
        });

        const info = screen.getByText('Incorrect data!');
        expect(info).toBeInTheDocument();
    })
})