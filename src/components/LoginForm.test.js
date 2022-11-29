import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LoginForm from './LoginForm';
import Catcher from './Cacher';

describe('<LoginForm>', () => {
    test('login input - long value', async () => {
        render(<LoginForm />);

        const fieldLogin = await screen.findByRole('textbox', { name: /login/i });
        userEvent.type(fieldLogin, 'Kadadas');

        const error = screen.queryByText('The field is too short!');

        expect(error).toBeNull();
    });

    test('login input - short value', async () => {
        render(<LoginForm />);

        const fieldLogin = await screen.findByRole('textbox', { name: /login/i });
        userEvent.type(fieldLogin, 'Ka');

        const error = await screen.findByText('The field is too short!');

        expect(error).toBeInTheDocument();
    });

    test('submit - incorrect date #1', async () => {
        const mock = jest.fn();
        mock.mockReturnValueOnce(false);

        render(<Catcher><LoginForm tryAuth={mock} /></Catcher>);

        const button = await screen.findByRole('button');
        userEvent.click(button);

        const error = await screen.findByText('Jest błąd!');

        expect(error).toBeInTheDocument();
    });

    test('submit - incorrect date #2', async () => {
        expect.assertions(1);

        const mock = jest.fn();
        mock.mockReturnValueOnce(false);

        render(<LoginForm tryAuth={mock} />);

        const button = await screen.findByRole('button');
        try {
            userEvent.click(button);
        } catch (e) {
            expect(e.message).toBe('Incorrect data!');
        }

    })
})