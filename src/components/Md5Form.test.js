import {getMd5} from '../providers/md5Provider'
import Md5Form from './Md5Form'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

jest.spyOn(window, 'fetch')

it('should fetch data', async () => {
    window.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => {
            return {Digest: '5a1d2d03b68c60644755f33299703b43'}
        }
    })

    const data = await getMd5()
    expect(data).toBe('5a1d2d03b68c60644755f33299703b43')
})

it('should have input element',  () => {
    render(<Md5Form getMd5={getMd5}/>)

    const input = document.querySelector('input')
    expect(input).toBeInTheDocument()
})

it('should show text from input', async () => {
    render(<Md5Form getMd5={getMd5}/>)

    const input = document.querySelector('input')
    
    userEvent.type(input, 'some value')

    const showedText = await screen.findByText('some value')
    expect(showedText).toBeInTheDocument()
})
