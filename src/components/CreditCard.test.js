import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CreditCard from "./CreditCard";

const setup = () => {
  const cardNumberInput = screen.getByLabelText(/numer karty/i);
  const submitButton = screen.getByRole("button", { name: /submit/i });

  return { cardNumberInput, submitButton };
};

describe("CreditCard", () => {
  it("should render form for passing credit card number", () => {
    render(<CreditCard />);

    const { cardNumberInput, submitButton } = setup();

    expect(cardNumberInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("should render correct credit card provider name when valid card number provided", async () => {
    render(<CreditCard />);

    const { cardNumberInput, submitButton } = setup();
    const validVisaNumber = "4263982640269299";

    userEvent.type(cardNumberInput, validVisaNumber);
    userEvent.click(submitButton);

    const cardProvider = await screen.findByText(/visa/i);

    await waitFor(() => {
      expect(cardProvider).toBeInTheDocument();
    });
  });

  it("should render error message when invalid card number provided", async () => {
    render(<CreditCard />);

    const { cardNumberInput, submitButton } = setup();
    const invalidCardNumber = "7567567455555554";

    userEvent.type(cardNumberInput, invalidCardNumber);
    userEvent.click(submitButton);

    const errorMessage = await screen.findByText(
      /podałeś niepoprawny numer karty/i
    );

    await waitFor(() => {
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
