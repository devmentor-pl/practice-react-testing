import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Auth from "./Auth";

describe("<Auth>", () => {
  test("input -> user1", async () => {
    const loginText = "jan@domena.pl";
    const passwordText = "janeczek";
    const md5 = "8ae75b43f70f20ba564200ef4ab63a33";

    const spy = jest.spyOn(window, "fetch");
    window.fetch.mockResolvedValue({
      ok: true,
      json: async () => {
        return { Digest: md5 };
      },
    });
    render(<Auth />);
    const loginInput = await screen.findByRole("textbox", { name: /login/i });
    userEvent.type(loginInput, loginText);
    const passwordInput = await screen.findByRole("textbox", {
      name: /password/i,
    });
    userEvent.type(passwordInput, passwordText);

    const button = await screen.findByRole("button");
    userEvent.click(button);

    await waitFor(async () => {
      const message = screen.queryByText(
        `Jesteś zalogowany jako: ${loginText}`
      );
      expect(message).toBeInTheDocument();
    });

    spy.mockClear();
  });

  test("input -> user2", async () => {
    const loginText = "marcin@domena.pl";
    const passwordText = "marcinek";
    const md5 = "c5450079ce3aa5440cdea45c4be193bb";

    const spy = jest.spyOn(window, "fetch");
    window.fetch.mockResolvedValue({
      ok: true,
      json: async () => {
        return { Digest: md5 };
      },
    });
    render(<Auth />);
    const loginInput = await screen.findByRole("textbox", { name: /login/i });
    userEvent.type(loginInput, loginText);
    const passwordInput = await screen.findByRole("textbox", {
      name: /password/i,
    });
    userEvent.type(passwordInput, passwordText);

    const button = await screen.findByRole("button");
    userEvent.click(button);

    await waitFor(async () => {
      const message = screen.queryByText(
        `Jesteś zalogowany jako: ${loginText}`
      );
      expect(message).toBeInTheDocument();
    });

    spy.mockClear();
  });
});
