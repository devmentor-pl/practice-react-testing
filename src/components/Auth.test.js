import Auth from "./Auth";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("LoginForm tests", () => {
    jest.spyOn(window, "fetch");
    it("user logged in", async () => {
        render(<Auth />);

        const login = "jan@domena.pl";
        const password = "janeczek";

        const loginInput = screen.getByLabelText("login:");
        userEvent.type(loginInput, login);
        const passwordInput = screen.getByLabelText("pasword:");
        userEvent.type(passwordInput, password);

        const hashPassword = "8ae75b43f70f20ba564200ef4ab63a33";

        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return { data: hashPassword };
            },
        });

        const submitButton = screen.getByRole("button", { name: /send/i });

        userEvent.click(submitButton);

        const loggedinMsg = `Jesteś zalogowany jako: ${login}`;

        waitFor(() => expect(loggedinMsg).toBeInTheDocument());
    });
    it("user not logged in", async () => {
        // niewazne co w tym tescie jest napisane i tak zawsze przechodzi czy not, czy toBeInTheDocument czy nawet jak skasuje polowe rzeczy... ? //
        render(<Auth />);

        const login = "anna@domena.pl";
        const password = "annuszka";

        const loginInput = screen.getByLabelText("login:");
        userEvent.type(loginInput, login);
        const passwordInput = screen.getByLabelText("pasword:");
        userEvent.type(passwordInput, password);

        window.fetch.mockResolvedValueOnce("error");

        const submitButton = screen.getByRole("button", { name: /send/i });

        userEvent.click(submitButton);

        const loggedinMsg = `Jesteś zalogowany jako: ${login}`;

        waitFor(() => expect(loggedinMsg).not.toBeInTheDocument());
    });
});
