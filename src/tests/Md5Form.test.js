import {render, screen, waitFor} from '@testing-library/react'
import  userEvent  from '@testing-library/user-event'
import Md5Form from '../components/Md5Form'
import {getMd5} from '../providers/md5Provider'

jest.spyOn(window, 'fetch');

describe('Md5 form test', () => {
    test('should contain an input', () => {
        render(<Md5Form getMd5={getMd5}/>)

        const input = screen.getByLabelText('')
        expect(input).toBeInTheDocument()
    })

    test('should return ok if text appears in data.text element', async () => {
        render(<Md5Form getMd5={getMd5}/>)

        const input = screen.getByLabelText('')
        const text = 'test'
        
        userEvent.type(input, text)
        const textAppears = await screen.findByText(text)
        expect(textAppears).toBeInTheDocument()
    })

    test('should return ok if data appears in data-md5 element', async () => {
        const {container} = render(<Md5Form getMd5={getMd5}/>)

        const result = 'd41d8cd98f00b204e9800998ecf8427e'
        const input = screen.getByLabelText('')
        const button = screen.getByRole('button', {name: /send/i})
        const element = container.querySelector('.data-md5')
        
        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return {Digest: result}
            }
        })

        await waitFor(() => {
            userEvent.type(input, 'test')
            userEvent.click(button)
        }) 

        expect(element).toBeInTheDocument()
        expect(element.textContent).toBe(result)
    })

    test('should return ok if data-md5 element is cleared after input change', async () => {
        const {container} = render(<Md5Form getMd5={getMd5}/>)

        const result = 'd41d8cd98f00b204e9800998ecf8427e'
        const input = screen.getByLabelText('')
        const button = screen.getByRole('button', {name: /send/i})
        const element = container.querySelector('.data-md5')
        
        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return {Digest: result}
            }
        })

        await waitFor(() => {
            userEvent.type(input, 'test')
            userEvent.click(button)
            userEvent.type(input, 'test test')
        }) 

        expect(element).toBeInTheDocument()
        expect(element.textContent).toBe('')
    })


})