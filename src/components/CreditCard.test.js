import { render, screen  } from '@testing-library/react';
import CreditCard from './CreditCard';
import userEvent from '@testing-library/user-event';

const setup = () => {
	render(<CreditCard />);

	const inputValue = screen.getByRole('textbox');
	const buttonElement = screen.getByRole('button');

	return { inputValue, buttonElement };
};

describe('<CreditCard />', () => {
	test('invalid card number', async () => {
		const { inputValue, buttonElement } = setup();

		const cardNumber = '12312312312343';
		userEvent.type(inputValue, cardNumber);
		userEvent.click(buttonElement);

		const result = await screen.findByText('karta jest nieprawidłowa');
		expect(result).toBeInTheDocument();
	});
	test('invalid card number - too short', async () => {
		const { inputValue, buttonElement } = setup();

		const cardNumber = '123143';
		userEvent.type(inputValue, cardNumber);
		userEvent.click(buttonElement);

		const result = await screen.findByText('nieprawidłowa karta, dlugość znaków karty jest niepoprawna');
		expect(result).toBeInTheDocument();
	});
    test('valid visa card ', async () => {
		const { inputValue, buttonElement } = setup();

		const cardNumber = '4866231231233301';
		userEvent.type(inputValue, cardNumber);
		userEvent.click(buttonElement);

		const result = await screen.findByText('karta pochodzi z visa');
		expect(result).toBeInTheDocument();
	});
    test('valid dccb card ', async () => {
		const { inputValue, buttonElement } = setup();

		const cardNumber = '3066231231233301';
		userEvent.type(inputValue, cardNumber);
		userEvent.click(buttonElement);

		const result = await screen.findByText('karta pochodzi z dccb');
		expect(result).toBeInTheDocument();
	});

});
