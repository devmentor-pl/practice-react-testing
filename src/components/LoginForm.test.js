import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CatchError } from "./CatchError";
import LoginForm from "./LoginForm";

xdescribe("<LoginForm>", () => {
  it("login-long value", async () => {
    render(<LoginForm />);

    const fieldLogin = await screen.findByRole("textbox", { name: /login/i });
    userEvent.type(fieldLogin, "userlogin");

    const error = screen.queryByText("The field is too short!");
    expect(error).toBeNull();
  });

  it("login-short value", async () => {
    render(<LoginForm />);

    const fieldLogin = await screen.findByRole("textbox", { name: /login/i });
    userEvent.type(fieldLogin, "log");

    const error = await screen.findByText("The field is too short!");
    expect(error).toBeInTheDocument();
  });

  it("submit", async () => {
    expect.assertions(1);
    const mock = jest.fn();
    mock.mockReturnValueOnce(false);

    render(
      <CatchError>
        <LoginForm tryAuth={mock} />
      </CatchError>
    );
    const button = await screen.findByRole("button");
    userEvent.click(button);
    const error = await screen.findByText("Error in script");
    expect(error).toBeInTheDocument();
  });
});
