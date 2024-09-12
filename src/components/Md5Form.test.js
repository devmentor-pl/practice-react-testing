/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { screen, render, waitFor } from '@testing-library/react';
import Md5Form from './Md5Form';
import { getMd5 } from '../providers/md5Provider';
import userEvent from '@testing-library/user-event';

jest.spyOn(window, 'fetch')

describe('Md5Form component', () => {
    it('find typed text within element of class .data-text', () => {
        render(<Md5Form getMd5={getMd5}/>)
        const input = screen.getByRole('textbox');
        const testText = 'test';
        expect(input).toBeInTheDocument();
        userEvent.type(input, testText);
        const classElement = screen.getByText(testText, {className: 'data-text'})
        expect(classElement).toBeInTheDocument()
    });
    it('should render data in md5Element on submit form', async () => {
        
        const {container} = render(<Md5Form getMd5={getMd5}/>)
        const button = screen.getByText('send');
        const input = screen.getByRole('textbox');

        const md5Element = container.querySelector('.data-md5');

        expect(button).toBeInTheDocument();

        expect(md5Element).toBeInTheDocument();
        
        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return {Digest: 'test1'}
            }
        });
        userEvent.type(input, 'test2');
        userEvent.click(button);
        await waitFor(() => {
            expect(md5Element.textContent).toBe('test1')
        })
    })
    it('should clear mdElement', async() => {
        const {container} = render(<Md5Form getMd5={getMd5}/>);
        const input = screen.getByRole('textbox');
        const button = screen.getByText('send');
        const md5Element = container.querySelector('.data-md5');

        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return {Digest: 'test1'}
            }
        });

        userEvent.type(input, 'abc');
        userEvent.click(button);

        await waitFor(() => {
            expect(md5Element.textContent).toBe('test1');
        }) 
        userEvent.type(input, 'a');

        await waitFor(() => {
            expect(md5Element.textContent).toBe('');
        }) 

    })
})