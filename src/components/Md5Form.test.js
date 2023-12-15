import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Md5Form from './Md5Form';
import { getMd5 } from '../providers/md5Provider';

describe('Md5Form', () => {
    it('should show input value in data-text element', () => {
        const text = 'text';

        render(<Md5Form />);

        const inputElement = screen.getByRole('textbox');
        userEvent.type(inputElement, text);

        const dataTextElement = screen.getByText(text);
        expect(dataTextElement).toBeInTheDocument();
        expect(dataTextElement).toHaveClass('data-text');
    });

    it('should display hash when getMd5 resolves successfully', async () => {
        const text = 'text';
        const mockMd5Hash = 'd41d8cd98f00b204e9800998ecf8427e';

        const spy = jest.spyOn(window, 'fetch');

        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return { Digest: mockMd5Hash };
            },
        });

        render(<Md5Form getMd5={getMd5} />);
        const inputElement = screen.getByRole('textbox');
        userEvent.type(inputElement, text);

        const button = screen.getByRole('button', { name: /send/i });
        userEvent.click(button);

        const hashEl = await screen.findByText(mockMd5Hash);
        expect(hashEl).toBeInTheDocument();

        spy.mockRestore();
    });

    it('clears data-md5 when input changes', async () => {
        const text = 'text';
        const mockMd5Hash = 'd41d8cd98f00b204e9800998ecf8427e';

        const spy = jest.spyOn(window, 'fetch');

        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return { Digest: mockMd5Hash };
            },
        });

        render(<Md5Form getMd5={getMd5} />);
        const inputElement = screen.getByRole('textbox');
        userEvent.type(inputElement, text);

        const button = screen.getByRole('button', { name: /send/i });
        userEvent.click(button);

        await screen.findByText(mockMd5Hash);
        userEvent.type(inputElement, 'next');

        await waitFor(() => {
            const hashEl = screen.queryByText(mockMd5Hash);
            expect(hashEl).not.toBeInTheDocument();
        });

        spy.mockRestore();
    });
});
