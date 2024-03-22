import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Md5Form from './Md5Form';

describe('Md5Form Component', () => {
    let getMd5Mock;

    beforeEach(() => {
        getMd5Mock = jest.fn();
    });

    test('displays text entered into the input field in .data-text element', () => {
        const { getByLabelText, getByText } = render(<Md5Form getMd5={getMd5Mock} />);
        const input = getByLabelText(/input/i); 
        const text = 'test input';

        fireEvent.change(input, { target: { value: text } });
        
        expect(getByText(text)).toBeInTheDocument();
    });

    test('loads fetched data into .data-md5 element upon form submission', async () => {
        const md5Hash = '098f6bcd4621d373cade4e832627b4f6'; 
        getMd5Mock.mockResolvedValue(md5Hash);
        const { getByLabelText, getByText, getByRole } = render(<Md5Form getMd5={getMd5Mock} />);
        const input = getByLabelText(/input/i);
        fireEvent.change(input, { target: { value: 'test' } });
        fireEvent.submit(getByRole('button'));

        await waitFor(() => expect(getByText(md5Hash)).toBeInTheDocument());
    });

    test('clears .data-md5 content upon input change', () => {
        const { getByLabelText, queryByText } = render(<Md5Form getMd5={getMd5Mock} />);
        const input = getByLabelText(/input/i);
        fireEvent.change(input, { target: { value: 'initial text' } });
        fireEvent.change(input, { target: { value: 'new text' } });

        expect(queryByText('=>')).toBeNull(); 
    });
});
