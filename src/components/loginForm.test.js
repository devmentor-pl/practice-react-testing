import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CatchError from "../components/CatchError";
import LoginForm from "./LoginForm";

describe("<LoginForm>", () => {
  test("value of input is too short", async () => {
    render(<LoginForm />);

    const loginInput = await screen.findByRole("textbox", { name: /login/i });
    userEvent.type(loginInput, "gg");
    const error = await screen.findByText("The field is too short!");
    expect(error).toBeInTheDocument();
  });
  test("value of input is valid", async () => {
    render(<LoginForm />);

    const loginInput = await screen.findByRole("textbox", { name: /login/i });
    userEvent.type(loginInput, "ggdddd");
    const error = screen.queryByText("The field is too short!");
    expect(error).toBeNull();
  });
  test("submit of form - correct data", async () => {
    const mock = jest.fn();
    mock.mockReturnValueOnce(false);
    render(
      <CatchError>
        <LoginForm tryAuth={mock} />
      </CatchError>
    );
    const button = await screen.findByRole("button");
    userEvent.click(button);
    const error = await screen.findByText("Something went wrong");
    expect(error).toBeInTheDocument();
  });
});
