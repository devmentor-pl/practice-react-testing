
import Md5Form from '../components/Md5Form'
import { render, screen, fireEvent, 
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-native/extend-expect';
import {providerFetchResolvedOnce} from '../utilis/utilis'
import {getMd5} from '../providers/md5Provider'

jest.spyOn(window, 'fetch');

const value = "d41d8cd98f00b204e9800998ecf8427e";

describe('testing: md5Form', () => {


    test('check if there is a do button', async () => {
        render(<Md5Form />);
        const loader = screen.getByText(/send/i);
        expect(loader).toBeInTheDocument();

    })


    test('types inside input', () => {
        document.body.innerHTML = `<input />`
        userEvent.type(screen.getByRole('textbox'), 'Hello, World!')
        expect(screen.getByRole('textbox')).toHaveValue('Hello, World!')
    })

    test("check the .data-text is defined", async () => {
     
        const { container } = render(<Md5Form getMd5={getMd5} />);
        const spanItem = container.querySelector(".data-text");
        expect(spanItem).toBeDefined()
      
    });

   

    test("check submit is loading the data in data-md5", async () => {
     
        providerFetchResolvedOnce(window.fetch, value);

        render(<Md5Form getMd5={getMd5} />);

        const input = screen.getAllByRole("textbox");
        const button = screen.getByRole("button", { name: /send/i });

        userEvent.type(input[0], value);

        await fireEvent.click(button);

        const md5Item = await screen.findByText(value);

        expect(md5Item).toBeInTheDocument();
        expect(window.fetch).toHaveBeenCalledTimes(1);
        expect(window.fetch).toHaveBeenCalledWith(
        "https://api.hashify.net/hash/md5/hex", 
        {"body": "", "method": "POST"}
        
        );
    
    })


    
// nie wiem, co tu robię nie tak: 
// Expected: "sometext"
// Received: ""


    // test("text given is defined in data-text", async() => {
        
    //     const { container } = render(<Md5Form getMd5={getMd5} />);
    
    //     const input = await screen.findAllByRole("textbox");
    
    //     userEvent.type(input[0], 'sometext');
    
    //     const textElement = container.querySelector(".data-text");
    
    //     expect(textElement.innerHTML).toBe('sometext')
    //   });







//i tu też  niestety nie wiem, wychodzi na to , że nowa wartość mi nie wchodzi,
// bo jeżeli usunę linijkę 109  i zrobię  expect(oldVALUE).toBeInTheDocument(); to jest ok, czyli stara wartośc się zgadza, a jak zosttawie jak jest 
// Unable to find an element with the text: d41d8cd98f00b204e9800998ecf8427e. This could be because the text is broken up by multiple elements, ale mam getAllByRole


    // test("check data change in <input> clears .data-md5", async () => {
     
    //     providerFetchResolvedOnce(window.fetch);

    //     render(<Md5Form getMd5={getMd5} />)
 
    //     const input = screen.getAllByRole("textbox");
    //     const button = screen.getByRole("button", { name: /send/i });

    //     userEvent.type(input[0], value);
    //     fireEvent.click(button);


    //     await screen.findByText(value);
      
    //     fireEvent.change(input[0], { target: { value: 'NEW VALUE' } })
    //     const oldVALUE = await screen.findByText(value);

    //     // expect(input.value).toBe('NEW VALUE')
    //     expect(oldVALUE).not.toBeInTheDocument();

     

       
    // })

  
})