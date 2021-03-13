
import LoginForm from '../components/LoginForm';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe("LoginForm tests", () => {


    it('check in label is login', () => {
        render(<LoginForm />);
        const loginLabel = screen.getByLabelText('login:');
        expect(loginLabel).toBeInTheDocument();
     });
    
    it('check in label is password', () => {
        render(<LoginForm />);
        const passwordLabel = screen.getByLabelText('password:');
        expect(passwordLabel).toBeInTheDocument();
     });
    
     
     const setup = () => {
        const utils = render(<LoginForm />)
        const input = utils.getByLabelText('login:')
        return {
          input,
          ...utils,
        }
      }
    
    it('input login should have string of letter characters', () => {
        const { input } = setup()
        fireEvent.change(input, { target: { value: 'ola' } })
        expect(input.value).toBe('ola')
    })
    
    it('throw error when password is incorrect', async () => {
        render(<LoginForm />);
        const passwordInput = screen.getByLabelText('password:');
        userEvent.type(passwordInput, 'we');
        const error = await screen.findByText('The field is too short!');
        expect(error).toBeInTheDocument();
    });
    

    const myMockFn = jest.fn()
    /* to chyba bez sensu?*/
    it('The mock function was not called at least once', async () => {
        render(<LoginForm />);
        expect(myMockFn.mock.calls.length).toBeLessThan(1);
    });
    

})