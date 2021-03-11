
import Md5Form from '../components/Md5Form'
import { render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-native/extend-expect';

jest.spyOn(window, 'fetch');


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


    // test('uses jest-dom', () => {
    //     document.body.innerHTML = `
    //             <p>
    //             <span className="data-text">{text}</span>
    //             { md5 && <span>=&gt;</span> }
    //             <strong className="data-md5">{md5}</strong>
    //             </p>
    //     `
      
    //     expect(screen.queryByTestId('not-empty')).not.toBeEmptyDOMElement()
    //     expect(screen.getByText('Visible Example')).toBeVisible()
    //   })




 })
