import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm';

const mockTryAuth = jest.fn();

describe('LoginForm Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders correctly', () => {
        const { getByLabelText } = render(<LoginForm tryAuth={mockTryAuth} />);
        expect(getByLabelText(/login:/i)).toBeInTheDocument();
        expect(getByLabelText(/password:/i)).toBeInTheDocument();
    });

    test('displays error when input is too short', async () => {
        const { getByLabelText, findAllByText } = render(<LoginForm tryAuth={mockTryAuth} />);
        fireEvent.change(getByLabelText(/login:/i), { target: { value: 'ab' } });
        fireEvent.change(getByLabelText(/password:/i), { target: { value: '12' } });
    
        const errors = await findAllByText('The field is too short!');
        expect(errors).toHaveLength(2);
    });
    

    test('calls tryAuth with correct data', async () => {
        mockTryAuth.mockResolvedValue(true);
        const { getByLabelText, getByText } = render(<LoginForm tryAuth={mockTryAuth} />);
        fireEvent.change(getByLabelText(/login:/i), { target: { value: 'testUser' } });
        fireEvent.change(getByLabelText(/password:/i), { target: { value: 'password123' } });
        fireEvent.click(getByText(/send/i));

        await waitFor(() => expect(mockTryAuth).toHaveBeenCalledWith('testUser', 'password123'));
    });
});
