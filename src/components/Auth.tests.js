import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Auth from './Auth';

function setup() {
    render(<Auth />);

    const loginInput = screen.getByLabelText(/login:/i);
    const passwordInput = screen.getByLabelText(/password:/i);
    const button = screen.getByRole('button', { name: 'send' });

    return { loginInput, passwordInput, button };
}

describe('Auth', () => {
    it('should render welcome message after successful login', async () => {
        const login = 'jan@domena.pl';
        const password = 'janeczek';
        const hash = '8ae75b43f70f20ba564200ef4ab63a33';

        const spy = jest.spyOn(window, 'fetch');

        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return { Digest: hash };
            },
        });

        const { loginInput, passwordInput, button } = setup();

        userEvent.type(loginInput, login);
        userEvent.type(passwordInput, password);
        userEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText(`Jesteś zalogowany jako: ${login}`)).toBeInTheDocument();
        });

        spy.mockRestore();
    });

    it('should fail to log', async () => {
      const login = 'jan@domena.pl';
      const password = 'wrong password';
      const hash = 'wrong hash';

      const spy = jest.spyOn(window, 'fetch');

      window.fetch.mockResolvedValueOnce({
          ok: true,
          json: async () => {
              return { Digest: hash };
          },
      });

      const { loginInput, passwordInput, button } = setup();

      userEvent.type(loginInput, login);
      userEvent.type(passwordInput, password);
      userEvent.click(button);

      await waitFor(() => {
          expect(screen.queryByText(`Jesteś zalogowany jako: ${login}`)).not.toBeInTheDocument();
      });

      spy.mockRestore();
  });
});
