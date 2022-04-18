import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { getMd5 } from '../providers/md5Provider';
import Md5Form from './Md5Form';

jest.spyOn(window, 'fetch');

describe('Md5Form', ()=>{
    test('check if text field exist', ()=>{
        render(<Md5Form getMd5={getMd5}/>)

        const text = screen.getByLabelText('');
        expect(text).toBeInTheDocument();
    });

    test('check if button tag exist', ()=>{
        render(<Md5Form getMd5={getMd5}/>)

        const button = screen.getByRole('button', {name: 'send'} );
        expect(button).toBeInTheDocument();
    });

    test('check if the proper text is displayed in span', ()=>{
        const { container } = render(<Md5Form getMd5={getMd5}/>)

        const text = screen.getByLabelText('');
        userEvent.type(text, "test")

        const span = container.querySelector(".data-text");
        expect(span.textContent).toBe("test")
    });
    test('check if the proper text is displaye in strong', async ()=>{
        const { container } = render(<Md5Form getMd5={getMd5}/>)

        const text = screen.getByLabelText('');
        userEvent.type(text, "test");
        const result = '098f6bcd4621d373cade4e832627b4f6';
        
        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return {Digest: result};
            },
        })
                
        await waitFor(() =>{
            const button = screen.getByRole('button', {name: 'send'} );
            userEvent.click(button);
        })
        const strong = container.querySelector(".data-md5");
        expect(strong.textContent).toBe(result)
    });

    test('check if strong is empty after overwriting input', async ()=>{
        const { container } = render(<Md5Form getMd5={getMd5}/>)

        const text = screen.getByLabelText('');
        userEvent.type(text, "test");
        const result = '098f6bcd4621d373cade4e832627b4f6';
        
        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return {Digest: result};
            },
        })
                
        await waitFor(() =>{
            const button = screen.getByRole('button', {name: 'send'} );
            userEvent.click(button);
        })
               
        userEvent.type(text, "test2");
        const strong = container.querySelector(".data-md5");
        expect(strong.textContent).toBe('')
    });
})