import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card from './Card'

describe('card', () => {
  it('should not validate card number', async () => {
    render(<Card />)

    const wrongCardNumber = '4713201712051476'

    const input = screen.getByRole('textbox')
    const button = screen.getByRole('button')

    userEvent.type(input, wrongCardNumber)
    userEvent.click(button)

    const error = await screen.findByText(/Wrong card number/i)

    expect(error).toBeInTheDocument()
  })

  it('should validate card number for visa', async () => {
    render(<Card />)

    const rightVisaCardNumber = '4111111111111111'

    const input = screen.getByRole('textbox')
    const button = screen.getByRole('button')

    userEvent.type(input, rightVisaCardNumber)
    userEvent.click(button)

    const visaInfo = await screen.findByText(/visa/i)

    expect(visaInfo).toBeInTheDocument()
  })

  it('should validate card number for MasterCard', async () => {
    render(<Card />)

    const rightVisaCardNumber = '5555555555554444'

    const input = screen.getByRole('textbox')
    const button = screen.getByRole('button')

    userEvent.type(input, rightVisaCardNumber)
    userEvent.click(button)

    const visaInfo = await screen.findByText(/master/i)

    expect(visaInfo).toBeInTheDocument()
  })
})