import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LoginForm from "./LoginForm";
import Catcher from "./Catcher";

describe("<LoginForm>", () => {
  it("login input long value", async () => {
    render(<LoginForm />);

    const loginField = await screen.findByRole("textbox", { name: /login/i });
    userEvent.type(loginField, "asdasdasd");

    const error = screen.queryByText("The field is too short!");
    expect(error).toBeNull();
  });

  it("login short long value", async () => {
    render(<LoginForm />);

    const loginField = await screen.findByRole("textbox", { name: /login/i });
    userEvent.type(loginField, "aa");

    const error = await screen.findByText("The field is too short!");
    expect(error).toBeInTheDocument();
  });

  it("password input long value", async () => {
    render(<LoginForm />);

    const passwordField = await screen.findByRole("textbox", {
      name: /password/i,
    });
    console.log(passwordField);
    userEvent.type(passwordField, "asdasdasd");

    const error = screen.queryByText("The field is too short!");
    expect(error).toBeNull();
  });

  it("password short long value", async () => {
    render(<LoginForm />);

    const passwordField = await screen.findByRole("textbox", {
      name: /password/i,
    });
    userEvent.type(passwordField, "aa");

    const error = await screen.findByText("The field is too short!");
    expect(error).toBeInTheDocument();
  });

  it("submit incorrect data", async () => {
    const mock = jest.fn();
    mock.mockReturnValueOnce(false);

    render(
      <Catcher>
        <LoginForm tryAuth={mock} />
      </Catcher>
    );
    const button = await screen.findByRole("button");

    userEvent.click(button);

    const error = await screen.findByText("BŁĄÐ!");
    expect(error).toBeInTheDocument();
  });
});
