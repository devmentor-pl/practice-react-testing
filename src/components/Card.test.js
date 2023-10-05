import { render, screen } from "@testing-library/react";
import { waitFor } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import Card from "./Card";

describe("Card", () => {
	test("should render input", () => {
		render(<Card />);
		const input = screen.getByText("Card number");
		expect(input).toBeInTheDocument();
	});
	test("should render button", () => {
		render(<Card />);
		const submitButton = screen.getByRole("button");
		expect(submitButton).toBeInTheDocument();
	});

	test("should return: Your card is not valid if card number is invalid", async () => {
		render(<Card />);
		const cardNumber = "0000011";
		const input = screen.getByText("Card number");
		const submitButton = screen.getByRole("button");
		userEvent.type(input, cardNumber);
		userEvent.click(submitButton);
		const paragraph = await screen.findByText("Your card is not valid");
		expect(paragraph.textContent).toBe("Your card is not valid");
	});

	test("should return 'Visa' when first digit is 4 and there are 16 digits in total", async () => {
		render(<Card />);
		const cardNumber = "4111111111111111";
		const input = screen.getByLabelText("Card number", { selector: "input" });
		const submitButton = screen.getByRole("button");
		userEvent.type(input, cardNumber);
		userEvent.click(submitButton);
		const paragraph = await screen.findByText("Visa");
		expect(paragraph.textContent).toBe("Visa");
	});
});
