import CardVerifier from "../components/CardVerifier";
import {  render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import cards from '../data/cards';

jest.spyOn(window, 'fetch')

const setup = () => {
 return render(<CardVerifier />)
}

describe('CardVerifier', () => {
  it('should have card number input', () => {
    setup()
    const input = document.querySelector('input')
    expect(input).toBeInTheDocument()
  })

  it('should have button', () => {
    setup()
    const button = screen.getByRole(/button/i)
    expect(button).toBeInTheDocument()
  })

  it('should display value typed into input field', () => {
    setup()
    const input = document.querySelector('input')
    userEvent.type(input, 'abc')
    expect(input).toHaveValue('abc')
  })

  it('should throw Error when submitting an empty input', async () => {
    setup()
    const button = screen.getByRole(/button/i)
    userEvent.click(button)
    const error = await screen.findByText('Please enter card number, this field is mandatory')
    expect(error).toBeInTheDocument()
  })

  it('should remove error message when input value changes', async () => {
    setup()
    const input = document.querySelector('input')
    const button = screen.getByRole(/button/i)
    userEvent.click(button)
    const error = await screen.findByText('Please enter card number, this field is mandatory')
    userEvent.type(input, '123')
    expect(error).not.toBeInTheDocument()
  })

  it('should throw Error when card number is incorrect', async () => {
    setup()
    const input = document.querySelector('input')
    const button = screen.getByRole(/button/i)
    userEvent.type(input, 'abcedf')
    userEvent.click(button)
    const error = await screen.findByText('Invalid card number provided')
    expect(error).toBeInTheDocument()
  })

  it('should detect card type when a valid card number is provided', async () => {
    setup()
    const input = document.querySelector('input')
    const button = screen.getByRole(/button/i)
  
    for (const type in cards) {
      userEvent.clear(input)
      userEvent.type(input, cards[type])
      screen.debug()
      userEvent.click(button)
      const typeInfo = await screen.findByText(`Card type: ${type}`)
      screen.debug()
      expect(typeInfo).toBeInTheDocument()
    }      
  })

  it('should throw Error when card number is valid but no type detected', async () => {
    setup()
    const input = document.querySelector('input')
    const button = screen.getByRole(/button/i)
    userEvent.type(input, '000000000000000000')
    userEvent.click(button)
    const error = await screen.findByText('Check the provided card number, type not detected')
    expect(error).toBeInTheDocument()
  })  
})