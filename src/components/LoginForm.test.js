import LoginForm from "./LoginForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("LoginForm tests", () => {
    test("check if login input exists", () => {
        render(<LoginForm />);

        const loginInput = screen.getByLabelText("login:");
        expect(loginInput).toBeInTheDocument();
    });

    test("check if password input exists", () => {
        render(<LoginForm />);

        const passwordInput = screen.getByLabelText("pasword:");

        expect(passwordInput).toBeInTheDocument();
    });

    test("Check if submit button exists", () => {
        render(<LoginForm />);

        const button = screen.getByRole("button", { name: /send/i });
        expect(button).toBeInTheDocument();
    });

    test("Check if error is rendered when login too short", () => {
        render(<LoginForm />);

        const loginInput = screen.getByLabelText("login:");
        userEvent.type(loginInput, "a");

        expect(
            screen.getByText(/The field is too short!/i)
        ).toBeInTheDocument();
    });

    test("Check if error is rendered when password too short", () => {
        render(<LoginForm />);

        const passwordInput = screen.getByLabelText("pasword:");
        userEvent.type(passwordInput, "b");

        expect(
            screen.getByText(/The field is too short!/i)
        ).toBeInTheDocument();
    });

    /*test("check if submit button submits the form on click when data is correct", () => {
        const authMock = jest.fn();
        authMock.mockReturnValue(true);

        render(<LoginForm tryAuth={authMock} />);

        const loginInput = screen.getByLabelText("login:");
        userEvent.type(loginInput, "adamkowalski");
        const passwordInput = screen.getByLabelText("pasword:");
        userEvent.type(passwordInput, "12345");

        const form = screen.getByTestId("form");
        const mockSubmit = jest.fn();
        mockSubmit.mockReturnValue(true);

        render(<form handleSubmit={mockSubmit}></form>);

        const submitButton = screen.getByRole("button", { name: /send/i });
        userEvent.click(submitButton);
        expect(mockSubmit).toHaveBeenCalled();
    });*/
    test("check if submit event will throw error if data is incorrect", () => {
        const authMock = jest.fn();
        authMock.mockReturnValue(true);

        render(<LoginForm tryAuth={authMock} />);

        const loginInput = screen.getByLabelText("login:");
        userEvent.type(loginInput, "adamkowalski");
        const passwordInput = screen.getByLabelText("pasword:");
        userEvent.type(passwordInput, "12345");

        const submitButton = screen.getByRole("button", { name: /send/i });

        userEvent.click(submitButton);

        expect(authMock).toBeCalled();
    });
    test("check if submit event will throw error if data is incorrect", () => {
        const authMock = jest.fn();
        authMock.mockReturnValue(false);

        render(<LoginForm tryAuth={authMock} />);

        const loginInput = screen.getByLabelText("login:");
        userEvent.type(loginInput, "adamkowalski");
        const passwordInput = screen.getByLabelText("pasword:");
        userEvent.type(passwordInput, "12345");

        const submitButton = screen.getByRole("button", { name: /send/i });

        expect(() => userEvent.click(submitButton)).toThrow("Incorrect data!");
    });
});
