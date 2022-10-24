import React, { useState } from 'react'

const Cards = () => {
    const [number, setNumber] = useState()
    const [correctNumber, setCorrectNumber] = useState()
    const [kindCard, setKindCard] = useState()

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
        if (number[0] === 4) {
            setKindCard('VISA')
        } else if(
            number[0] === 5 && (
                number[1] === 1 || 
                number[1] === 2 || 
                number[1] === 3 || 
                number[1] === 4 ||
                number[1] === 5
            )
            ) {
            setKindCard('MasterCard')
        } else if(
            number[0] === 3 && (
                number[1] === 4 || 
                number[1] === 7
            )
            ) {
            setKindCard('American Express')
        } else if(
            number[0] === 3 && (
                number[1] === 0 || 
                number[1] === 6 ||
                number[1] === 8
            )
            ) {
            setKindCard('Diners Club')
        } else {
            setKindCard('not found')
        }
    }

    const onSubmit = e => {
        e.preventDefault()
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
        console.log(sumOneRow)

        const sumTwoRow = sumOfArr(numberTwoArr)
        console.log(sumTwoRow)

        const sum = sumOneRow + sumTwoRow
        console.log(sum)

        if (sum % 10 === 0) {
            setCorrectNumber(true)
            checkCard(numberArr)
        } else {
            setCorrectNumber(false)
            checkCard(numberArr)
        }
    }

    return (
        <div>
            <div>Examples of credit card numbers</div>
            <div>5575373225509616 - AS green</div>
            <div>4874742029558527 - AS blue</div>
            <div>4140719398084341 - AS teal </div>
            <div>4874742029558527 - AS gray </div>
            <div>5347142203453064 - AS prePaid </div>
            <div>4213523283653018 - Tom white  </div>
            <div>4251250306820662 - Tesciowa red  </div>
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
                {   correctNumber
                    ? <span style={{color: 'green'}}>Numery karty poprawne</span> 
                    : <span style={{color: 'red'}}>Numery karty niepoprawne</span>   
                }
            </div>
            <div>
                { correctNumber && 
                    <span>Rodzaj karty: <b>{kindCard}</b></span>  
                }
            </div>
        </div>
    )
}

export default Cards