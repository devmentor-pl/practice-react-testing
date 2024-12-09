import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreditCard } from "./CreditCArd";

const setup = () => {
  render(<CreditCard />);

  const numField = screen.getByRole("textbox");

  return { numField };
};

describe("<CreditCard/>", () => {
  it("render number", () => {
    const { numField } = setup();
    expect(numField).toBeInTheDocument();
  });

  it("render provider", async () => {
    const { numField } = setup();
    userEvent.type(numField, "4");
    const provider = await screen.findByText("VISA");

    expect(provider).toBeInTheDocument();
  });

  it("render error", async () => {
    const { numField } = setup();
    userEvent.type(numField, "098765");
    const provider = await screen.findByText("Wrong date");

    expect(provider).toBeInTheDocument();
  });
});
