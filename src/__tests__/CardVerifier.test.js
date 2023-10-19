import { render, screen, waitFor } from '@testing-library/react';
import CardVerifier from '../components/CardVerifier';
import userEvent from '@testing-library/user-event';

import cardNumberProvider from '../providers/cardNumberProvider';

const setup = () => {
	const utils = render(<CardVerifier />);
	const input = screen.getByRole('textbox');
	return {
		input,
		...utils,
	};
};

it('renders form with login input', () => {
	const { input } = setup();
	expect(input).toBeInTheDocument();
});
it('shows value typed into an input', () => {
	const { input } = setup();
	userEvent.type(input, '123');
	expect(input).toHaveValue('123');
});

it('displays error after submit when input is empty', async () => {
	// render(<CardVerifier />); // hm...
	const submitBtn = screen.getByRole('button', { name: /send/i }); // hm....
	userEvent.click(submitBtn);
	const error = await screen.findByText('Proszę wpisać numer karty.');
	expect(error).toBeInTheDocument();
});

it('removes error when value is changing', async () => {
	const { input } = setup();
	const submitBtn = screen.getByRole('button', { name: /send/i });
	userEvent.click(submitBtn);
	const error = await screen.findByText('Proszę wpisać numer karty.'); // hm...
	userEvent.type(input, '456');
	expect(error).not.toBeInTheDocument();
});

it('displays error after submit when cardNumber is incorrect', async () => {
	const { input } = setup();
	userEvent.type(input, '123xxx');
	const submitBtn = screen.getByRole('button', { name: /send/i });
	userEvent.click(submitBtn);
	const error = await screen.findByText('Nieprawidłowy numer karty.');
	expect(error).toBeInTheDocument();
});

it('detects Visa type when value is Visa card number', async () => {
	const { input } = setup();
	userEvent.type(input, cardNumberProvider.Visa);
	const submitBtn = screen.getByRole('button', { name: /send/i });
	userEvent.click(submitBtn);
	const typeMsg = await screen.findByText('Wykryto typ karty: Visa.');
	expect(typeMsg).toBeInTheDocument();
});

it('detects Discover type when value is Discover card number', async () => {
	const { input } = setup();
	userEvent.type(input, cardNumberProvider.Discover);
	const submitBtn = screen.getByRole('button', { name: /send/i });
	userEvent.click(submitBtn);
	const typeMsg = await screen.findByText('Wykryto typ karty: Discover.');
	expect(typeMsg).toBeInTheDocument();
});

it('detects JCB type when value is JCB card number', async () => {
	const { input } = setup();
	userEvent.type(input, cardNumberProvider.JCB);
	const submitBtn = screen.getByRole('button', { name: /send/i });
	userEvent.click(submitBtn);
	const typeMsg = await screen.findByText('Wykryto typ karty: JCB.');
	expect(typeMsg).toBeInTheDocument();
});

it('detects MasterCard type when value is MasterCard card number', async () => {
	const { input } = setup();
	userEvent.type(input, cardNumberProvider.MasterCard);
	const submitBtn = screen.getByRole('button', { name: /send/i });
	userEvent.click(submitBtn);
	const typeMsg = await screen.findByText('Wykryto typ karty: MasterCard.');
	expect(typeMsg).toBeInTheDocument();
});

it('detects American Express type when value is American Express card number', async () => {
	const { input } = setup();
	userEvent.type(input, cardNumberProvider['American Express']);
	const submitBtn = screen.getByRole('button', { name: /send/i });
	userEvent.click(submitBtn);
	const typeMsg = await screen.findByText(
		'Wykryto typ karty: American Express.'
	);
	expect(typeMsg).toBeInTheDocument();
});

it('detects Diners Club type when value is Diners Club card number', async () => {
	const { input } = setup();
	userEvent.type(input, cardNumberProvider['Diners Club']);
	const submitBtn = screen.getByRole('button', { name: /send/i });
	userEvent.click(submitBtn);
	const typeMsg = await screen.findByText('Wykryto typ karty: Diners Club.');
	expect(typeMsg).toBeInTheDocument();
});

it('displays error when card number is correct but no type detected', async () => {
	const { input } = setup();
	userEvent.type(input, '00000000000000000000');
	const submitBtn = screen.getByRole('button', { name: /send/i });
	userEvent.click(submitBtn);
	const error = await screen.findByText(
		'Sprawdź wprowadzony numer karty - nie wykryto typu.'
	);
	expect(error).toBeInTheDocument();
});
