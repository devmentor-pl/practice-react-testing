import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreditCards from "../components/CreditCards";

describe("testing: CreditCard", () => {


  test("check if the entered card number is correct", () => {
    render(<CreditCards />);

    const cardNumber = "371449635398431";
    const input = screen.getByRole("textbox");

    userEvent.type(input, cardNumber);

    const info = screen.getByText('Card is valid');
    expect(info).toBeInTheDocument();

   })


  test("check if the entered card number is not correct", () => {
    render(<CreditCards />);

    const cardNumber = "343444343371449635398431";
    const input = screen.getByRole("textbox");

    userEvent.type(input, cardNumber);

    const info = screen.getByText('Card is not valid');
    expect(info).toBeInTheDocument();

   })


  test("check if the entered card number is from AmericanExpress", () => {
    render(<CreditCards />);

    const cardNumberAmericanExprexx = "371449635398431";
    const input = screen.getByRole("textbox");

    userEvent.type(input, cardNumberAmericanExprexx);

    const infoCardIsValid = screen.getByText('Card is valid');
    const infoCardType = screen.getByText('Card is type: americanexpress');
    expect(infoCardIsValid).toBeInTheDocument();
    expect(infoCardType).toBeInTheDocument();

   })


  test("check if the entered card number is from visa", () => {
    render(<CreditCards />);

    const cardNumberVisa = "4111111111111111";
    const input = screen.getByRole("textbox");

    userEvent.type(input, cardNumberVisa);

    const infoCardIsValid = screen.getByText('Card is valid');
    const infoCardType = screen.getByText('Card is type: visa');
    expect(infoCardIsValid).toBeInTheDocument();
    expect(infoCardType).toBeInTheDocument();

   })


  test("check if the entered card number is from MasterCard", () => {
    render(<CreditCards />);

    const cardNumberMC = "5555555555554444";
    const input = screen.getByRole("textbox");

    userEvent.type(input, cardNumberMC);

    const infoCardIsValid = screen.getByText('Card is valid');
    const infoCardType = screen.getByText('Card is type: mastercard');
    expect(infoCardIsValid).toBeInTheDocument();
    expect(infoCardType).toBeInTheDocument();

   })


  test("check if the entered card number is from Diners Club", () => {
    render(<CreditCards />);

    const cardNumberDinersClub = "30569309025904";
    const input = screen.getByRole("textbox");

    userEvent.type(input, cardNumberDinersClub);

    const infoCardIsValid = screen.getByText('Card is valid');
    const infoCardType = screen.getByText('Card is type: dinerclub');
    expect(infoCardIsValid).toBeInTheDocument();
    expect(infoCardType).toBeInTheDocument();

   })


  test("check if the entered card number is from JCB", () => {
    render(<CreditCards />);

    const cardNumberJCB = "3530111333300000";
    const input = screen.getByRole("textbox");

    userEvent.type(input, cardNumberJCB);

    const infoCardIsValid = screen.getByText('Card is valid');
    const infoCardType = screen.getByText('Card is type: jcb');
    expect(infoCardIsValid).toBeInTheDocument();
    expect(infoCardType).toBeInTheDocument();

   })


  test("check if the entered card number is from discover", () => {
    render(<CreditCards />);

    const cardNumberDiscover = "6011111111111117";
    const input = screen.getByRole("textbox");

    userEvent.type(input, cardNumberDiscover);

    const infoCardIsValid = screen.getByText('Card is valid');
    const infoCardType = screen.getByText('Card is type: discover');
    expect(infoCardIsValid).toBeInTheDocument();
    expect(infoCardType).toBeInTheDocument();

   })







})