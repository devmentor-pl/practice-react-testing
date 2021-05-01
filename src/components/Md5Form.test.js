import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { getMd5 } from '../providers/md5Provider'
import Md5Form from '../components/Md5Form'

jest.spyOn(window, 'fetch')

describe('Md5Form tests suite', () => {
    test('renders form with one input', () => {
        render(<Md5Form getMd5={getMd5} />)
        const inputEl = screen.getByLabelText('')

        expect(inputEl).toBeInTheDocument()
    })

    test('entered text available in .data-text', () => {
        const { container } = render(<Md5Form getMd5={getMd5} />)
        const inputEl = screen.getByLabelText('')
        const text='123'

        userEvent.type(inputEl, text)
        const El = container.querySelector('.data-text')

        expect(El.textContent).toBe(text)
    })

    test('output data loaded into .data-md5', async () => {
        const { container } = render(<Md5Form getMd5={getMd5} />)
        const inputEl = screen.getByLabelText('')
        const inputText = 'inputText'
        const outputMD5 = 'outputMD5';
        const submitEl = screen.getByRole('button', { name: /send/i });
        const MD5El = container.querySelector('.data-md5')

        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return { Digest: outputMD5 }
            },
        })

        userEvent.type(inputEl, inputText)
        userEvent.click(submitEl)

    //waitFor na podstawie https://testing-library.com/docs/dom-testing-library/api-async/
    //czy dobrze użyte?
        await waitFor(() => expect(MD5El.textContent).toBe(outputMD5))
    })

    test('output data cleared in .data-md5 on new data', async () => {
        const { container } = render(<Md5Form getMd5={getMd5} />)
        const inputEl = screen.getByLabelText('')
        const inputText = 'inputText'
        const newInputText = 'newInputText'
        const outputMD5 = 'outputMD5';
        const submitEl = screen.getByRole('button', { name: /send/i });
        const MD5El = container.querySelector('.data-md5')

        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return { Digest: outputMD5 }
            },
        })

        userEvent.type(inputEl, inputText)
        userEvent.click(submitEl)

        await waitFor(() => expect(MD5El.textContent).toBe(outputMD5))

        userEvent.type(inputEl, newInputText)

        expect(MD5El.textContent).toBe('');
    })
})