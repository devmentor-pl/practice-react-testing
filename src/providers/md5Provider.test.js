import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import  userEvent  from '@testing-library/user-event'
import {getMd5} from './md5Provider'
import Md5Form from './../components/Md5Form'

jest.spyOn(window, 'fetch');

describe('test component Md5Form', () => {
    test('should contain an input', () => {
        render(<Md5Form getMd5={getMd5}/>)

        const input = screen.getByLabelText('')
        expect(input).toBeInTheDocument()
    })

    test('should get the same value of Input', async () => {
        render(<Md5Form getMd5={getMd5}/>)

        const input = screen.getByLabelText('')

        userEvent.type(input, 'secret')
        const textFromInput = await screen.findByText('secret')
        expect(textFromInput).toBeInTheDocument()
    })
})

describe('test fetch by spyOn', () => {

    it('should fetch data by simple data', async () => {
        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return { Digest: 'test' };
            },
        });

        const data = await getMd5();
        expect(data).toBe('test');
    });

    it('should fetch data type md5', async () => {
        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return { Digest: 'b9e1ff48631a0bd16143542703c341c5' };
            },
        });

        const data = await getMd5();
        expect(data).toBe('b9e1ff48631a0bd16143542703c341c5');
    });

    it('check param getMd5 for option with POST', async () => {
        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return { Digest: 'test' };
            },
        });

        const data = await getMd5('b9e1ff48631a0bd16143542703c341c5');
        expect(data).toBe('test');
        expect(window.fetch).toHaveBeenCalledTimes(1);
        expect(window.fetch).toHaveBeenCalledWith(
            'https://api.hashify.net/hash/md5/hex', 
            {"body": "b9e1ff48631a0bd16143542703c341c5", "method": "POST"}
        );
    });

    it('should get data after click button', async () => {
        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return { Digest: 'test' };
            },
        });
        render(<Md5Form getMd5={getMd5}/>)
        const button = await screen.findByRole('button', { name: 'send' });
        fireEvent.click(button);
        const ip = await screen.findByText('test');
        expect(ip).toBeInTheDocument();
    });

    it('should get data after click button using getByRole', async () => {
        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return { Digest: 'b9e1ff48631a0bd16143542703c341c5' };
            },
        });
        render(<Md5Form getMd5={getMd5}/>)
        await waitFor(() => {
            const button = screen.getByRole('button', { name: 'send' });
            fireEvent.click(button);
        })

        const ip = await screen.findByText('b9e1ff48631a0bd16143542703c341c5');
        expect(ip).toBeInTheDocument();
    });

    test('should give result the same after click button', async () => {
        const {container} = render(<Md5Form getMd5={getMd5}/>)

        const result = '098f6bcd4621d373cade4e832627b4f6'
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
            userEvent.type(input, 'xxx')
            userEvent.click(button)
        }) 

        expect(element).toBeInTheDocument()
        expect(element.textContent).toBe(result)
    })

    test('should get value after click in button', async () => {
        const {container} = render(<Md5Form getMd5={getMd5}/>)

        const result = '098f6bcd4621d373cade4e832627b4f6'
        const button = screen.getByRole('button', {name: /send/i})
        const element = container.querySelector('.data-md5')

        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return {Digest: result}
            }
        })
        
        await waitFor(() => {
            userEvent.click(button)
        }) 
        
        expect(element.textContent).toBe(result)
    })
});








