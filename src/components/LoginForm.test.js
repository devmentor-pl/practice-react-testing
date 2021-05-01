import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CatchError from "./CatchError";
import LoginForm from "./LoginForm";

describe('LoginForm tests suite', () => {
    test('no errors on correct login and password submission', () => {
        const tryAuthMock = jest.fn()
        tryAuthMock.mockReturnValue(true)
    
        const login = 'correctLogin'
        const password = 'correctPassword'
    
        render(<LoginForm tryAuth={tryAuthMock} />)
    
        const loginEl = screen.getByLabelText(/login/i)
        const passwordEl = screen.getByLabelText(/pasword/i)
        const submitEl = screen.getByRole("button", { name: /send/i })
    
        userEvent.type(loginEl, login)
        userEvent.type(passwordEl, password)
        userEvent.click(submitEl)
    
        expect(loginEl).toBeInTheDocument()
        expect(passwordEl).toBeInTheDocument()
        expect(submitEl).toBeInTheDocument()
        expect(tryAuthMock).toBeCalledWith(login, password)
      })
      
    test('errors on incorrect login or password submission', async () => {
        const tryAuthMock = jest.fn()
        tryAuthMock.mockRejectedValue(false)
    
        const login = ''
        const password = ''
    
        render(
          <CatchError>
            <LoginForm tryAuth={tryAuthMock} />
          </CatchError>
        );
    
        const loginEl = screen.getByLabelText(/login/i)
        const passwordEl = screen.getByLabelText(/pasword/i)
        const submitEl = screen.getByRole("button", { name: /send/i })

        userEvent.type(loginEl, login)
        userEvent.type(passwordEl, password)
        userEvent.click(submitEl)

        const errorMsg = await screen.findByText(/incorrect data/i)

        expect(loginEl).not.toBeInTheDocument()
        expect(passwordEl).not.toBeInTheDocument()
        expect(submitEl).not.toBeInTheDocument()
        expect(errorMsg).toBeInTheDocument();
        expect(tryAuthMock).toBeCalledWith(login, password)
      })
  
   test('error on too short login displayed', async () => {
        render(<LoginForm />)
        const loginEl = screen.getByLabelText(/login/i)
        userEvent.type(loginEl, '12');
        const error = await screen.findByText('The field is too short!');

        expect(error).toBeInTheDocument();
      })

   test('error on too short password displayed', async () => {
        render(<LoginForm />)
        const passwordEl = screen.getByLabelText(/pasword/i)
        userEvent.type(passwordEl, '12');
        const error = await screen.findByText('The field is too short!');
        
        expect(error).toBeInTheDocument();
      })
})