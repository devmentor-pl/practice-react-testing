import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Auth from "./Auth";

const setup = () => {
  render(<Auth />);

  const login = screen.getByRole("textbox", { name: /login/i });
  const password = screen.getByRole("textbox", { name: /password/i });
  const button = screen.getByRole("button");

  return { login, password, button };
};

describe("<Autih/>", () => {
  it("exists fields", async () => {
    const { login, password, button } = setup();

    expect(login).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  it("check possibility to log in", async () => {
    const { login, password, button } = setup();

    const loginValue = "jan@domena.pl";
    const passwordValue = "janeczek";
    const md5 = "8ae75b43f70f20ba564200ef4ab63a33";

    const spy = jest.spyOn(window, "fetch");

    window.fetch.mockResolvedValue({
      ok: true,
      json: async () => {
        return { Digest: md5 };
      },
    });

    userEvent.type(login, loginValue);
    userEvent.type(password, passwordValue);
    userEvent.click(button);
    const info = await screen.findByText(
      `Jesteś zalogowany jako: ${loginValue}`
    );

    expect(info).toBeInTheDocument();
    spy.mockClear();
  });

  it("check block to log in", async () => {
    const { login, password, button } = setup();

    const loginValue = "jan@domena.pl";
    const passwordValue = "janeczek";
    const md5 = "8ae75b43f70f20ba564200ef4ab63a333";

    const spy = jest.spyOn(window, "fetch");

    window.fetch.mockResolvedValue({
      ok: true,
      json: async () => {
        return { Digest: md5 };
      },
    });

    userEvent.type(login, loginValue);
    userEvent.type(password, passwordValue);
    userEvent.click(button);
    const info = screen.queryByText(`Jesteś zalogowany jako: ${loginValue}`);

    expect(info).not.toBeInTheDocument();
    spy.mockClear();
  });
});
