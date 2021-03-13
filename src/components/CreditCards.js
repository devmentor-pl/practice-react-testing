
 import React, {useState } from 'react';
 import isIsValidCreditCardNumber from '../components/CardValidation'

 const CreditCards = () => {

  const [number, setNumber] = useState('')
  const [isCardValid, setIsCardValid] = useState(false);
  const [cardType, setCardType] = useState(null);



  const handleChange = e => {
    e.preventDefault()
    const number = e.target.value;
    setNumber(number)
    setIsCardValid(isIsValidCreditCardNumber(number))
    setCardType(isIsValidCreditCardNumber(number))
  };


 
  return (

    <>
    <p> check if your card is valid</p>
      <input 
        type="text" 
        name='number' 
        placeholder='card number'
        value={number}
        onChange={handleChange}
        />
     
      {!isCardValid && <p>Card is not valid</p>}
      { isCardValid && <p>Card is valid</p>}

      {cardType && <p>Card is type: {cardType} </p>}
    
 
    </>
  
  )



 

 }
 export default CreditCards