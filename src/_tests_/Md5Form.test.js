/* eslint-disable testing-library/no-debugging-utils */
import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event';

import Md5Form from "../components/Md5Form"
import { getMd5 } from "../providers/md5Provider";

xdescribe('Md5Form Component', () => {
    it('renders Md5Form Component', () => {
        render(<Md5Form />)
        screen.debug()
    })
    it('text from input field appears in element with class "data-text"', async () => {
        // czy async/ await jest konieczny? poniżej zakomentowałam alternatywny test, który wydaje mi się, też spełnia swoją funkcję
        render(<Md5Form />)

        const input = screen.getByRole('textbox')
        userEvent.type(input, 'test')

        const span = await screen.findByText('test')
        expect(span).toBeInTheDocument()
    })
    // it.only('text from input field appears in element with class "data-text"', () => {
    //     render(<Md5Form />)

    //     const input = screen.getByRole('textbox')

    //     userEvent.type(input, 'test')

    //     const span = screen.getByText('test')
    //     expect(span).toBeInTheDocument()
    // })
    it('load data to element with class "data-md5"', async () => {
        jest.spyOn(window, 'fetch')
        const txt = '098f6bcd4621d373cade4e832627b4f6'

        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return { Digest: txt }
            }
        })
        render(<Md5Form getMd5={getMd5} />)

        const input = screen.getByRole('textbox')
        userEvent.type(input, 'test')

        const button = screen.getByRole('button')
        userEvent.click(button)

        const strongEl = await screen.findByText(txt)

        expect(strongEl).toBeInTheDocument()
    })
    it('clear element with class "data-md5" when input value change', async () => {
        jest.spyOn(window, 'fetch')
        const txt = '098f6bcd4621d373cade4e832627b4f6'

        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return { Digest: txt }
            }
        })
        render(<Md5Form getMd5={getMd5} />)

        const input = screen.getByRole('textbox')
        userEvent.type(input, 'test')

        const button = screen.getByRole('button')
        userEvent.click(button)

        const strongEl = await screen.findByText(txt)

        userEvent.type(input, 'Test2')

        // expect(strongEl).not.toBeInTheDocument() //też nie do końca rozumiem, dlaczego tak nie działa

        expect(strongEl.textContent).toBe('')
    })
})