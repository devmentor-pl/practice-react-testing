import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Md5Form from './Md5Form';
import { getMd5 } from './../providers/md5Provider';

describe('<Md5Form', () => {
    test('input -> span', async () => {
        const text = '123';

        render(<Md5Form />);

        const input = await screen.findByRole('textbox');
        userEvent.type(input, text);

        const span = await screen.findByText(text);

        expect(span).toBeInTheDocument();
    });

    test('input -> strong', async () => {
        const text = '123';
        const md5 = '202cb962ac59075b964b07152d234b70';

        const spy = jest.spyOn(window, 'fetch');
        window.fetch.mockResolvedValue({
            ok: true,
            json: async () => {
                return { Digest: md5 }
            }
        })

        render(<Md5Form getMd5={getMd5} />);

        const input = await screen.findByRole('textbox');
        userEvent.type(input, text);

        const button = await screen.findByRole('button');
        userEvent.click(button);

        await waitFor(async () => {
            const strong = await screen.findByText(md5);
            expect(strong).toBeInTheDocument();
        })

        spy.mockClear();
    });

    test('change input -> clear md5', async () => {
        const text = '123';
        const md5 = '202cb962ac59075b964b07152d234b70';

        const spy = jest.spyOn(window, 'fetch');
        window.fetch.mockResolvedValue({
            ok: true,
            json: async () => {
                return { Digest: md5 }
            }
        })

        render(<Md5Form getMd5={getMd5} />);

        const input = await screen.findByRole('textbox');
        userEvent.type(input, text);

        const button = await screen.findByRole('button');
        userEvent.click(button);

        await waitFor(async () => {
            const strong = await screen.findByText(md5);
            expect(strong).toBeInTheDocument();

            userEvent.type(input, 'a');

            await waitFor(() => {
                const strong = screen.queryByText(md5);

                expect(strong).not.toBeInTheDocument();
            })
        })

        spy.mockClear();
    })
})