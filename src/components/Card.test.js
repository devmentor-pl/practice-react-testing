import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Card from './Card';

describe('Card', ()=> {
    test('if number card field exists',()=>{
        render(<Card/>) 

        const number = screen.getByLabelText(/Numer karty:/i);
        expect(number).toBeInTheDocument();
    })

    test('check if button tag exist', ()=>{
        render(<Card/>) 

        const button = screen.getByRole('button', {name: 'send'} );
        expect(button).toBeInTheDocument();
    });

    test('check if find name of valid card', ()=>{
        render(<Card/>) 

        const number = screen.getByLabelText(/Numer karty:/i);
        userEvent.type(number, '5100000000000000')
        const button = screen.getByRole('button', {name: 'send'} );
        userEvent.click(button);
        const info = screen.getByText(/Karta: Mastercard/i);
        expect(info).toBeInTheDocument();
    });

    test('check if pass invalid number of card', ()=>{
        render(<Card/>) 

        const number = screen.getByLabelText(/Numer karty:/i);
        userEvent.type(number, '4100000000000000')
        const button = screen.getByRole('button', {name: 'send'} );
        userEvent.click(button);
        const info = screen.getByText(/Niewłaściwy numer karty/i);
        expect(info).toBeInTheDocument();
    });
})