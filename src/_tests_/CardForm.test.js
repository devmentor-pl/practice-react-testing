import { render, screen } from "@testing-library/react";
import CardForm from "../components/CardForm";
import userEvent from "@testing-library/user-event";

describe('CardForm component', () => {
    it('display component', () => {
        render(<CardForm />)

        expect(screen.getByRole('textbox')).toBeInTheDocument()
    })
    it('show error when empty field submit', async () => {
        render(<CardForm />)

        const input = screen.getByRole('textbox')
        const button = screen.getByRole('button')

        userEvent.type(input, '')
        userEvent.click(button)

        const error = await screen.findByText('The value must contains 13-16 numbers')

        expect(error).toBeInTheDocument()
    })
    it('show error when value is not a number', async () => {
        render(<CardForm />)

        const input = screen.getByRole('textbox')
        const button = screen.getByRole('button')

        userEvent.type(input, 'wrongValue')
        userEvent.click(button)

        const error = await screen.findByText(/The value must be a number/)

        expect(error).toBeInTheDocument()
    })
    it('show error when number is incorrect', async () => {
        render(<CardForm />)

        const input = screen.getByRole('textbox')
        const button = screen.getByRole('button')

        userEvent.type(input, '3111111111111112')
        userEvent.click(button)

        const error = await screen.findByText('Incorrect number')

        expect(error).toBeInTheDocument()
    })
    it('show card producer (American Express) when number is correct', async () => {
        render(<CardForm />)

        const input = screen.getByRole('textbox')
        const button = screen.getByRole('button')

        userEvent.type(input, '3111111111111113')
        userEvent.click(button)

        const producer = await screen.findByText('Card Producer: American Express')

        expect(producer).toBeInTheDocument()
    })
    it('show card producer when number is correct', async () => {
        render(<CardForm />)

        const input = screen.getByRole('textbox')
        const button = screen.getByRole('button')

        userEvent.type(input, '4111111111111111')
        userEvent.click(button)

        const producer = await screen.findByText('Card Producer: Visa')

        expect(producer).toBeInTheDocument()
    })


})