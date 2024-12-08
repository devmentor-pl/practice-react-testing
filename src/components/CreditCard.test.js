import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreditCard from "./CreditCard";

describe("getNumber()", () => {
  test("does input exist", async () => {
    render(<CreditCard />);
    let text = "555";
    const numberInput = screen.getByRole("spinbutton");
    userEvent.type(numberInput, text);

    expect(numberInput).toBeInTheDocument();
  });

  test("is number correct", async () => {
    render(<CreditCard />);
    let number = "4905073846645112";
    const numberInput = screen.getByRole("spinbutton");
    userEvent.type(numberInput, number);
    const button = await screen.findByRole("button");
    userEvent.click(button);
    const str = await screen.findByText(`Card name: Visa`);
    expect(str).toBeInTheDocument();
  });
  test("is card name visa", async () => {
    render(<CreditCard />);
    let number = "4905073846645112";
    const numberInput = screen.getByRole("spinbutton");
    userEvent.type(numberInput, number);
    const button = await screen.findByRole("button");
    userEvent.click(button);
    const str = await screen.findByText(`Card name: Visa`);
    expect(str).toBeInTheDocument();
  });
});
