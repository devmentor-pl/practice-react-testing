import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";
import CatchError from "./CatchError";

describe("<LoginForm>", () => {
  it("login input - long value", async () => {
    render(<LoginForm />);
    const fieldLogin = await screen.findByRole("textbox", { name: /login/i });
    userEvent.type(fieldLogin, "abcdef");
    const error = screen.queryByText("The field is too short!");
    expect(error).toBeNull();
  });
  it("login input - short value", async () => {
    render(<LoginForm />);
    const fieldLogin = await screen.findByRole("textbox", { name: /login/i });
    userEvent.type(fieldLogin, "ab");
    const error = screen.queryByText("The field is too short!");
    expect(error).toBeInTheDocument();
  });
  it("password input - long value", async () => {
    render(<LoginForm />);
    const fieldPassword = await screen.findByRole("textbox", {
      name: /password/i,
    });
    userEvent.type(fieldPassword, "abcdef");
    const error = screen.queryByText("The field is too short!");
    expect(error).toBeNull();
  });
  it("password input - short value", async () => {
    render(<LoginForm />);
    const fieldPassword = await screen.findByRole("textbox", {
      name: /password/i,
    });
    userEvent.type(fieldPassword, "ab");
    const error = screen.queryByText("The field is too short!");
    expect(error).toBeInTheDocument();
  });
  it("send button", async () => {
    render(<LoginForm />);
    const sendButton = await screen.findByRole("button", {
      name: "send",
    });
    expect(sendButton).toBeInTheDocument();
  });
  it("button send - bad values", async () => {
    const mock = jest.fn;
    mock.mockReturnValueOnce(false);
    render(<LoginForm tryAuth={mock} />);

    const sendButton = await screen.findByRole("button", {
      name: "send",
    });
    fireEvent.click(sendButton);
    const error = await screen.findByText("Something went wrong");
    expect(error).toBeInTheDocument();
  });
});
