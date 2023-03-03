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
      const message = await screen.findByText("Błędny numer karty!");
      expect(message).toBeInTheDocument();
    });
  });
});
