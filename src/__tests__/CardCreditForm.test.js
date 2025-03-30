import { fireEvent, render, screen } from "@testing-library/react";
import CardCreditForm from "../components/CardCreditForm";

describe("CardCrediForm", () => {
  const cards = {
    visa: "4111111111111111",
    mastercard: "5105105105105100",
    amex: "378282246310005",
    diners: "30569309025904",
    jcb: "3530111333300000",
    unknown: "6011111111111117",
    invalid: "4111111111111121",
  };

  it("return 'Invalid number' for empty input", () => {
    render(<CardCreditForm />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "" } });

    const submit = screen.getByRole("button", { name: "check" });
    fireEvent.click(submit);

    expect(screen.getByText("Invalid number")).toBeInTheDocument();
  });

  it("return 'Invalid number' for invalid card number", () => {
    render(<CardCreditForm />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: cards.invalid } });

    const submit = screen.getByRole("button", { name: "check" });
    fireEvent.click(submit);

    expect(screen.getByText("Invalid number")).toBeInTheDocument();
  });

  it("return 'Unknown' for unknown card number", () => {
    render(<CardCreditForm />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: cards.unknown } });

    const submit = screen.getByRole("button", { name: "check" });
    fireEvent.click(submit);

    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });

  it("return 'Visa' for Visa card number", () => {
    render(<CardCreditForm />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: cards.visa } });

    const submit = screen.getByRole("button", { name: "check" });
    fireEvent.click(submit);

    expect(screen.getByText("Visa")).toBeInTheDocument();
  });

  it("return 'MasterCard' for MasterCard card number", () => {
    render(<CardCreditForm />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: cards.mastercard } });

    const submit = screen.getByRole("button", { name: "check" });
    fireEvent.click(submit);

    expect(screen.getByText("MasterCard")).toBeInTheDocument();
  });

  it("return 'American Express' for American Express card number", () => {
    render(<CardCreditForm />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: cards.amex } });

    const submit = screen.getByRole("button", { name: "check" });
    fireEvent.click(submit);

    expect(screen.getByText("American Express")).toBeInTheDocument();
  });

  it("return 'Diners Club' for Diners Club card number", () => {
    render(<CardCreditForm />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: cards.diners } });

    const submit = screen.getByRole("button", { name: "check" });
    fireEvent.click(submit);

    expect(screen.getByText("Diners Club")).toBeInTheDocument();
  });

  it("return 'JCB' for JCB card number", () => {
    render(<CardCreditForm />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: cards.jcb } });

    const submit = screen.getByRole("button", { name: "check" });
    fireEvent.click(submit);

    expect(screen.getByText("JCB")).toBeInTheDocument();
  });
});
