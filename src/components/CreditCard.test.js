import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CreditCard from './CreditCard';

  it('should renders CreditCard component', () => {
    render(<CreditCard />);
    expect(screen.getByLabelText(/Credit Card Number/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should updates card number input', () => {
    render(<CreditCard />);
    const cardNumberInput = screen.getByLabelText(/Credit Card Number/i);

    fireEvent.change(cardNumberInput, { target: { value: '4111111111111111' } });

    expect(cardNumberInput.value).toBe('4111111111111111');
  });

  it('should displays provider name when card number matches a known provider', () => {
    render(<CreditCard />);
    const cardNumberInput = screen.getByLabelText(/Credit Card Number/i);

    fireEvent.change(cardNumberInput, { target: { value: '4111111111111111' } });

    expect(screen.getByText(/VISA/i)).toBeInTheDocument();
  });

  it('should displays an error message for incorrect data', () => {
    render(<CreditCard />);
    const cardNumberInput = screen.getByLabelText(/Credit Card Number/i);

    fireEvent.change(cardNumberInput, { target: { value: '123' } });

    expect(screen.getByText(/Nieprawidłowe dane/i)).toBeInTheDocument();
  });
