import LoginForm from "./LoginForm";
import CatchError from "./CatchError";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("<LoginForm>", () => {
	test("should render form elements", () => {
		const mockAuth = jest.fn(() => true);
		render(<LoginForm tryAuth={mockAuth} />);
		const loginInput = screen.getByRole("textbox", { name: "login:" });
		expect(loginInput).toBeInTheDocument();
		const passwordInput = screen.getByRole("textbox", { name: "password:" });
		expect(passwordInput).toBeInTheDocument();
		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
	});

	test("should render 2 errors when each input value length is less or equal 3", () => {
		const mockAuth = jest.fn(() => false);
		render(<LoginForm tryAuth={mockAuth} />);
		const loginInput = screen.getByRole("textbox", { name: "login:" });
		const passwordInput = screen.getByRole("textbox", { name: "password:" });
		const loginText = "abc";
		const passwordText = "def";
		userEvent.type(loginInput, loginText);
		userEvent.type(passwordInput, passwordText);
		const errors = screen.getAllByText("The field is too short!");
		expect(errors).toHaveLength(2);
	});

	test("should submit form with correct input values", () => {
		const mockAuth = jest.fn(() => true);
		render(<LoginForm tryAuth={mockAuth} />);
		const loginInput = screen.getByRole("textbox", { name: "login:" });
		const passwordInput = screen.getByRole("textbox", { name: "password:" });
		const loginText = "abcdef";
		const passwordText = "ghijkl";
		userEvent.type(loginInput, loginText);
		userEvent.type(passwordInput, passwordText);
		mockAuth.mockReturnValueOnce(true);
		const button = screen.getByRole("button");
		userEvent.click(button);
		expect(mockAuth).toBeCalled();
	});

	test("should render error text when submitted with wrong input values", async () => {
		const mockAuth = jest.fn();
		render(
			<CatchError>
				<LoginForm tryAuth={mockAuth} />
			</CatchError>
		);
		const loginInput = screen.getByRole("textbox", { name: "login:" });
		const passwordInput = screen.getByRole("textbox", { name: "password:" });
		const loginText = "abc";
		const passwordText = "def";
		userEvent.type(loginInput, loginText);
		userEvent.type(passwordInput, passwordText);
		const button = screen.getByRole("button");
		userEvent.click(button);
		const error = await screen.findByText("Incorrect data");
		expect(error).toBeInTheDocument();
	});
});
