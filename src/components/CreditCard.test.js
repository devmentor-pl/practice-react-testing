import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CreditCard from "./CreditCard";

const setup = () => {
  render(<CreditCard />);

  const numberField = screen.getByRole("textbox");
  return { numberField };
};

describe("<CreditCard>", () => {
  it("should render number field", () => {
    const { numberField } = setup();

    expect(numberField).toBeInTheDocument();
  });

  it("should render provider", async () => {
    const { numberField } = setup();

    userEvent.type(numberField, "4");

    const provider = await screen.findByText("VISA");

    expect(provider).toBeInTheDocument();
  });

  it("should render error", async () => {
    const { numberField } = setup();
    userEvent.type(numberField, "123456789");
    const provider = await screen.findByText("Nieprawidłowe dane!");

    expect(provider).toBeInTheDocument();
  });
});
