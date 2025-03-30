import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Auth from "../components/Auth";
import users from "../db/users";

describe("Auth component", () => {
  it("render h1 when auth is successful", async () => {
    const spy = jest.spyOn(window, "fetch");

    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ Digest: users[0].password }),
    });

    render(<Auth />);

    const login = screen.getByRole("textbox", { name: /login/ });
    const password = screen.getByRole("textbox", { name: /password/ });
    const submit = screen.getByRole("button", { name: "send" });

    expect(login).toBeInTheDocument();

    fireEvent.change(login, { target: { value: users[0].login } });
    fireEvent.change(password, { target: { value: "janeczek" } });
    fireEvent.click(submit);

    await waitFor(() => {
      const h1 = screen.getByRole("heading");
      expect(h1).toHaveTextContent(`Jesteś zalogowany jako: jan@domena.pl`);
    });

    spy.mockRestore();
  });
});
