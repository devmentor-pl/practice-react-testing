import Auth from "./Auth";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("LoginForm tests", () => {
    jest.spyOn(window, "fetch");
    it("user logged in", async () => {
        expect.assertions(1);

        const login = "jan@domena.pl";
        const password = "janeczek";
        const md5 = "8ae75b43f70f20ba564200ef4ab63a33";

        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return { Digest: md5 };
            },
        });

        render(<Auth />);

        const loginInput = screen.getByLabelText("login:");
        userEvent.type(loginInput, login);
        const passwordInput = screen.getByLabelText("pasword:");
        userEvent.type(passwordInput, password);

        const submitButton = screen.getByRole("button", { name: /send/i });

        userEvent.click(submitButton);

        await waitFor(() => {
            const response = screen.queryByText(
                `Jesteś zalogowany jako: ${login}`
            );
            expect(response).not.toBeInTheDocument();
        });
    });
    it("user not logged in", async () => {
        expect.assertions(1);

        const loginExample = "marcin@domena.pl";
        const passwordExample = "wrongPassword";
        const md5 = "c5450079ce3aa5440cdea45c4be193bb";

        window.fetch.mockResolvedValue({
            ok: true,
            json: async () => {
                return { Digest: md5 };
            },
        });

        render(<Auth />);

        const loginInput = screen.getByLabelText("login:");
        userEvent.type(loginInput, loginExample);
        const passwordInput = screen.getByLabelText("pasword:");
        userEvent.type(passwordInput, passwordExample);

        const submitButton = screen.getByRole("button", { name: /send/i });

        userEvent.click(submitButton);

        await waitFor(() => {
            const response = screen.queryByText(
                `Jesteś zalogowany jako: ${loginExample}`
            );
            expect(response).not.toBeInTheDocument();
        });
    });
});
