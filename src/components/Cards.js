import React, { useState } from 'react'

const Cards = () => {
    const [number, setNumber] = useState('')
    const [correctNumber, setCorrectNumber] = useState(false)
    const [kindCard, setKindCard] = useState('')
    const [enter, setEnter] = useState(false)

    function checkValue(val) {
        return val.length <= 16 ? true : false
    }
    const onInput = e => {
        const value = e.target.value
        if (checkValue(value)) {
            setNumber(value)
        } else {
            console.log('Error')
        }
        setEnter(false)
    }
    const convertNumToArr = number => {
        console.log(number)
        return String(number).split("").map((num) => Number(num))
    }
    const sumOfArr = number => {
        return number.reduce((pre, next) => pre + next, 0)
    }

    const checkCard = (number) => {
        console.log(number)
        console.log('length', number.length)
        if (number[0] === 4 && (number.length === 16 || number.length === 13)) {
            setKindCard('VISA')
        } else if (
            number[0] === 5 && number.length === 16 && (
                number[1] === 1 ||
                number[1] === 2 ||
                number[1] === 3 ||
                number[1] === 4 ||
                number[1] === 5
            )
        ) {
            setKindCard('MasterCard')
        } else if (
            number[0] === 3 && number.length === 15 && (
                number[1] === 4 ||
                number[1] === 7
            )
        ) {
            setKindCard('American Express')
        } else if (
            number[0] === 3 && number.length === 14 && (
                number[1] === 0 ||
                number[1] === 6 ||
                number[1] === 8
            )
        ) {
            setKindCard('Diners Club')
        } else {
            setCorrectNumber(false)
        }
    }

    const onSubmit = e => {
        e.preventDefault()
        setEnter(true)
        const numberArr = convertNumToArr(number)
        console.log(numberArr)
        let numbersOneString = ''
        let numbersTwoString = ''
        numberArr.forEach((number, index) => {
            if (index % 2 === 0) {
                const numberTimes = number * 2
                numbersOneString += numberTimes.toString()
            } else {
                const numberTimes = number * 1
                numbersTwoString += numberTimes.toString()
            }
        })
        const numberOneArr = convertNumToArr(numbersOneString)
        const numberTwoArr = convertNumToArr(numbersTwoString)

        const sumOneRow = sumOfArr(numberOneArr)
        const sumTwoRow = sumOfArr(numberTwoArr)

        const sum = sumOneRow + sumTwoRow
        console.log('sum', sum)

        if (sum % 10 === 0) {
            setCorrectNumber(true)
            checkCard(numberArr)
        } else {
            setCorrectNumber(false)
            // checkCard(numberArr)
        }
    }

    return (
        <div>
            <div>recognize cards: Visa, MasterCard, American Express, Biner Club</div>
            <hr />
            {/* <div>Examples of credit card numbers</div>
            <div>5575373225509616 - MasterCard OK </div>
            <div>4874742029558527 - VISA OK</div>
            <div>4140719398084341 - VISA OK</div>
            <div>4213523283653018 - VISA 16 digs OK</div>
            <div>4213523283653    - VISA 13 digs OK  </div>
            <div>42135232836530   - VISA 14 digs NO </div> */}
            <form onSubmit={onSubmit}>
                <label>number cars</label>
                <input type="number" onChange={onInput}
                    value={number}
                />
                <button>check</button>
            </form><br />
            <div>
                Numer karty: <b>{number}</b>
            </div>
            <div>
                {enter
                    ?
                    correctNumber
                        ? <span style={{ color: 'green' }}>Rodzaj karty: <b>{kindCard}</b></span>
                        : <span style={{ color: 'red' }}>Niepoprawna karta</span>
                    : null
                }
            </div>
        </div>
    )
}

export default Cards