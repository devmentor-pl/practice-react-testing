import CreditCard from './CreditCard'
import {render, screen } from '@testing-library/react'
import  userEvent  from '@testing-library/user-event'

it('should have input', () => {
    const {container} = render(<CreditCard/>)
    
    const input = container.querySelector('input')
    expect(input).toBeInTheDocument()
})

it('should inform when did not found matching producer', () => {
    const {container} = render(<CreditCard/>)

    const input = container.querySelector('input')
    userEvent.type(input, '3526156135105616')
    const button = container.querySelector('button')
    userEvent.click(button)

    const info = screen.getByText('No matching producer!')

    expect(info).toBeInTheDocument()
})

it('should inform when did found matching producer - VISA', () => {
    const {container} = render(<CreditCard/>)

    const input = container.querySelector('input')
    userEvent.type(input, '4506156335105616')
    const button = container.querySelector('button')
    userEvent.click(button)

    const producer = screen.getByText('VISA')

    expect(producer).toBeInTheDocument()
})

it('should inform when did found matching producer - MasterCard', () => {
    const {container} = render(<CreditCard/>)

    const input = container.querySelector('input')
    userEvent.type(input, '5138493020403946')
    const button = container.querySelector('button')
    userEvent.click(button)

    const producer = screen.getByText('MasterCard')

    expect(producer).toBeInTheDocument()
})

it('should inform when card number is to short', () => {
    const {container} = render(<CreditCard/>)

    const input = container.querySelector('input')
    userEvent.type(input, '123')
    const button = container.querySelector('button')
    userEvent.click(button)

    const info = screen.getByText('Wrong card number')

    expect(info).toBeInTheDocument()
})

