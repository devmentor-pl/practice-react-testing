// //Sprawdź przynajmniej kilka rzeczy:

// czy tekst wprowadzony do pola formularza pojawia się w .data-text
// czy wysłanie formularza (event submit) powoduje
//  wczytanie załadowanie danych do .data-md5
// czy zmiana danych w <input> powoduje wyczyszczenie .data-md5

import Md5Form from '../components/Md5Form';
import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {getMd5} from '../providers/md5Provider';

jest.spyOn(window, "fetch");

describe('Md5Form tests', () => {
        it('should render input', function () {
            render(<Md5Form getMd5={getMd5} />);
    
            const inputEl = screen.getByLabelText('')
    
            expect(inputEl).toBeInTheDocument();
        });

    it('entered text should be in the datatext input', async function () {
        
        render(<Md5Form getMd5={getMd5} />)
        const input = screen.getByLabelText('');
        const textEl = '123'
     

        userEvent.type(input, textEl)
        const Element = await screen.findByText(textEl)
        expect(Element).toBeInTheDocument();
    });


    it('should load data if send request', async function () {
        
        const { container } = render(<Md5Form getMd5={getMd5} />)

        const digestData = 'd41d8cd98f00b204e9800998ecf8427e';

        const input = screen.getByLabelText('');
        const button= screen.getByRole('button', {name: /send/i});
        const element = container.querySelector('.data-md5');

        window.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => {
                return {Digest: digestData}
            }
        })

        userEvent.type(input, 'test');
        userEvent.click(button);

        await waitFor(() => {
            expect(element).toBeInTheDocument();
            expect(element.textContent).toBe(digestData);
        })
    });
});
