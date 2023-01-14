import {render,screen} from '@testing-library/react';
import BankAccount from '../BankAccount';
import userEvent from '@testing-library/user-event';


describe('BankAccount component', () => {
    it('BankAccount component should render', () => {
        render(<BankAccount />);
        const labelelement = screen.getByText(/Card number:/i);
        expect(labelelement).toBeInTheDocument();
    });
    it('should render card name if card number is valid', () => {
        render(<BankAccount />);
        const labelelement = screen.getByText(/Card number:/i);
        const buttonElement = screen.getByRole('button', { name: /Check!/i });
        userEvent.type(labelelement, '5100000000000000');
        userEvent.click(buttonElement);
        const spanElement = screen.getByText(/Mastercard/i);
        expect(spanElement).toBeInTheDocument();
    });
    it('should render error message if card number is invalid', () => {
        render(<BankAccount />);
        const labelelement = screen.getByText(/Card number:/i);
        const buttonElement = screen.getByRole('button', { name: /Check!/i });
        userEvent.type(labelelement, '51000000000000');
        userEvent.click(buttonElement);
        const spanElement = screen.getByText(/Wrong card number/i);
        expect(spanElement).toBeInTheDocument();
    });
});