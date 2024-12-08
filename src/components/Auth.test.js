import { getMd5 } from "../providers/md5Provider";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Auth from "./Auth";
import { waitFor } from "@testing-library/react";
import Md5Form from "./Md5Form";

describe("getMd5()", () => {
  test("does login exist", async () => {
    render(<Auth />);
    const text = "jan@domena.pl";
    const md5 = "f1290186a5d0b1ceab27f4e77c0c5d68";

    const login = screen.getByRole("textbox", { name: /login/i });
    userEvent.type(login, text);
    const password = screen.getByRole("textbox", { name: /password/i });
    userEvent.type(password, "janeczek");
    const button = await screen.findByRole("button");
    userEvent.click(button);

    expect(login).toBeInTheDocument();
  });
  test("submit of form - add data", async () => {
    render(<Auth />);
    const text = "jan@domena.pl";
    const password = "janeczek";
    const md5 = "8ae75b43f70f20ba564200ef4ab63a33";

    const login = screen.getByRole("textbox", { name: /login/i });
    /*   userEvent.type(login, text); */
    const passwordInput = screen.getByRole("textbox", { name: /password/i });
    /*  userEvent.type(passwordInput, password); */
    const button = screen.getByRole("button");

    const spy = jest.spyOn(window, "fetch");
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => {
        return { Digest: md5 };
      },
    });
    userEvent.type(login, text);
    userEvent.type(passwordInput, password);
    userEvent.click(button);

    const respond = await screen.findByText(`Jesteś zalogowany jako: ${text}`);
    expect(respond).toBeInTheDocument();
  });
});
