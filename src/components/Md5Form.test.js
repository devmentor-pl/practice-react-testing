import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Md5Form from './Md5Form';
import { getMd5 } from '../providers/md5Provider';

describe('<Md5Form />', () => {
  test('Text from input should be in .data-text', () => {
    render(<Md5Form />);

    const inputElement = screen.getByRole('textbox');
    const inputText = 'test text';
    userEvent.type(inputElement, inputText);

    const renderedText = screen.getByText(inputText, {
      className: 'data-text',
    });
    expect(renderedText).toBeInTheDocument();
  });

  test('Submitting the form should load fetched MD5 data into .data-md5 element', async () => {
    jest.spyOn(window, 'fetch');

    window.fetch.mockResolvedValue({
      ok: true,
      json: async () => {
        return { Digest: '1e2db57dd6527ad4f8f281ab028d2c70' };
      },
    });

    render(<Md5Form getMd5={getMd5} />);

    const inputElement = screen.getByRole('textbox');
    const submitBtn = screen.getByRole('button', { name: /send/i });

    userEvent.type(inputElement, 'test text');
    userEvent.click(submitBtn);

    await waitFor(() => {
      const md5Element = screen.getByText('1e2db57dd6527ad4f8f281ab028d2c70', {
        selector: '.data-md5',
      });
      expect(md5Element).toBeInTheDocument();
    });
  });

  test('Changing input data clears the .data-md5 content', async () => {
    jest.spyOn(window, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({ Digest: '1e2db57dd6527ad4f8f281ab028d2c70' }),
    });

    render(<Md5Form getMd5={getMd5} />);

    const inputElement = screen.getByRole('textbox');
    const submitBtn = screen.getByRole('button', { name: /send/i });

    userEvent.type(inputElement, 'test text');
    userEvent.click(submitBtn);

    await waitFor(() => {
      expect(
        screen.getByText('1e2db57dd6527ad4f8f281ab028d2c70', {
          selector: '.data-md5',
        })
      ).toBeInTheDocument();
    });

    userEvent.clear(inputElement);
    userEvent.type(inputElement, 'new text');

    await waitFor(() => {
      expect(
        screen.queryByText('1e2db57dd6527ad4f8f281ab028d2c70', {
          selector: '.data-md5',
        })
      ).not.toBeInTheDocument();
    });

    window.fetch.mockRestore();
  });
});
