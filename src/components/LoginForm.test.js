import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  test("submit throws error if empty login and password are given", () => {
    const tryAuthMock = jest.fn();
    tryAuthMock.mockReturnValue(false);

    render(<LoginForm tryAuth={tryAuthMock} />);

    const submitButton = screen.getByRole("button", { name: /send/i });

    expect(() => {
      userEvent.click(submitButton);
    }).toThrowError();

    expect(tryAuthMock).toBeCalledWith("", "");
  });

  test("submit throws no error if login and password are correct", () => {
    const tryAuthMock = jest.fn();
    tryAuthMock.mockReturnValue(true);

    const correctLogin = "login";
    const correctPassword = "correctPassword";

    render(<LoginForm tryAuth={tryAuthMock} />);

    const loginInput = screen.getByLabelText(/login/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /send/i });

    userEvent.type(loginInput, correctLogin);
    userEvent.type(passwordInput, correctPassword);

    userEvent.click(submitButton);

    expect(loginInput).toBeInTheDocument();
    expect(tryAuthMock).toBeCalledWith(correctLogin, correctPassword);
  });

  test("submit throws no error if login and password are correct and tryAuth is async", async () => {
    const tryAuthMockPromise = jest.fn();
    tryAuthMockPromise.mockResolvedValue(true);

    const correctLogin = "correctLogin";
    const correctPassword = "correctPassword";

    render(<LoginForm tryAuth={tryAuthMockPromise} />);

    const loginInput = screen.getByLabelText(/login/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /send/i });

    userEvent.type(loginInput, correctLogin);
    userEvent.type(passwordInput, correctPassword);

    await userEvent.click(submitButton);

    expect(await screen.findByLabelText(/login/i)).toBeInTheDocument();
    expect(tryAuthMockPromise).toBeCalledWith(correctLogin, correctPassword);
  });

  test("submit throws error if login is too short", async () => {
    const tryAuthMockPromise = jest.fn();
    tryAuthMockPromise.mockRejectedValue(false);

    const wrongLogin = "123";
    const correctPassword = "correctPassword";

    render(<LoginForm tryAuth={tryAuthMockPromise} />);

    const loginInput = screen.getByLabelText(/login/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /send/i });

    userEvent.type(loginInput, wrongLogin);
    userEvent.type(passwordInput, correctPassword);

    expect(() => {
      userEvent.click(submitButton);
    }).toThrowError();

    expect(tryAuthMockPromise).toBeCalledWith(wrongLogin, correctPassword);
  });
});
