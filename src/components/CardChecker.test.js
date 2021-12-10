import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import correctCardsCollection from '../providers/correctCardsCollection'
import CardChecker from "./CardChecker";

describe('CardChecker tests suite', () => {

    test('component rendered correctly', () => {
        render(<CardChecker />)
        const cardNumberEl = screen.getByLabelText('Insert card number:')

        expect(cardNumberEl).toBeInTheDocument()
    })

    test('error on incorrect card number', async () => {
        render(<CardChecker />)
        const cardNumberEl = screen.getByLabelText('Insert card number:')
        const verifyEl = screen.getByRole('button', { name: /verify/i })

        userEvent.type(cardNumberEl, '1111111111111111')
        userEvent.click(verifyEl)

        const errorMsg = await screen.findByText('Wrong card number')
        expect(errorMsg).toBeInTheDocument()
    })

    test('error on correct card number and unknown provider', async () => {
        render(<CardChecker />)
        const cardNumberEl = screen.getByLabelText('Insert card number:')
        const verifyEl = screen.getByRole('button', { name: /verify/i })

        userEvent.type(cardNumberEl, '1234567890123452')
        userEvent.click(verifyEl)

        const errorMsg = await screen.findByText('Card type not detected')
        expect(errorMsg).toBeInTheDocument()
    })

    test('Visa providers recognized', async () => {
        render(<CardChecker />)
        const cardNumberEl = screen.getByLabelText('Insert card number:')
        const verifyEl = screen.getByRole('button', { name: /verify/i })

        userEvent.type(cardNumberEl, correctCardsCollection['Visa'])
        userEvent.click(verifyEl)
        const msg = await screen.findByText(`Number detected as: Visa`)

        expect(msg).toBeInTheDocument()
    })

    test('MasterCard providers recognized', async () => {
        render(<CardChecker />)
        const cardNumberEl = screen.getByLabelText('Insert card number:')
        const verifyEl = screen.getByRole('button', { name: /verify/i })

        userEvent.type(cardNumberEl, correctCardsCollection['MasterCard'])
        userEvent.click(verifyEl)
        const msg = await screen.findByText(`Number detected as: MasterCard`)

        expect(msg).toBeInTheDocument()
    })

    test('AmericanExpress providers recognized', async () => {
        render(<CardChecker />)
        const cardNumberEl = screen.getByLabelText('Insert card number:')
        const verifyEl = screen.getByRole('button', { name: /verify/i })

        userEvent.type(cardNumberEl, correctCardsCollection['AmericanExpress'])
        userEvent.click(verifyEl)
        const msg = await screen.findByText(`Number detected as: AmericanExpress`)

        expect(msg).toBeInTheDocument()
    })

    test('DCCB providers recognized', async () => {
        render(<CardChecker />)
        const cardNumberEl = screen.getByLabelText('Insert card number:')
        const verifyEl = screen.getByRole('button', { name: /verify/i })

        userEvent.type(cardNumberEl, correctCardsCollection['DCCB'])
        userEvent.click(verifyEl)
        const msg = await screen.findByText(`Number detected as: DCCB`)

        expect(msg).toBeInTheDocument()
    })

    test('JCB providers recognized', async () => {
        render(<CardChecker />)
        const cardNumberEl = screen.getByLabelText('Insert card number:')
        const verifyEl = screen.getByRole('button', { name: /verify/i })

        userEvent.type(cardNumberEl, correctCardsCollection['JCB'])
        userEvent.click(verifyEl)
        const msg = await screen.findByText(`Number detected as: JCB`)

        expect(msg).toBeInTheDocument()
    })

})