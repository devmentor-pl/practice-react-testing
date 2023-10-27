import { render, screen } from '@testing-library/react';
import CreditCard from './CreditCard';
import userEvent from '@testing-library/user-event';

describe('<CreditCard />', () => {
	test('should have a card number field and submit button', () => {
		render(<CreditCard />);

		const cardNumberField = screen.getByRole('textbox', {
			name: /Numer karty/i,
		});
		const submitBtn = screen.getByRole('button', { name: /Sprawdź/i });

		expect(cardNumberField).toBeInTheDocument();
		expect(submitBtn).toBeInTheDocument()
	});

	test('should display the card name if the card number is valid', async () => {
		render(<CreditCard />);

		const cardNumbers = {
			AmericanExpress: '370707524318583',
			Visa: '4111111111111111',
			MasterCard: '5555555555554444',
			DinersClub: '30569309025904',
			JCB: '3528327757709351',
		};

		const cardNumberField = screen.getByRole('textbox', {
			name: /Numer karty/i,
		});
		const submitBtn = screen.getByRole('button', { name: /Sprawdź/i });

		for (const [cardType, cardNumber] of Object.entries(cardNumbers)) {
			userEvent.clear(cardNumberField);
			userEvent.type(cardNumberField, cardNumber);
			userEvent.click(submitBtn);

			const cardTypeText = `Twoja karta: ${cardType}`;
			const cardTypeElement = await screen.findByText(cardTypeText);
			expect(cardTypeElement).toBeInTheDocument();
		}
	});

	test('should display an error if the card number is wrong', async () => {
		render(<CreditCard />);

		const cardNumberField = screen.getByRole('textbox', {
			name: /Numer karty/i,
		});
		const submitBtn = screen.getByRole('button', { name: /Sprawdź/i });

		userEvent.type(cardNumberField, '370707524318583123');
		userEvent.click(submitBtn);

		const message = await screen.findByText('Numer karty jest nieprawidłowy');
		expect(message).toBeInTheDocument();
	});

	test('should display an error if you do not enter the card number', async () => {
		render(<CreditCard />);

		const submitBtn = screen.getByRole('button', { name: /Sprawdź/i });
		userEvent.click(submitBtn);

		const message = await screen.findByText('Wprowadź numer karty');
		expect(message).toBeInTheDocument();
	});
});
