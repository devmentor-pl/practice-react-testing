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

		const cardNumberField = screen.getByRole('textbox', {
			name: /Numer karty/i,
		});
		const submitBtn = screen.getByRole('button', { name: /Sprawdź/i });

		userEvent.type(cardNumberField, '370707524318583');
		userEvent.click(submitBtn);

		const cardType = await screen.findByText('Twoja karta: AmericanExpress');
		expect(cardType).toBeInTheDocument();
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
});
