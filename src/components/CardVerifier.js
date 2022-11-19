import React, {useState} from 'react'
import cardsRegExp from '../data/cardsRegExp'

const CardVerifier = () => {
  const [cardNumber, setCardNumber] = useState('')
  const [error, setError] = useState('')
  const [type, setType] = useState('')

  const handleChange = (e) => {
    error && setError('')
    type && setType('')
    const { value } = e.target
    setCardNumber(value)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (cardNumber === '') {
      setError('Please enter card number, this field is mandatory')
    } else if (typeof cardNumber !== 'undefined') {
      try {
        const number = cardNumber.replace(/\D/g, '')
        if (isCardNumberValid(number)) {
          checkCardType(number)
        } else {
          setError('Invalid card number provided')
        }
      } catch (error) {
        setError(error.message)
      }
    }
  }

  const checkCardType = (number) => {
    let isAnyTypeDetected = false
    for (const cardType in cardsRegExp) {
      if (cardsRegExp[cardType].test(number)) {
        setType(cardType)
        isAnyTypeDetected = true
      }
    }
    if (!isAnyTypeDetected) {
      setError('Check the provided card number, type not detected')
    }
  }

  const isCardNumberValid = (number) => {
    const regex = new RegExp("^[0-9]{13,19}$")
    if (!regex.test(number)){
      return false
    }

    let checksum = 0
    let j = 1

    for (let i = number.length - 1; i >= 0; i--) {
      let calc = 0
      calc = Number(number.charAt(i)) * j;

      if (calc > 9) {
        checksum = checksum + 1;
        calc = calc - 10;
      }

      checksum = checksum + calc;

      if (j === 1) {
        j = 2;
      } else {
        j = 1;
      }
    }
  
    return (checksum % 10) === 0;
  }
  
  return (
    <form
      onSubmit={handleSubmit}
    >
      <p>
        <label htmlFor="cardNumber">card number: </label>
        <input
          name="cardNumber"
          type="text"
          value={cardNumber}
          onChange={handleChange}
        />
        {error && <strong>{error}</strong>}
        {type && <strong>Card type: {type}</strong>}
      </p>    
      <p>  
        <button type='submit'>send</button>
      </p>
    </form>
  )
}

export default CardVerifier
