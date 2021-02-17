import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { md5ProviderFetchResolvedOnce } from "../testUtils/utils";
import Auth from "./Auth";

const userPasswordMd5Value = "8ae75b43f70f20ba564200ef4ab63a33";

jest.spyOn(window, "fetch");

describe("Auth", () => {
  test("user is authenticated", async () => {
    const login = "jan@domena.pl";
    const password = "janeczek";

    md5ProviderFetchResolvedOnce(window.fetch, userPasswordMd5Value);

    render(<Auth />);

    const loginInput = screen.getByLabelText(/login/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const button = screen.getByRole("button", { name: /send/i });

    userEvent.type(loginInput, login);
    userEvent.type(passwordInput, password);

    await act(async () => {
      await userEvent.click(button);
    });

    const text = await screen.findByText(`Jesteś zalogowany jako: ${login}`);

    expect(text).toBeInTheDocument();
  });

  test("user with wrong credentials is not authenticated", async () => {
    const login = "wrongLogin";
    const password = "wrongPassword";
    const passwordMd5 = "8e8210c8d03064930e4ee7f2f1f6e2c2";

    md5ProviderFetchResolvedOnce(window.fetch, passwordMd5);

    render(<Auth />);

    const loginInput = screen.getByLabelText(/login/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const button = screen.getByRole("button", { name: /send/i });

    userEvent.type(loginInput, login);
    userEvent.type(passwordInput, password);

    await act(async () => {
      await userEvent.click(button);
    });

    const text = screen.queryByText(`Jesteś zalogowany jako: ${login}`);

    expect(text).not.toBeInTheDocument();
  });
});
