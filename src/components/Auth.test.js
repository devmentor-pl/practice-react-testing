import Auth from "./Auth";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";

describe("Auth component", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	jest.spyOn(window, "fetch");

	test("should log in when login and password are correct", async () => {
		render(<Auth />);
		const loginInput = screen.getByRole("textbox", { name: "login:" });
		const passwordInput = screen.getByRole("textbox", { name: "password:" });
		const submitButton = screen.getByRole("button");

		const login = "jan@domena.pl";
		const password = "janeczek";
		const hashPassword = "8ae75b43f70f20ba564200ef4ab63a33";

		window.fetch.mockResolvedValueOnce({
			ok: true,
			json: async () => {
				return { Digest: hashPassword };
			},
		});

		userEvent.type(loginInput, login);
		userEvent.type(passwordInput, password);
		userEvent.click(submitButton);

		const loggedText = await screen.findByText(
			"Jesteś zalogowany jako: jan@domena.pl"
		);
		expect(loginInput).not.toBeInTheDocument();
		expect(passwordInput).not.toBeInTheDocument();
		expect(loggedText).toBeInTheDocument();
	});

	test("should not log in when password is wrong", () => {
		render(<Auth />);
		const loginInput = screen.getByRole("textbox", { name: "login:" });
		const passwordInput = screen.getByRole("textbox", { name: "password:" });
		const submitButton = screen.getByRole("button");

		const login = "jan@domena.pl";
		const password = "janeczek123";
		const hashPassword = "8ae75b43f70f20ba564200ef4ab63a33no";

		window.fetch.mockResolvedValueOnce({
			ok: true,
			json: async () => {
				return { Digest: hashPassword };
			},
		});

		userEvent.type(loginInput, login);
		userEvent.type(passwordInput, password);
		userEvent.click(submitButton);
		const loggedText = "Jesteś zalogowany jako: jan@domena.pl";
		expect(loginInput).toBeInTheDocument();
		expect(passwordInput).toBeInTheDocument();
		expect(screen.queryByText(loggedText)).not.toBeInTheDocument();
	});
});
