import React, { useState } from "react";
import { cards } from "../db/cards";

const CardForm = () => {
    const [cardNumber, setCardNumber] = useState('')
    const [error, setError] = useState('')
    const [cardProducer, setCardProducer] = useState('')

    const checkCardNumberProducer = () => {
        const firstNumber = cardNumber[0]

        const cardInfo = cards.filter(card => card.firstNumber === Number(firstNumber))
        const { name } = cardInfo[0]

        setCardProducer(name)
    }

    const countCardNumbersSum = () => {
        const cardNumberArr = cardNumber.split('')
        const cardNumberArrWithRatio = cardNumberArr.map((num, index) => {
            return index % 2 === 0 ? Number(num) * 2 : Number(num)
        })
        const singleNumbersArr = cardNumberArrWithRatio.join('').split('')
        const sum = singleNumbersArr.reduce((a, b) => Number(a) + Number(b))

        return sum
    }

    const changeHandler = (e) => {
        setError('')
        setCardProducer('')
        setCardNumber(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault()

        if (isNaN((cardNumber))) {
            setError('The value must be a number')
            return
        }

        if (cardNumber.length < 13 || cardNumber.length > 16) {
            setError('The value must contains 13-16 numbers')
            return
        }

        const cardNumberSum = countCardNumbersSum()

        if (cardNumberSum % 10 !== 0) {
            setError('Incorrect number')
            return
        }

        checkCardNumberProducer()
    }

    return (
        <form onSubmit={submitHandler}>
            <label>
                Card number: <input
                    type="text"
                    value={cardNumber}
                    onChange={changeHandler}
                />
            </label>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {cardProducer && <p style={{ color: 'green' }}>Card Producer: {cardProducer}</p>}
            <p>
                <input type="submit" value='send' />
            </p>
        </form>
    )
}

export default CardForm
