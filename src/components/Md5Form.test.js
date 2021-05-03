import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Md5Form from './Md5Form'
import {getMd5} from '../providers/md5Provider';
import { md5FetchResolvedOnce } from '../testUtils';

jest.spyOn(window, 'fetch');

const setup = () => {
    const dom = render(<Md5Form getMd5={getMd5} />);
    const input = screen.getByRole('textbox');

    return {
        input,
        ...dom
    }
}

describe('Md5Form', () => {
    test('should render input on the page', () => {
        const { input } = setup();
        expect(input).toBeInTheDocument();
    })
    
    test('should display text provided in form by user', async () => {
        const { input } = setup();
        userEvent.type(input, 'test1');

        const displayedValue = await screen.findByText(/test1/i);

        expect(displayedValue).toBeInTheDocument();
	});

    test('should fetch data from api when send request', async () => {
        const mockedValue = '0800fc577294c34e0b28ad2839435945';

		md5FetchResolvedOnce(window.fetch, mockedValue);
        const { input } = setup();
        
        const submitBtn = screen.getByRole('button', { name: 'send' });
        
        userEvent.type(input, 'hash');
        userEvent.click(submitBtn);
        
        const apiResponse = await screen.findByText(mockedValue);
        
        expect(apiResponse).toBeInTheDocument();
		expect(window.fetch).toHaveBeenCalledTimes(1);
		expect(window.fetch).toHaveBeenCalledWith(
            'https://api.hashify.net/hash/md5/hex',
			{
                body: 'hash',
				method: 'POST',
			}
            );
        })
        
        test('should hide encryption when new input provided', async () => {
            const userInput = 'example';
            const encryptedOutput = '1a79a4d60de6718e8e5b326e338ae533';
            
            const {x} = md5FetchResolvedOnce(window.fetch, encryptedOutput);
            const { container } = render(<Md5Form getMd5={getMd5} />);

            const input = screen.getByRole('textbox');
            const submitBtn = screen.getByRole('button', { name: 'send' });
            
            // userEvent.type(input, userInput);
            // userEvent.click(submitBtn);
            const resp = await x;
            console.log(x);
            // expect()

            // const resp = 
            // // const span = container.getElementsByClassName('data-md5');
            // const span = container.querySelector('.data-md5');
            // console.log('🚀 ~ test ~ span', span)
            
            // // expect(span).toBeInTheDocument();
            // expect(span).toEqual('example');

            // screen.debug(span);

            // userEvent.type(input, 'eee');
	})
    
    

});


// response hash
// {"Digest":"0800fc577294c34e0b28ad2839435945","DigestEnc":"hex","Type":"MD5","Key":""}

// import Md5Form from './Md5Form'

// describe('<Md5Form />', () => {
    
//     // czy tekst wprowadzony do pola formularza pojawia się w `.data-text`
//     test('should ', () => {
//         const spy = jest.spyOn()
        
//     })
    
// })