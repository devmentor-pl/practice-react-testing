import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PaymentCardForm from './PaymentCardForm';

describe('PaymentCardForm', () => {
	test('renders card input and check button', () => {
		render(<PaymentCardForm />);

		expect(
			screen.getByRole('textbox', {
				name: /card number/i,
			}),
		).toBeInTheDocument();

		expect(
			screen.getByRole('button', {
				name: /check/i,
			}),
		).toBeInTheDocument();
	});

	test('renders Visa producer for 13 digit card', async () => {
		render(<PaymentCardForm />);

		const cardInput = screen.getByRole('textbox', {
			name: /card number/i,
		});
		userEvent.type(cardInput, '4222222222222');
		userEvent.click(screen.getByRole('button', { name: /check/i }));

		expect(await screen.findByText(/producer:/i)).toHaveTextContent('Producer: Visa');
		expect(screen.queryByRole('alert')).not.toBeInTheDocument();
	});

	test('renders Visa producer for 16 digit card', async () => {
		render(<PaymentCardForm />);

		const cardInput = screen.getByRole('textbox', {
			name: /card number/i,
		});
		userEvent.type(cardInput, '4111111111111111');
		userEvent.click(screen.getByRole('button', { name: /check/i }));

		expect(await screen.findByText(/producer:/i)).toHaveTextContent('Producer: Visa');
		expect(screen.queryByRole('alert')).not.toBeInTheDocument();
	});

	test('renders MasterCard producer', async () => {
		render(<PaymentCardForm />);

		const cardInput = screen.getByRole('textbox', {
			name: /card number/i,
		});
		userEvent.type(cardInput, '5105105105105100');
		userEvent.click(screen.getByRole('button', { name: /check/i }));

		expect(await screen.findByText(/producer:/i)).toHaveTextContent('Producer: MasterCard');
		expect(screen.queryByRole('alert')).not.toBeInTheDocument();
	});

	test('renders American Express producer', async () => {
		render(<PaymentCardForm />);

		const cardInput = screen.getByRole('textbox', {
			name: /card number/i,
		});
		userEvent.type(cardInput, '378282246310005');
		userEvent.click(screen.getByRole('button', { name: /check/i }));

		expect(await screen.findByText(/producer:/i)).toHaveTextContent('Producer: American Express');
		expect(screen.queryByRole('alert')).not.toBeInTheDocument();
	});

	test('renders Diners Club Carte Blanche producer', async () => {
		render(<PaymentCardForm />);

		const cardInput = screen.getByRole('textbox', {
			name: /card number/i,
		});
		userEvent.type(cardInput, '38520000023237');
		userEvent.click(screen.getByRole('button', { name: /check/i }));

		expect(await screen.findByText(/producer:/i)).toHaveTextContent('Producer: Diners Club Carte Blanche');
		expect(screen.queryByRole('alert')).not.toBeInTheDocument();
	});

	test('renders JCB producer', async () => {
		render(<PaymentCardForm />);

		const cardInput = screen.getByRole('textbox', {
			name: /card number/i,
		});
		userEvent.type(cardInput, '3530111333300000');
		userEvent.click(screen.getByRole('button', { name: /check/i }));

		expect(await screen.findByText(/producer:/i)).toHaveTextContent('Producer: JCB');
		expect(screen.queryByRole('alert')).not.toBeInTheDocument();
	});

	test('shows error for empty input', async () => {
		render(<PaymentCardForm />);

		userEvent.click(screen.getByRole('button', { name: /check/i }));

		expect(await screen.findByRole('alert')).toHaveTextContent('Card number is required');
		expect(screen.queryByText(/producer/i)).not.toBeInTheDocument();
	});

	test('shows error for whitespace only input', async () => {
		render(<PaymentCardForm />);

		const cardInput = screen.getByRole('textbox', {
			name: /card number/i,
		});
		userEvent.type(cardInput, '   ');

		userEvent.click(screen.getByRole('button', { name: /check/i }));

		expect(await screen.findByRole('alert')).toHaveTextContent('Card number is required');
		expect(screen.queryByText(/producer/i)).not.toBeInTheDocument();
	});

	test('shows error for letters', async () => {
		render(<PaymentCardForm />);

		const cardInput = screen.getByRole('textbox', {
			name: /card number/i,
		});
		userEvent.type(cardInput, '35301113333000hh');

		userEvent.click(screen.getByRole('button', { name: /check/i }));

		expect(await screen.findByRole('alert')).toHaveTextContent('Card number should contain only digits');
		expect(screen.queryByText(/producer/i)).not.toBeInTheDocument();
	});

	test('shows error for too short card number', async () => {
		render(<PaymentCardForm />);

		const cardInput = screen.getByRole('textbox', {
			name: /card number/i,
		});
		userEvent.type(cardInput, '35301113333');

		userEvent.click(screen.getByRole('button', { name: /check/i }));

		expect(await screen.findByRole('alert')).toHaveTextContent('Card number is too short');
		expect(screen.queryByText(/producer/i)).not.toBeInTheDocument();
	});

	test('shows error for too long card number', async () => {
		render(<PaymentCardForm />);

		const cardInput = screen.getByRole('textbox', {
			name: /card number/i,
		});
		userEvent.type(cardInput, '35301113333555555555');

		userEvent.click(screen.getByRole('button', { name: /check/i }));

		expect(await screen.findByRole('alert')).toHaveTextContent('Card number is too long');
		expect(screen.queryByText(/producer/i)).not.toBeInTheDocument();
	});

	test('shows error for unknown card type', async () => {
		render(<PaymentCardForm />);

		const cardInput = screen.getByRole('textbox', {
			name: /card number/i,
		});
		userEvent.type(cardInput, '99999999999999');

		userEvent.click(screen.getByRole('button', { name: /check/i }));

		expect(await screen.findByRole('alert')).toHaveTextContent('Unknown card type');
		expect(screen.queryByText(/producer/i)).not.toBeInTheDocument();
	});

	test('clears previous error after successful submit', async () => {
		render(<PaymentCardForm />);

		const cardInput = screen.getByRole('textbox', {
			name: /card number/i,
		});
		userEvent.type(cardInput, '35301113333555555555');

		userEvent.click(screen.getByRole('button', { name: /check/i }));

		expect(await screen.findByRole('alert')).toHaveTextContent('Card number is too long');
		expect(screen.queryByText(/producer/i)).not.toBeInTheDocument();

		userEvent.clear(cardInput);
		userEvent.type(cardInput, '4111111111111111');
		userEvent.click(screen.getByRole('button', { name: /check/i }));

		expect(await screen.findByText(/producer:/i)).toHaveTextContent('Producer: Visa');
		expect(screen.queryByRole('alert')).not.toBeInTheDocument();
	});
});
