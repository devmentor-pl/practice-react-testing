import { render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import Md5Form from "../Md5Form";
import { getMd5 } from "../../providers/md5Provider";

jest.spyOn(window, 'fetch');

describe('Md5Form', () => {
    it('should render component Md5Form', () => {
        render(<Md5Form />);
        const buttonElement = screen.getByRole('button', { name: /send/i });
        expect(buttonElement).toBeInTheDocument();
    });
    it('text provided to input should render', async () => {
        render(<Md5Form getMd5={getMd5} />);
        const inputElement = screen.getByLabelText('');
        userEvent.type(inputElement, 'ok');
        const testText = await screen.findByText('ok');
        expect(testText).toBeInTheDocument();
    });
    it('form should render correct data', async () => {
        const { container } = render(<Md5Form getMd5={getMd5} />);
        const result = '444bcb3a3fcf8389296c49467f27e1d6'
        const buttonElement = screen.getByRole('button', { name: /send/i });
        const inputElement = screen.getByLabelText('');
        const element = container.querySelector('.data-md5');
        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return {
                    Digest: result,
                }
            }
        })
        userEvent.type(inputElement, 'ok');
        userEvent.click(buttonElement);
        await waitFor(() => {
            expect(element.textContent).toBe(result);
        })
    })
    it(`new value input should clear 'data-md5' value`, async () => {
        const { container } = render(<Md5Form getMd5={getMd5} />);
        const result = '444bcb3a3fcf8389296c49467f27e1d6'
        const buttonElement = screen.getByRole('button', { name: /send/i });
        const inputElement = screen.getByLabelText('');
        const element = container.querySelector('.data-md5');
        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return {
                    Digest: result,
                }
            }
        })
        userEvent.type(inputElement, 'ok');
        userEvent.click(buttonElement);
        userEvent.type(inputElement, 'ok ok');
        await waitFor(() => {
            expect(element.textContent).toBe('');
        })
    })
})