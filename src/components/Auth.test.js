import { render, screen, waitFor } from "@testing-library/react";
import Auth from "./Auth";
import userEvent from "@testing-library/user-event";

const setup = () => {
    render(<Auth />);

    const loginElement = screen.getByLabelText(/login:/i);
    const passwordElement = screen.getByLabelText(/password:/i);
    const buttonElement = screen.getByRole('button', { name: /send/i });

    return {
        loginElement,
        passwordElement,
        buttonElement,
    };
};

describe('Auth', () => {
    beforeEach(() => {
        jest.spyOn(window, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({ Digest: '8ae75b43f70f20ba564200ef4ab63a33' }),
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should fields exist', async () => {
        const { loginElement, passwordElement } = setup();

        expect(loginElement).toBeInTheDocument();
        expect(passwordElement).toBeInTheDocument();
    });

    it('should log in', async () => {
        const { loginElement, passwordElement, buttonElement } = setup();

        userEvent.type(loginElement, 'jan@domena.pl');
        userEvent.type(passwordElement, 'janeczek');
        userEvent.click(buttonElement);

        await waitFor(() => {
        const info = screen.getByText(`Jesteś zalogowany jako: jan@domena.pl`);
        expect(info).toBeInTheDocument();
        });

        expect(window.fetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
        method: 'POST',
        body: 'janeczek',
        }));
    });

    it('should not log in with incorrect credentials', async () => {
        jest.spyOn(window, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => ({ Digest: 'wrongmd5value' }),
        });

        const { loginElement, passwordElement, buttonElement } = setup();

        userEvent.type(loginElement, 'jan@domena.pl');
        userEvent.type(passwordElement, 'wrongpassword');
        userEvent.click(buttonElement);

        await waitFor(() => {
        expect(screen.queryByText(`Jesteś zalogowany jako: jan@domena.pl`)).not.toBeInTheDocument();
        });
    });
});
