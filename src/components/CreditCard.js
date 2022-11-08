import React from 'react'

export const CreditCard = () => {
    const [cardNumber, setCardNumber] = React.useState('')
    const [cardAdded, setCardAdded] = React.useState(false)
    const [cardProducer, setCardProducer] = React.useState('')
    const [cardValid, setCardValid] = React.useState(false)

    const checkCardNumberLength = (number) => {
        return number.length <= 16 ? true : false
    }

    const changeToArray = () => {
        return String(cardNumber).split('').map(number => Number(number))
    }
    
    const onInputChange = (e) => {
        checkCardNumberLength(e.target.value)
        ? 
        setCardNumber(e.target.value) 
        : 
        alert('max 16 numbers!')
         
        setCardAdded(false)  
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setCardAdded(true)
        
        const numbers = changeToArray()
        const multi = numbers.map((number, index) => {
            return index % 2 === 0 ? number*2 : number
        })

        if(multi.length < 12){
            alert('min 13 numbers!')            
        } else {
            const arr = []
            arr.length = 16 - multi.length
            arr.fill(0)
            const newArr = arr.concat(multi)
            const control = newArr.map(number => {
                if(number > 9){
                    return String(number).split('').map(num => {
                        return Number(num)}).reduce((a,b) => a + b)
                } else {
                return number
                }
        })

        showProducer()

        const sumTotal = control.reduce((a, b) => a + b, 0)
        sumTotal % 10 === 0 ? 
            setCardValid(true) 
            : setCardValid(false)
    }}


    const showProducer = () => {
        const numbers = String(cardNumber).split('').map(number => Number(number))
        
        if(numbers.length === 14){
            setCardProducer('Diners Club Carte Blanche')
        } else if (numbers.length === 15){
            setCardProducer('American Express')
        } else if ((numbers.length === 13 || numbers.length === 16) && numbers[0] === 4){
            setCardProducer('VISA')
        } else if (numbers.length === 16 
            && numbers[0] === 5 
            && 
            (numbers[1] === 1 
                || numbers[1] === 2
                || numbers[1] === 3
                || numbers[1] === 4
                || numbers[1] === 5)){
            setCardProducer('MasterCard')
        } else{
            setCardProducer('No matching producer!')
        }
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor={'cardNumber'}>Numer karty: </label>
            <input value={cardNumber} onChange={onInputChange} type={'number'}></input>
            <button>OK</button> 
        </form>
        {
            cardAdded ? 
            cardValid ? cardProducer : 'Wrong card number'
            : null
        }
        </>

        
    )
}

export default CreditCard