import CreditCard from "./CreditCard";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Credit Card test", () => {
    it("check if input for cc exists", () => {
        render(<CreditCard />);

        const ccInput = screen.getByLabelText("Credit card number:");
        expect(ccInput).toBeInTheDocument();
    });
    it("check if input is displaying the numbers user types", () => {
        render(<CreditCard />);

        const ccInput = screen.getByLabelText("Credit card number:");
        userEvent.type(ccInput, "5340832733014777");

        expect(ccInput.value).toBe("5340832733014777");
    });
    it("check if input attr prevents typing text instead of numbers", () => {
        render(<CreditCard />);

        const ccInput = screen.getByLabelText("Credit card number:");
        userEvent.type(ccInput, "text");

        expect(ccInput.value).toBe("");
    });
    it("check if message 'Please enter at least 13 digits card number' is displayed when user types too short card number", () => {
        render(<CreditCard />);

        const ccInput = screen.getByLabelText("Credit card number:");
        userEvent.type(ccInput, "123");
        const checkButton = screen.getByRole("button", { name: /check/i });
        userEvent.click(checkButton);

        expect(
            screen.getByText(/Please enter 13 to 16 digits card number/i)
        ).toBeInTheDocument();
    });
    it("check if message 'Credit card is invalid' is displayed when user types invalid card number", () => {
        render(<CreditCard />);

        const ccInput = screen.getByLabelText("Credit card number:");
        userEvent.type(ccInput, "123456789123456");
        const checkButton = screen.getByRole("button", { name: /check/i });
        userEvent.click(checkButton);

        expect(screen.getByText(/Credit card is invalid/i)).toBeInTheDocument();
    });
    it("check if message 'Credit card is valid and it is MasterCard' is displayed when user types valid MasterCard card number", () => {
        render(<CreditCard />);

        const ccInput = screen.getByLabelText("Credit card number:");
        userEvent.type(ccInput, "5340832733014777");
        const cardType = "MasterCard";
        const checkButton = screen.getByRole("button", { name: /check/i });
        userEvent.click(checkButton);

        expect(
            screen.getByText(`Credit card is valid and it is ${cardType}`)
        ).toBeInTheDocument();
    });
    it("check if message 'Credit card is valid and it is Visa' is displayed when user types valid MasterCard card number", () => {
        render(<CreditCard />);

        const ccInput = screen.getByLabelText("Credit card number:");
        userEvent.type(ccInput, "4715308000797337");
        const cardType = "Visa";
        const checkButton = screen.getByRole("button", { name: /check/i });
        userEvent.click(checkButton);

        expect(
            screen.getByText(`Credit card is valid and it is ${cardType}`)
        ).toBeInTheDocument();
    });
    it("check if message 'Credit card is valid and it is American Express' is displayed when user types valid amex card number", () => {
        render(<CreditCard />);

        const ccInput = screen.getByLabelText("Credit card number:");
        userEvent.type(ccInput, "371449635398431");
        const cardType = "American Express";
        const checkButton = screen.getByRole("button", { name: /check/i });
        userEvent.click(checkButton);

        expect(
            screen.getByText(`Credit card is valid and it is ${cardType}`)
        ).toBeInTheDocument();
    });
    it("check if message 'Credit card is valid and it is Diners Club Carte Blanche' is displayed when user types valid Diners card number", () => {
        render(<CreditCard />);

        const ccInput = screen.getByLabelText("Credit card number:");
        userEvent.type(ccInput, "30036592321275");
        const cardType = "Diners Club Carte Blanche";
        const checkButton = screen.getByRole("button", { name: /check/i });
        userEvent.click(checkButton);

        expect(
            screen.getByText(`Credit card is valid and it is ${cardType}`)
        ).toBeInTheDocument();
    });
    it("check if message 'Credit card is valid and it is JBC' is displayed when user types valid JBC card number", () => {
        render(<CreditCard />);

        const ccInput = screen.getByLabelText("Credit card number:");
        userEvent.type(ccInput, "3588530672676178");
        const cardType = "JBC";
        const checkButton = screen.getByRole("button", { name: /check/i });
        userEvent.click(checkButton);

        expect(
            screen.getByText(`Credit card is valid and it is ${cardType}`)
        ).toBeInTheDocument();
    });
    it("check if 13 digit visa card will be recognised", () => {
        render(<CreditCard />);

        const ccInput = screen.getByLabelText("Credit card number:");
        userEvent.type(ccInput, "4012888818888");
        const cardType = "Visa";
        const checkButton = screen.getByRole("button", { name: /check/i });
        userEvent.click(checkButton);

        expect(
            screen.getByText(`Credit card is valid and it is ${cardType}`)
        ).toBeInTheDocument();
    });
});
