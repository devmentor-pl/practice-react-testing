import React, { useState } from "react"

const CardForm = ({ getType }) => {
  const [cardNumber, setCardNumber] = useState("")

  const handleSubmit = e => {
    e.preventDefault()

    getType(cardNumber)
    setCardNumber("")
  }

  const handleInput = value => {
    setCardNumber(value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="cardNumber">Card Number:</label>
      <input id="cardNumber" pattern="[0-9\s]{13,19}" type="tel" onChange={e => handleInput(e.target.value)} value={cardNumber} />
      <button name="submit" type="submit">
        Submit
      </button>
    </form>
  )
}

export default CardForm
