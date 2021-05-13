import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Credit from './Card';

jest.spyOn(window, 'fetch');

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

        const visaCardNr = '4925560031063347';

        userEvent.type(creditInput, visaCardNr);
        userEvent.click(submitBtn);

        const cardProvider = await screen.findByText('VISA');
        
        expect(cardProvider).toBeInTheDocument();
    });
    
    
});

// 4111111111111111
// Card Type: Visa
// Card Length: 16
// Card Name: Kylie Jenkins
// Card Number: 4539803757146088
// Card Number: 10 18 0 14 14 8 0 16 = 35
// Card Expiration: 8 / 2035 (Month / Year)
// Card CVV: 961