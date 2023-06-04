import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LoginForm from "./LoginForm";

describe("<LoginForm>", () => {
  const mockTryAuth = jest.fn(
    (login, password) => login.length + password.length > 6
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders without errors", () => {
    render(<LoginForm tryAuth={mockTryAuth} />);
  });

  test("handles form submission successfully", async () => {
    render(<LoginForm tryAuth={mockTryAuth} />);

    const loginInput = screen.getByLabelText("login:");
    const passwordInput = screen.getByLabelText("password:");
    const submitButton = screen.getByText("send");

    fireEvent.change(loginInput, { target: { value: "testUser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(
        screen.queryByText("<h1>Wprowadziłeś niepoprawne dane!</h1>")
      ).not.toBeInTheDocument();
    });

    expect(mockTryAuth).toHaveBeenCalledWith("testUser", "password123");
  });

  test("displays error message when form submission fails", async () => {
    render(<LoginForm tryAuth={mockTryAuth} />);

    const loginInput = screen.getByLabelText("login:");
    const passwordInput = screen.getByLabelText("password:");
    const submitButton = screen.getByText("send");

    fireEvent.change(loginInput, { target: { value: "a" } });
    fireEvent.change(passwordInput, { target: { value: "b" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Wprowadziłeś niepoprawne dane!")
      ).toBeInTheDocument();
    });
  });
});

// coś średnio mi jeszcze te testy idą. Robię to trochę po omacku, a test 'displays error message when form submission fails' właściwie przechodzi w każdym przypadku, więc nie wiem o co chodzi i chatGPT też nie pomógł :/. Przerabiam to pod presją czasu i chyba po mentoringu będę musiał do tego jeszcze przysiąść
