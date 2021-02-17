import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreditCardInput from "./CreditCardInput";

describe("CreditCardInput", () => {
  test("Number is valid Mastercard card number", () => {
    render(<CreditCardInput />);

    const validMastercardNumber = "5101 1800 0000 0007";

    const input = screen.getByRole("textbox");

    userEvent.type(input, validMastercardNumber);

    const validationText = screen.getByText("Card is valid.");
    const typeText = screen.getByText(/mastercard/i);

    expect(validationText).toBeInTheDocument();
    expect(typeText).toBeInTheDocument();
  });

  test("Number is valid Visa card number", () => {
    render(<CreditCardInput />);

    const validMastercardNumber = "4988 4388 4388 4305";

    const input = screen.getByRole("textbox");

    userEvent.type(input, validMastercardNumber);

    const validationText = screen.getByText("Card is valid.");
    const typeText = screen.getByText(/visa/i);

    expect(validationText).toBeInTheDocument();
    expect(typeText).toBeInTheDocument();
  });

  test("Number is valid American Express card number", () => {
    render(<CreditCardInput />);

    const validMastercardNumber = "3700 0000 0000 002";

    const input = screen.getByRole("textbox");

    userEvent.type(input, validMastercardNumber);

    const validationText = screen.getByText("Card is valid.");
    const typeText = screen.getByText(/american express/i);

    expect(validationText).toBeInTheDocument();
    expect(typeText).toBeInTheDocument();
  });

  test("Number is valid Diners Club card number", () => {
    render(<CreditCardInput />);

    const validMastercardNumber = "3600 6666 3333 44";

    const input = screen.getByRole("textbox");

    userEvent.type(input, validMastercardNumber);

    const validationText = screen.getByText("Card is valid.");
    const typeText = screen.getByText(/diners club/i);

    expect(validationText).toBeInTheDocument();
    expect(typeText).toBeInTheDocument();
  });

  test("Number is valid JCB card number", () => {
    render(<CreditCardInput />);

    const validMastercardNumber = "3569 9900 1009 5841";

    const input = screen.getByRole("textbox");

    userEvent.type(input, validMastercardNumber);

    const validationText = screen.getByText("Card is valid.");
    const typeText = screen.getByText(/jcb/i);

    expect(validationText).toBeInTheDocument();
    expect(typeText).toBeInTheDocument();
  });

  test("Wrong number is invalid", () => {
    render(<CreditCardInput />);

    const validMastercardNumber = "4111111111111112";

    const input = screen.getByRole("textbox");

    userEvent.type(input, validMastercardNumber);

    const validationText = screen.getByText("Card is not valid!");

    expect(validationText).toBeInTheDocument();
  });
});
