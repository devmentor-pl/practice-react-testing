import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Auth from "./Auth";

const setup = () => {
  render(<Auth />);

  const loginElement = screen.getByRole("textbox", { name: /login/i });
  const passwordElement = screen.getByRole("textbox", { name: /password/i });
  const buttonElement = screen.getByRole("button");

  return { loginElement, passwordElement, buttonElement };
};

describe("<Auth>", () => {
  it("should field exists", () => {
    const { loginElement, passwordElement } = setup();

    expect(loginElement).toBeInTheDocument;
    expect(passwordElement).toBeInTheDocument;
  });

  it("should log in", async () => {
    const { loginElement, passwordElement, buttonElement } = setup();

    const login = "jan@domena.pl";
    const password = "janeczek";
    const md5 = "8ae75b43f70f20ba564200ef4ab63a33";

    const spy = jest.spyOn(window, "fetch");

    window.fetch.mockResolvedValue({
      ok: true,
      json: async () => {
        return { Digest: md5 };
      },
    });

    userEvent.type(loginElement, login);
    userEvent.type(passwordElement, password);
    userEvent.click(buttonElement);

    const message = await screen.findByText(`Jesteś zalogowany jako: ${login}`);
    expect(message).toBeInTheDocument();

    spy.mockClear();
  });

  it("should not log in", async () => {
    const { loginElement, passwordElement, buttonElement } = setup();

    const login = "jan@domena.pl";
    const password = "janeczek";
    const md5 = "c5450079ce3aa5440cdea45c4be193bb";

    const spy = jest.spyOn(window, "fetch");

    window.fetch.mockResolvedValue({
      ok: true,
      json: async () => {
        return { Digest: md5 };
      },
    });

    userEvent.type(loginElement, login);
    userEvent.type(passwordElement, password);
    userEvent.click(buttonElement);

    const message = screen.queryByText(`Jesteś zalogowany jako: ${login}`);
    expect(message).not.toBeInTheDocument();

    spy.mockClear();
  });
});
