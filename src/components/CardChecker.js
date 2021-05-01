import React, { useState } from 'react'
import cardTypes from '../providers/cardTypesProvider'

const CardChecker = () => {
    const [cardNumber, setCardNumber] = useState('')
    const [cardType, setCardType] = useState('')
    const [error,setError] = useState('')

    const handleNumberChange = e => {
        const { value } = e.target
        const digitsOnlyReg = /[0-9]/

        if(digitsOnlyReg.test(value) && value.length <= 16) setCardNumber(value)
    }

    const detectCardProvider = () => {
        for(let i=0; i<cardTypes.length; i++) {
            if( (cardTypes[i].numberLength === cardNumber.length) && (cardTypes[i].pattern.test(cardNumber)) ) {
                return cardTypes[i].provider
            }
        }

        return ''
    }

    const handleNumberSubmit = e => {
        e.preventDefault()

        if(isCardNumberValid()) {
            const detectedCardType = detectCardProvider()

            if (detectedCardType) {
                setError('')
                setCardType(detectedCardType)
            } else {
                setError('Card type not detected')
                setCardType('')
            }
        } else {
            setError('Wrong card number')
            setCardType('')
        }

    }

    const adjustCardNumberLength = () => {
        return ( '0'.repeat(16 - cardNumber.length) + cardNumber )
    }

    const isCardNumberValid = () => {
        const weights = [2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1]
        const cardNumber16 = adjustCardNumberLength()
        const checksum = weights.reduce((sum,el,i) => {
            const summand = el * parseInt(cardNumber16[i])
            
            if(summand >= 10) {
                return (sum += 1 + summand % 10)
            }
            return (sum += summand)
        }, 0)

        return (checksum % 10 === 0 ? true : false)
    }

    return (
        <form onSubmit={ e => handleNumberSubmit(e) }>
            <label>
                Insert card number:
                <input 
                    name='cardNumber'
                    value={ cardNumber }
                    onChange={ e => handleNumberChange(e) } 
                />
            </label>
            <button type='submit'>verify</button>
            { error && <p style={ {color: 'red'} }>{ error }</p> }
            { cardType && <p style={ {color: 'green'} }>Number detected as: { cardType }</p> }
        </form>

    )

}

export default CardChecker