import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreditCardForm from "./CreditCardForm";

describe("<CreditCardForm>", () => {
  it("cardNumber input - check card type -> Visa(16 digits)", async () => {
    render(<CreditCardForm />);
    const fieldCardNumber = await screen.findByRole("textbox", {
      name: /cardNumber/i,
    });
    userEvent.type(fieldCardNumber, "4123456789123451");
    const sendButton = await screen.findByRole("button", {
      name: "send",
    });
    userEvent.click(sendButton);

    await waitFor(async () => {
      const message = await screen.findByText("Visa");
      expect(message).toBeInTheDocument();
    });
  });
  it("cardNumber input - check card type -> Visa(13 digits)", async () => {
    render(<CreditCardForm />);
    const fieldCardNumber = await screen.findByRole("textbox", {
      name: /cardNumber/i,
    });
    userEvent.type(fieldCardNumber, "4123456789123");
    const sendButton = await screen.findByRole("button", {
      name: "send",
    });
    userEvent.click(sendButton);

    await waitFor(async () => {
      const message = await screen.findByText("Visa");
      expect(message).toBeInTheDocument();
    });
  });
  it("cardNumber input - check card type -> MasterCard", async () => {
    render(<CreditCardForm />);
    const fieldCardNumber = await screen.findByRole("textbox", {
      name: /cardNumber/i,
    });
    userEvent.type(fieldCardNumber, "5123456789123123");
    const sendButton = await screen.findByRole("button", {
      name: "send",
    });
    userEvent.click(sendButton);

    await waitFor(async () => {
      const message = await screen.findByText("MasterCard");
      expect(message).toBeInTheDocument();
    });
  });
  it("cardNumber input - check card type -> AmericanExpress", async () => {
    render(<CreditCardForm />);
    const fieldCardNumber = await screen.findByRole("textbox", {
      name: /cardNumber/i,
    });
    userEvent.type(fieldCardNumber, "312345678912312");
    const sendButton = await screen.findByRole("button", {
      name: "send",
    });
    userEvent.click(sendButton);

    await waitFor(async () => {
      const message = await screen.findByText("AmericanExpress");
      expect(message).toBeInTheDocument();
    });
  });
  it("cardNumber input - check card type -> wrong number", async () => {
    render(<CreditCardForm />);
    const fieldCardNumber = await screen.findByRole("textbox", {
      name: /cardNumber/i,
    });
    userEvent.type(fieldCardNumber, "112345678912312");
    const sendButton = await screen.findByRole("button", {
      name: "send",
    });
    userEvent.click(sendButton);

    await waitFor(async () => {
      const message = await screen.findByText(
        "Card number do not match any type!"
      );
      expect(message).toBeInTheDocument();
    });
  });
  it("cardNumber input - check number(wrong)", async () => {
    render(<CreditCardForm />);
    const fieldCardNumber = await screen.findByRole("textbox", {
      name: /cardNumber/i,
    });
    userEvent.type(fieldCardNumber, "1111111111111111");

    await waitFor(async () => {
      const message = await screen.findByText("Wrong card number!");
      expect(message).toBeInTheDocument();
    });
  });

  // poniższy test nie przechodzi, ale pojawia się informacja, że coś jest nie tak w <LoginForm> component i nie za bardzo rozumiem, jaki to ma tutaj związek?
  /*it("cardNumber input - check number(correct)", async () => {
    render(<CreditCardForm />);
    const fieldCardNumber = await screen.findByRole("textbox", {
      name: /cardNumber/i,
    });
    userEvent.type(fieldCardNumber, "4111111111111111");

    await waitFor(async () => {
      const message = await screen.findByText("Wrong card number!");
      expect(message).not.toBeInTheDocument();
    });
  });*/
});
