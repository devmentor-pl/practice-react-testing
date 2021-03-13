import Auth from '../components/Auth'
import {providerFetchResolvedOnce} from '../utilis/utilis'
import {render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.spyOn(window, "fetch");

describe("testing: Auth", () => {
  test("check user number 1 is authenticated", async () => {

    const userPass= "8ae75b43f70f20ba564200ef4ab63a33";
    const login = "jan@domena.pl";
    const password = "janeczek";

    providerFetchResolvedOnce(window.fetch, userPass);
    render(<Auth />);

    const loginInput = screen.getByLabelText(/login/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const btn = screen.getByRole("button", { name: /send/i });

    userEvent.type(loginInput, login);
    userEvent.type(passwordInput, password);


    await userEvent.click(btn);
    const info = await screen.findByText(`Jesteś zalogowany jako: ${login}`);

    expect(info).toBeInTheDocument();


  })
  
  test("check user number 2 is authenticated", async () => {

    const userPass2= "c5450079ce3aa5440cdea45c4be193bb";
    const login2 = "marcin@domena.pl";
    const password2 = "marcinek";

    providerFetchResolvedOnce(window.fetch, userPass2);
    render(<Auth />);

    const loginInput = screen.getByLabelText(/login/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const btn = screen.getByRole("button", { name: /send/i });

    userEvent.type(loginInput, login2);
    userEvent.type(passwordInput, password2);

    
    await userEvent.click(btn);
    const info = await screen.findByText(`Jesteś zalogowany jako: ${login2}`);

    expect(info).toBeInTheDocument();


  })

})


