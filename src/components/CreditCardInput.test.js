import React from 'react';
import CreditCardInput from './CreditCardInput';
import { fireEvent, render, screen } from '@testing-library/react';

describe('CreditCardInput Component', () => {
  test('Identifies and validates a Visa card', () => {
    render(<CreditCardInput />);

    fireEvent.change(screen.getByPlaceholderText('Card number'), {
      target: { value: '4111111111111111' },
    });

    expect(screen.getByText('Card type: Visa')).toBeInTheDocument();
    expect(screen.getByText('Card is valid.')).toBeInTheDocument();
  });

  test('Identifies and validates a MasterCard', () => {
    render(<CreditCardInput />);

    fireEvent.change(screen.getByPlaceholderText('Card number'), {
      target: { value: '5555555555554444' },
    });

    expect(screen.getByText('Card type: MasterCard')).toBeInTheDocument();
    expect(screen.getByText('Card is valid.')).toBeInTheDocument();
  });

  test('Identifies and validates a AmericanExpress', () => {
    render(<CreditCardInput />);

    fireEvent.change(screen.getByPlaceholderText('Card number'), {
      target: { value: '345555555555444' },
    });

    expect(screen.getByText('Card type: AmericanExpress')).toBeInTheDocument();
    expect(screen.getByText('Card is valid.')).toBeInTheDocument();
  });

  test('Identifies and validates a DinersClub', () => {
    render(<CreditCardInput />);

    fireEvent.change(screen.getByPlaceholderText('Card number'), {
      target: { value: '30555555554444' },
    });

    expect(screen.getByText('Card type: DinersClub')).toBeInTheDocument();
    expect(screen.getByText('Card is valid.')).toBeInTheDocument();
  });

  test('Identifies and validates a JCB', () => {
    render(<CreditCardInput />);

    fireEvent.change(screen.getByPlaceholderText('Card number'), {
      target: { value: '3088555555554444' },
    });

    expect(screen.getByText('Card type: JCB')).toBeInTheDocument();
    expect(screen.getByText('Card is valid.')).toBeInTheDocument();
  });

  test('Handles invalid card number correctly', () => {
    render(<CreditCardInput />);

    fireEvent.change(screen.getByPlaceholderText('Card number'), {
      target: { value: '1234567890123456' },
    });
    expect(screen.getByText('Invalid card provider.')).toBeInTheDocument();
  });

  test('Handles incomplete card number for Visa', () => {
    render(<CreditCardInput />);
    fireEvent.change(screen.getByPlaceholderText('Card number'), {
      target: { value: '4111' },
    });
    expect(screen.getByText('Wrong length for Visa card.')).toBeInTheDocument();
  });

  test('Exceeds maximum length for AmericanExpress', () => {
    render(<CreditCardInput />);
    fireEvent.change(screen.getByPlaceholderText('Card number'), {
      target: { value: '3455555555554' },
    });
    expect(
      screen.getByText('Wrong length for AmericanExpress card.')
    ).toBeInTheDocument();
  });

  test('Inputs with special characters', () => {
    render(<CreditCardInput />);
    fireEvent.change(screen.getByPlaceholderText('Card number'), {
      target: { value: '4111-1111-1111-1111' },
    });
    expect(screen.getByText('Card type: Visa')).toBeInTheDocument();
    expect(screen.getByText('Card is valid.')).toBeInTheDocument();
  });

  test('Submission feedback message appears after valid submission', async () => {
    render(<CreditCardInput />);
    fireEvent.change(screen.getByPlaceholderText('Card number'), {
      target: { value: '4111111111111111' },
    });
    fireEvent.click(screen.getByText('Submit'));
    expect(
      await screen.findByText('Card details were sent, thank you.')
    ).toBeInTheDocument();
  });

  test('Component resets after submission', async () => {
    render(<CreditCardInput />);
    fireEvent.change(screen.getByPlaceholderText('Card number'), {
      target: { value: '4111111111111111' },
    });
    fireEvent.click(screen.getByText('Submit'));
    await screen.findByText('Card details were sent, thank you.');
    expect(screen.getByPlaceholderText('Card number').value).toBe('');
    expect(screen.getByText('Card type: unknown')).toBeInTheDocument();
  });

  test('Identifies unkown card type', () => {
    render(<CreditCardInput />);
    fireEvent.change(screen.getByPlaceholderText('Card number'), {
      target: { value: '9999999999999999' },
    });
    expect(screen.getByText('Invalid card provider.')).toBeInTheDocument();
  });
});
