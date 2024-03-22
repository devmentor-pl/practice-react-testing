import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card from './Card'

describe('Card component', () => {
    beforeEach(() => {
        render(<Card />);
    });

    it('should not validate card number', async () => {
        const wrongCardNumber = '4713201712051476';

        userEvent.type(screen.getByRole('textbox'), wrongCardNumber);
        userEvent.click(screen.getByRole('button', { name: /check/i }));

        expect(await screen.findByText(/Wrong card number/i)).toBeInTheDocument();
    });

    it('should validate card number for Visa', async () => {
        const rightVisaCardNumber = '4111111111111111';

        userEvent.type(screen.getByRole('textbox'), rightVisaCardNumber);
        userEvent.click(screen.getByRole('button', { name: /check/i }));

        expect(await screen.findByText(/Organization: Visa/i)).toBeInTheDocument();
    });

    it('should validate card number for American Express', async () => {
        const rightAmexCardNumber = '378282246310005';

        userEvent.type(screen.getByRole('textbox'), rightAmexCardNumber);
        userEvent.click(screen.getByRole('button', { name: /check/i }));

        expect(await screen.findByText(/Organization: American Express/i)).toBeInTheDocument();
    });

    it('should validate card number for Diners Club Carte Blanche', async () => {
        const rightDinersCardNumber = '30569309025904';

        userEvent.type(screen.getByRole('textbox'), rightDinersCardNumber);
        userEvent.click(screen.getByRole('button', { name: /check/i }));

        expect(await screen.findByText(/Organization: Diners Club Carte Blanche/i)).toBeInTheDocument();
    });
});
