import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CreditCard from './CreditCard';

const providersData = [
    { name: 'American Express', cardNumber: '378282246310005' },
    { name: 'Visa', cardNumber: '4701322211111234' },
    { name: 'MasterCard', cardNumber: '5555555555554444' },
    { name: 'Diners Club', cardNumber: '3000 0000 0000 04' },
    { name: 'JCB', cardNumber: '3088 0000 0000 0009' },
];

function setup() {
    render(<CreditCard />);
}

describe('CreditCard', () => {
    it('should render credit card input', () => {
        setup();

        const inputEl = screen.getByRole('textbox', { name: /card number/i });
        expect(inputEl).toBeInTheDocument();
    });

    it('should render submit button', () => {
        setup();

        const button = screen.getByRole('button', { name: /send/i });
        expect(button).toBeInTheDocument();
    });

    it('should display an error if card number is not valid', async () => {
        const invalidCardNumber = '123321';
        setup();

        // dostaję tutaj warning, żeby użyć act, bo jest zmieniany state
        // a jak używam act, to eslint mówi, żeby w testach jednoskowych nie używać act
        const inputEl = screen.getByRole('textbox', { name: /card number/i });
        userEvent.type(inputEl, invalidCardNumber);

        const button = screen.getByRole('button', { name: /send/i });
        userEvent.click(button);

        const error = await screen.findByText('card number invalid');
        expect(error).toBeInTheDocument();

        // jeżeli dobrze rozumiem, to w tej sytuacji, nie muszę używać waitFor, bo mamy
        // tylko przeładowanie stanu, nic kompleksowego
        // jak api call i przeładowanie stanu? (pewnie to również bez waitFor można zrobić)
        // czy może w waitFor bardziej chodzi o rzeczy jak setInterval?

        // await waitFor(() => {
        //     expect(screen.getByText('card number invalid')).toBeInTheDocument();
        // });
    });

    it('validates correct card number', async () => {
        const validCardNumber = '378282246310005';
        setup();

        const inputEl = screen.getByRole('textbox', { name: /card number/i });
        userEvent.type(inputEl, validCardNumber);

        const button = screen.getByRole('button', { name: /send/i });
        userEvent.click(button);

        await waitFor(() => {
            expect(screen.queryByText('card number invalid')).not.toBeInTheDocument();
        });
    });

    it('should display an error message no data passed', async () => {
        setup();

        const button = screen.getByRole('button', { name: /send/i });
        userEvent.click(button);
        const error = await screen.findByText('input empty');
        expect(error).toBeInTheDocument();
    });

    it.each(providersData)(
        'displays the correct provider name $name for a valid card number',
        async ({ name, cardNumber }) => {
            render(<CreditCard />);

            const inputEl = screen.getByRole('textbox', { name: /card number/i });
            userEvent.type(inputEl, cardNumber);

            const button = screen.getByRole('button', { name: /send/i });
            userEvent.click(button);

            const provider = await screen.findByText(name);
            expect(provider).toBeInTheDocument();

            // await waitFor(() => {
            //     expect(screen.getByText(name)).toBeInTheDocument();
            // });
        },
    );

    it('displays "unknown provider" for an unrecognized card number', async () => {
      const unrecognizedCardNumber = '6011000990139424'; 
      render(<CreditCard />);

      const inputEl = screen.getByRole('textbox', { name: /card number/i });
      userEvent.type(inputEl, unrecognizedCardNumber);

      const button = screen.getByRole('button', { name: /send/i });
      userEvent.click(button);

      const unknownProviderMessage = await screen.findByText(/unknown provider/i);
            expect(unknownProviderMessage).toBeInTheDocument();

      // await waitFor(() => {
      //     expect(screen.getByText('unknown provider')).toBeInTheDocument();
      // });
  });
});
