/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/no-debugging-utils */
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from '@testing-library/user-event';

import Md5Form from "../components/Md5Form"
import { getMd5 } from "../providers/md5Provider";

xdescribe('Md5Form Component', () => {
    it('renders Md5Form Component', () => {
        render(<Md5Form />)
        screen.debug()
    })
    it('text from input field appears in element with class "data-text"', async () => {
        render(<Md5Form />)

        const input = await screen.findByRole('textbox')
        userEvent.type(input, 'test')

        const span = await screen.findByText('test')
        expect(span).toBeInTheDocument()
    })
    it('load data to element with class "data-md5"', async () => {
        const spy = jest.spyOn(window, 'fetch')
        const txt = '098f6bcd4621d373cade4e832627b4f6'

        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return { Digest: txt }
            }
        })
        render(<Md5Form getMd5={getMd5} />)

        const input = await screen.findByRole('textbox')
        userEvent.type(input, 'test')

        const button = await screen.findByRole('button') 
        userEvent.click(button)

        await waitFor(async () => {
            const strongEl = await screen.findByText(txt)
            expect(strongEl).toBeInTheDocument()
        })

        spy.mockClear()
    })
    it('clear element with class "data-md5" when input value change', async () => {
        const spy = jest.spyOn(window, 'fetch')
        const txt = '098f6bcd4621d373cade4e832627b4f6'

        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return { Digest: txt }
            }
        })
        render(<Md5Form getMd5={getMd5} />)

        const input = await screen.findByRole('textbox')
        userEvent.type(input, 'test')

        const button = await screen.findByRole('button') 
        userEvent.click(button)

        await waitFor(async () => {
            const strongEl = await screen.findByText(txt)
            expect(strongEl).toBeInTheDocument()

            userEvent.type(input, 'Test2')

            await waitFor(() => {
                const strongEl = screen.queryByText(txt)
                expect(strongEl).not.toBeInTheDocument()
            })
        })

        spy.mockClear()
    })
})