import { useState } from "react"

const useValidation = cardNum => {
  const [error, setError] = useState("")
  const [cardType, setCardType] = useState("")

  const validateCredit = cardNum => {
    const oddDgtSum = cardNum
      .split("")
      .reverse()
      .filter((_, i) => i % 2 !== 1)
      .map(d => parseInt(d))
      .reduce((a, b) => a + b)

    const evenDgtSum = cardNum
      .split("")
      .reverse()
      .filter((_, i) => i % 2 === 1)
      .map(d => (d * 2).toString().split(""))
      .flat()
      .map(d => parseInt(d))
      .reduce((a, b) => a + b)

    if ((oddDgtSum + evenDgtSum) % 10 !== 0) {
      setError("Invalid card number")
    }

    const twoFirstCardDigits = parseInt(cardNum.slice(0, 2))

    switch (cardNum.length) {
      case 13:
        if (twoFirstCardDigits >= 40 && twoFirstCardDigits < 50) {
          setCardType("Visa")
        }
        return
      case 15:
        if (twoFirstCardDigits === 34 || twoFirstCardDigits === 37) {
          setCardType("American Express")
        }
        return
      case 16:
        if (twoFirstCardDigits >= 40 && twoFirstCardDigits < 50) {
          setCardType("Visa")
        }
        if (twoFirstCardDigits >= 51 && twoFirstCardDigits <= 55) {
          setCardType("MasterCard")
        }
        return
      default:
        return
    }
  }
  return [cardType, error, validateCredit]
}

export default useValidation
