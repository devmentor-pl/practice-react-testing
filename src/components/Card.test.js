import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import Card from "./Card";

const testCardNumber = async (number, returnText) => {
	render(<Card />);
	const input = screen.getByText("Card number");
	const submitButton = screen.getByRole("button");
	userEvent.type(input, number);
	userEvent.click(submitButton);
	const paragraph = await screen.findByText(returnText);
	expect(paragraph.textContent).toBe(returnText);
};

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
		testCardNumber("0000011", "Your card is not valid");
	});

	test("should return 'Visa' when first digit is 4 and there are 16 digits in total", async () => {
		testCardNumber("4111111111111111", "Visa");
	});

	test("should return 'MasterCard' when first digit is 5, second digit is between 1 and 5 and there are 16 digits in total", async () => {
		testCardNumber("5105105105105100", "MasterCard");
	});

	test("should return 'American Express' when first digit is 3, second digit either 4 or 7 and there are 16 digits in total", async () => {
		testCardNumber("378282246310005", "American Express");
	});

	test("should return 'Diners Club Carte Blanche' when first digit is 3, second digit either 0 or 6 or 8 and there are 14 digits in total", async () => {
		testCardNumber("30569309025904", "Diners Club Carte Blanche");
	});

	test("should return 'JCB' when first 4 digits are one of these 3088|3096|3112||3158||3337|3528 and there are 16 digits in total", async () => {
		testCardNumber("3530111333300000", "JCB");
	});

	test("should return 'Not supported bank card!' when typed number does not match any Card", async () => {
		testCardNumber("1234567890123452", "Not supported bank card!");
	});
});
