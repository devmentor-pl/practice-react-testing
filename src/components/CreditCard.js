import useCreditCardValidator from "../hooks/useCreditCardValidator";

const CreditCard = () => {
    const [udpateCardNumber, cardNum, isCorrect, provider] = useCreditCardValidator();

    return (
        <section>
            <form>
                <div>
                    <label>
                        Credit Card Number
                        <input name="cc-number" value={cardNum} onChange={e => udpateCardNumber(e.target.value)} />{provider && <small>{provider}</small>}
                        {!isCorrect && <strong>Nieprawidłowe dane!</strong>}
                    </label>
                    <div><input type="submit" /></div>
                </div>
            </form>
        </section>
    )
}

export default CreditCard;