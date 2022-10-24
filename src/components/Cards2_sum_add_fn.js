import React, { useState } from 'react'

const Cards = () => {
    const [number, setNumber] = useState()

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

    const onSubmit = e => {
        e.preventDefault()
        const numberArr = convertNumToArr(number)
        console.log(numberArr)
        let numbersOneString = ''
        let numbersTwoString = ''
        numberArr.forEach((number, index) => {
            if (index % 2 === 0) {
                // console.log(number)
                const numberTimes = number * 2
                // console.log(numberTimes)
                numbersOneString += numberTimes.toString()
            } else {
                const numberTimes = number * 1
                // console.log(numberTimes)
                numbersTwoString += numberTimes.toString()
            }
        })
        // console.log(numbersOneString)
        // console.log(numbersTwoString)

        const numberOneArr = convertNumToArr(numbersOneString)
        console.log(numberOneArr)

        const numberTwoArr = convertNumToArr(numbersTwoString)
        console.log(numberTwoArr)

        const sumOneRow = sumOfArr(numberOneArr)
        console.log(sumOneRow)

        const sumTwoRow = sumOfArr(numberTwoArr)
        console.log(sumTwoRow)

        const sum = sumOneRow + sumTwoRow
        console.log(sum)

    }
    return (
        <div>
            <div>Examples of credit card numbers</div>
            <div>5575373225509616 - AS green</div>
            <div>4874742029558527 - AS blue</div>
            <div>4140719398084341 - AS teal </div>
            <div>4874742029558527 - AS gray </div>
            <div>4213523283653018 - Tom white  </div>
            <div>4251250306820662 - Tesciowa red  </div>
            <form onSubmit={onSubmit}>
                <label>number cars</label>
                <input type="number" onChange={onInput}
                    value={number}
                />
                <button>check</button>
                <div>
                    {number}
                </div>
            </form>
        </div>
    )
}

export default Cards