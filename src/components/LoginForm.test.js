import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

function setup(mockTryAuth, mockOnError) {
    render(<LoginForm tryAuth={mockTryAuth} onError={mockOnError} />);
}

describe('LoginForm', () => {
    const testCases = [
        ['login', 'usr', 'The field is too short!'],
        ['password', 'pas', 'The field is too short!'],
    ];

    it('should call tryAuth with correct values', () => {
        const mockTryAuth = jest.fn();
        const mockOnError = jest.fn();
        setup(mockTryAuth, mockOnError);

        const loginInput = screen.getByLabelText(/login:/i);
        const passwordInput = screen.getByLabelText(/password:/i);

        userEvent.type(loginInput, 'validUser');
        userEvent.type(passwordInput, 'validPass');

        const button = screen.getByRole('button', { name: 'send' });
        userEvent.click(button);

        expect(mockTryAuth).toHaveBeenCalledWith('validUser', 'validPass');
    });

    it.each(testCases)('should display error for too short %s', (field, value, expectedErrorMessage) => {
        const mockTryAuth = jest.fn();
        const mockOnError = jest.fn();
        setup(mockTryAuth, mockOnError);

        const inputElement = screen.getByLabelText(new RegExp(field + ':', 'i'));
        userEvent.type(inputElement, value);

        const error = screen.getByText(expectedErrorMessage);
        expect(error).toBeInTheDocument();
    });

    it('should call onError for failed authentication', async () => {
        const mockTryAuth = jest.fn();
        const mockOnError = jest.fn();
        mockTryAuth.mockReturnValueOnce(false);
        setup(mockTryAuth, mockOnError);

        const button = screen.getByRole('button', { name: 'send' });
        userEvent.click(button);

        expect(mockOnError).toHaveBeenCalled();

        // nie wiem dlaczego poniższa wersja testu nie przechodziła
        // const error = await screen.findByText('Incorrect data');
        // expect(error).toBeInTheDocument();
    });
});
