import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Auth from './Auth';

describe('<Auth/>', () => {
  test('Should display a message after successful login', async () => {
    const spy = jest.spyOn(window, 'fetch');

    window.fetch.mockResolvedValue({
      ok: true,
      json: async () => {
        return { Digest: '8ae75b43f70f20ba564200ef4ab63a33' };
      },
    });

    render(<Auth />);

    const loginInput = screen.getByRole('textbox', { name: /login/i });
    const passwordInput = screen.getByRole('textbox', {
      name: /password/i,
    });
    const submitBtn = screen.getByRole('button', { name: /send/i });

    userEvent.type(loginInput, 'jan@domena.pl');
    userEvent.type(passwordInput, 'janeczek');
    userEvent.click(submitBtn);

    const message = await screen.findByText(
      'Jesteś zalogowany jako: jan@domena.pl'
    );

    expect(message).toBeInTheDocument();
    expect(window.fetch).toHaveBeenCalledTimes(1);
    spy.mockClear();
  });

  test('Should not log in with incorrect credentials and handle errors', async () => {
    const mockFetchPromise = Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ Digest: 'incorrect-digest' }),
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    render(<Auth />);

    userEvent.type(screen.getByLabelText(/login:/i), 'wrong@domena.pl');
    userEvent.type(screen.getByLabelText(/password:/i), 'wrongpassword');
    userEvent.click(screen.getByText(/send/i));

    const successMessage = screen.queryByText(
      'Jesteś zalogowany jako: wrong@omena.pl'
    );
    expect(successMessage).not.toBeInTheDocument();

    expect(global.fetch).toHaveBeenCalledTimes(1);

    global.fetch.mockClear();
  });

  test('Should display an error when the MD5 service is unavailable', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(() =>
        Promise.reject(new Error('Service unavailable'))
      );

    render(<Auth />);

    userEvent.type(screen.getByLabelText(/login:/i), 'jan@domena.pl');
    userEvent.type(screen.getByLabelText(/password:/i), 'janeczek');
    userEvent.click(screen.getByText(/send/i));

    const errorMessage = await screen.findByText(/Service unavailable/i);
    expect(errorMessage).toBeInTheDocument();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    global.fetch.mockClear();
  });
});
