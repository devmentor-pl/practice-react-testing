import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Auth from '../Auth';

jest.spyOn(window, 'fetch');

describe('Auth component', () => {
    it('should contain password and login input', () => {
        render(<Auth />);
        const loginElement = screen.getByText(/login:/i);
        const passwordElement = screen.getByText(/password:/i);
        expect(loginElement).toBeInTheDocument();
        expect(passwordElement).toBeInTheDocument();
    });
    it('should throw error when password or login are too short', async () => {
        render(<Auth />)

        const loginElement = screen.getByText(/login:/i);
        const passwordElement = screen.getByText(/password:/i);
        userEvent.type(loginElement, 'Ola');
        userEvent.type(passwordElement, 'ola');

        const error = await screen.findAllByText(/The field is too short/i);
        await expect(error).toHaveLength(2);
    });
    it('should login user when data is correct', async () => {
        render(<Auth />);

        const loginElement = screen.getByLabelText(/login:/i);
        const passwordElement = screen.getByLabelText(/password:/i);
        const buttonElement = screen.getByRole('button', { name: /send/i });
        const passwordCode = 'c5450079ce3aa5440cdea45c4be193bb';

        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return { Digest: passwordCode };
            }
        });

        userEvent.type(loginElement, 'marcin@domena.pl');
        userEvent.type(passwordElement, 'marcinek');
        userEvent.click(buttonElement);

        const confirm = await screen.findByText(/Jesteś zalogowany jako: marcin@domena.pl/i);
        expect(confirm).toBeInTheDocument();
    });
    it('should not login user when data are incorrect', async () => {
        render(<Auth />);

        const loginElement = screen.getByLabelText(/login:/i);
        const passwordElement = screen.getByLabelText(/password:/i);
        const buttonElement = screen.getByRole('button', { name: /send/i });
        const passwordCode = 'c5450079ce3aa5440cdea45c4be193bb';

        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return { Digest: passwordCode };
            }
        });

        const user = 'filip.drzazga@gmail.com'
        userEvent.type(loginElement, 'filip.drzazga@gmail.com');
        userEvent.type(passwordElement, 'filip');
        userEvent.click(buttonElement);

        const information = screen.queryByText(`Jesteś zalogowany jako: ${user}`);
        expect(information).not.toBeInTheDocument();
    });
});
