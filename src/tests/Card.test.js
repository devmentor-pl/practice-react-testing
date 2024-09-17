import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from '../components/Card';

jest.spyOn(window, 'fetch');

const setup = () => {
    const card = render(<Card />);
    const cardInput = screen.getByLabelText('Card Number:');
    const submitBtn = screen.getByRole('button', { name: 'Submit' });
    return {
		...card,
        cardInput,
		submitBtn,
	};
};

describe('<Card/>', () => {
    test('should render field for card number', () => {
        const { submitBtn } = setup();
        expect(submitBtn).toBeInTheDocument();
    });

    test('should recognize Visa', async () => {
        const cardNumber = '4125569931063347';
        const { submitBtn, cardInput } = setup();

        userEvent.type(cardInput, cardNumber);
        userEvent.click(submitBtn);

        const cardType= await screen.findByText(`Your card is Visa`);

        expect(cardType).toBeInTheDocument();
    });

    test('should recognize MasterCard', async () => {
        const cardNumber = '5577000055770004';
        const { submitBtn, cardInput } = setup();

        userEvent.type(cardInput, cardNumber);
        userEvent.click(submitBtn);

        const cardType = await screen.findByText(`Your card is MasterCard`);

        expect(cardType).toBeInTheDocument();
    });

    test('should recognize American Express', async () => {
        const cardNumber = '378769635668431';
        const { submitBtn, cardInput } = setup();

        userEvent.type(cardInput, cardNumber);
        userEvent.click(submitBtn);

        const cardType = await screen.findByText(`Your card is American Express`);

        expect(cardType).toBeInTheDocument();
    });

    test('should display error message if card number is invalid', async () => {
        const cardNumber = '11111111111111';
        const { submitBtn, cardInput } = setup();

        userEvent.type(cardInput, cardNumber);
        userEvent.click(submitBtn);

        const cardType = screen.queryByText(`Your card is`);
        const errorMessage = await screen.findByText(`Invalid card number!`);

        expect(errorMessage).toBeInTheDocument();
        expect(cardType).not.toBeInTheDocument();
    });
}); 