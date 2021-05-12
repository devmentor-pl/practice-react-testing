import { getByLabelText, getByPlaceholderText, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Credit from './Credit';

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
    
    test('should identiy and display VISA', async () => {
        const { submitBtn, creditInput } = setup();

        const visaCardNr = '4539803757146088';

        userEvent.type(creditInput, visaCardNr);
        screen.debug();
        userEvent.click(submitBtn);

        const cardProvider = await screen.findByText('VISA');
        
        expect(cardProvider).toBeInTheDocument();
    });
    
    
});


// Card Type: Visa
// Card Length: 16
// Card Name: Kylie Jenkins
// Card Number: 4539803757146088
// Card Expiration: 8 / 2035 (Month / Year)
// Card CVV: 961