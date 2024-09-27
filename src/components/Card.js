import React from "react";

const Card = () => {
  const [cardOrganization, setCardOrganization] = React.useState('')
  const [cardNumber, setCardNumber] = React.useState(0)
  const [error, setError] = React.useState('')

  const changeCardNumber = (e) => {
    setCardNumber(e.target.value)
  }

  const isNumberValid = (fullNumber) => {
    const fullNumberCalculated = [...fullNumber].reduce((acc, number, index) => {
      if (!(index % 2) || (index === 0)) {
        if ((number * 2) >= 10) {
          const numberToString = (number * 2).toString()
          const sum = Number(numberToString[0]) + Number(numberToString[1])
          return acc + sum
        }
        return acc + (number * 2)
      }
      return acc + (number * 1)
    }, 0)

    console.log(fullNumberCalculated);

    if (!(fullNumberCalculated % 10)) {
      setError('')
      return true
    }

    setError('Wrong card number')
    return false
  }

  const checkCardNumber = () => {
    if (cardNumber.length === 16 || cardNumber.length === 13) {
      if (Number(cardNumber[0]) === 4) {
        const isValid = isNumberValid(cardNumber)
        if (isValid) {
          setCardOrganization('Visa')
          return
        } else {
          setCardOrganization('')
        }
      }
      if (Number(cardNumber[0]) === 5) {
        const isValid = isNumberValid(cardNumber)
        if (isValid) {
          setCardOrganization('Master Card')
          return
        } else {
          setCardOrganization('')
        }
      }
    }
    if (cardNumber.length === 15) {
      const isValid = isNumberValid(cardNumber)
      if (isValid) {
        setCardOrganization('American Express')
        return
      } else {
        setCardOrganization('')
      }
    }
    if (cardNumber.length === 14) {
      const isValid = isNumberValid(cardNumber)
      if (isValid) {
        setCardOrganization('Diners Club Carte Blanche')
        return
      } else {
        setCardOrganization('')
      }
    }

    setError('Wrong card number')
  }

  return (
    <div>
      <input type="text" name="cardNumber" onChange={changeCardNumber} />
      {
        error.length > 0 ?
          <p>{error}</p>
          :
          null
      }
      <p>Organization: {cardOrganization}</p>
      <button onClick={checkCardNumber}>submit</button>
    </div>
  )
}

export default Card