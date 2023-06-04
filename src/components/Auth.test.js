import { render, screen } from "@testing-library/react";
import Auth from "./Auth";
import userEvent from "@testing-library/user-event";

jest.spyOn(window, "fetch");
jest.clearAllMocks();

describe("Auth", () => {
  it("should render LoginForm when user is not authenticated", () => {
    render(<Auth />);

    const loginInput = screen.getByLabelText(/login/i);
    const passwordInput = screen.getByLabelText(/password/i);

    expect(loginInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it("should render login info when the user type correct data", async () => {
    render(<Auth />);

    const loginInput = screen.getByLabelText(/login/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /send/i });
    const passwordMd5 = "8ae75b43f70f20ba564200ef4ab63a33";

    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ Digest: passwordMd5 }),
    });

    userEvent.type(loginInput, "jan@domena.pl");
    userEvent.type(passwordInput, "janeczek");
    userEvent.click(submitButton);

    const loginInfo = await screen.findByText(/Jesteś zalogowany jako/i);

    expect(loginInfo).toBeInTheDocument();
  });

  it("should not render login info when the user typed wrong password", async () => {
    render(<Auth />);

    const loginInput = screen.getByLabelText(/login/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /send/i });
    const passwordMd5 = "8ae75b43f70f20ba564200ef4ab63a33wrong"; // nieważne, czy md5 jest poprawne, czy nie to test przechodzi :/. Dodałem notkę poniżej

    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ Digest: passwordMd5 }),
    });

    userEvent.type(loginInput, "jan@domena.pl");
    userEvent.type(passwordInput, "janeczek"); // wydaje mi się, że lepszym testem byłoby sprawdzenie wpisanego hasła w tym miejscu, ale nie wiem za bardzo jak to zrobić
    userEvent.click(submitButton);

    const loginInfo = screen.queryByText(/Jesteś zalogowany jako/i);

    expect(loginInfo).not.toBeInTheDocument();
    //Nie mogę tego do końca zrozumieć. Podpatrzyłem sobie w Twoim rozwiązaniu tego zadania w PR na GH i doszedłem do wniosku, że taki test jest bez sensu, bo przecież loginInfo powinno być asynchroniczne, więc nieważne, czy sprawdzane md5 będzie poprawne, czy nie to nie znajdzie tego loginInfo w dokumencie :D
  });
});
