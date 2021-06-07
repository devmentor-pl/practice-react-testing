import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Credit from './Card';

jest.spyOn(window, 'fetch');

const visaCardNr = '4925560031063347';
const masterCardNr = '5105105105105100';
const amExNr = '371449635398431';
const incorrectNr = '222222222222222'


const setup = () => {
    const credit = render(<Credit />);
    const creditInput = screen.getByPlaceholderText('13-16 digits');
    const submitBtn = screen.getByRole('button', { name: 'Submit' });
    return {
		...credit,
        creditInput,
		submitBtn,
	};
};

describe('<Credit />', () => {
    test('should render field for credit card number', () => {
        const { submitBtn } = setup();
        expect(submitBtn).toBeInTheDocument();
    });
    
    test('should identiy Visa as Visa', async () => {
        const { submitBtn, creditInput } = setup();
    
        userEvent.type(creditInput, visaCardNr);
        userEvent.click(submitBtn);

        const cardProvider = await screen.findByText(`Your card is Visa`);
        
        expect(cardProvider).toBeInTheDocument();
    });
    
    test('should identiy MasterCard as MasterCard', async () => {
        const { submitBtn, creditInput } = setup();

        userEvent.type(creditInput, masterCardNr);
        userEvent.click(submitBtn);

        const cardProvider = await screen.findByText(`Your card is MasterCard`);
        
        expect(cardProvider).toBeInTheDocument();
    });

    test('should identiy AmEx as AmEx', async () => {
        const { submitBtn, creditInput } = setup();
        
        userEvent.type(creditInput, amExNr);
        userEvent.click(submitBtn);

        const cardProvider = await screen.findByText(`Your card is AmEx`);
        
        expect(cardProvider).toBeInTheDocument();
    });

    test('should display error message if invalid number is passed', async () => {
        const { submitBtn, creditInput } = setup();

        userEvent.type(creditInput, incorrectNr);
        userEvent.click(submitBtn);

        const cardProvider = screen.queryByText(`Your card is`);
        const errorMessage = await screen.findByText(`Invalid card number`);
        
        expect(errorMessage).toBeInTheDocument();
        expect(cardProvider).not.toBeInTheDocument();
    });
});