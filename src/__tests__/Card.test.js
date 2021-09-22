import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from "../components/Card";

describe('Card number checker', () => {
	it('should recognize MasterCard', async () => {
		const cardNumber = '5577000055770004';
		render(<Card />);

		const inputElement = screen.getByLabelText('Card number:');
		const buttonElement = screen.getByRole('button', {name: /submit/i});

		userEvent.type(inputElement, cardNumber);
		userEvent.click(buttonElement);

		const response = await screen.findByText(/MasterCard/i)

		expect(response).toBeInTheDocument();

	});

	it('should recognize Visa', async () => {
		const cardNumber = '4012888888881881';
		render(<Card />);

		const inputElement = screen.getByLabelText('Card number:');
		const buttonElement = screen.getByRole('button', {name: /submit/i});

		userEvent.type(inputElement, cardNumber);
		userEvent.click(buttonElement);

		const response = await screen.findByText(/Visa/i)

		expect(response).toBeInTheDocument();

	});

	it('should recognize American Express', async () => {
		const cardNumber = '378282246310005';
		render(<Card />);

		const inputElement = screen.getByLabelText('Card number:');
		const buttonElement = screen.getByRole('button', {name: /submit/i});

		userEvent.type(inputElement, cardNumber);
		userEvent.click(buttonElement);

		const response = await screen.findByText(/American Express/i)

		expect(response).toBeInTheDocument();

	});

	it('should throw if provider cannot be recognize', async function () {
		render(<Card />);

		const inputElement = screen.getByLabelText('Card number:');
		const buttonElement = screen.getByRole('button', {name: /submit/i});

		userEvent.type(inputElement, '1111111111111');
		userEvent.click(buttonElement);

		const response = await screen.findByText(/Invalid card number/i)

		expect(response).toBeInTheDocument();

	});
});